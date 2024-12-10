"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const room = [];
wss.on("connection", (socket) => {
    console.log("New connection");
    room.push(socket);
    socket.on("message", (data) => {
        const { type, stroke } = JSON.parse(data.toString());
        if (type === "sendStroke") {
            const state = Object.assign({}, stroke.appState);
            state.collaborators = [];
            state.viewModeEnabled = true;
            const modifiedStroke = { elements: stroke.elements, appState: state };
            room.forEach((userSocket) => {
                if (userSocket !== socket && userSocket.readyState === ws_1.WebSocket.OPEN) {
                    userSocket.send(JSON.stringify(modifiedStroke));
                }
            });
        }
    });
    socket.on("close", () => {
        const index = room.indexOf(socket);
        if (index !== -1)
            room.splice(index, 1);
        console.log("Connection closed");
    });
});
