import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const room: any = [];

wss.on("connection", (socket) => {
	console.log("New connection");
	room.push(socket);

	socket.on("message", (data) => {
		const { type, stroke } = JSON.parse(data.toString());

		if (type === "sendStroke") {
			const state = { ...stroke.appState };
			state.collaborators = [];
			state.viewModeEnabled = true;

			const modifiedStroke = { elements: stroke.elements, appState: state };

			room.forEach((userSocket: WebSocket) => {
				if (userSocket !== socket && userSocket.readyState === WebSocket.OPEN) {
					userSocket.send(JSON.stringify(modifiedStroke));
				}
			});
		}
	});

	socket.on("close", () => {
		const index = room.indexOf(socket);
		if (index !== -1) room.splice(index, 1);
		console.log("Connection closed");
	});
});
