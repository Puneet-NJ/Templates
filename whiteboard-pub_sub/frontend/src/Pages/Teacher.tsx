import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useEffect, useRef, useState } from "react";

const Teacher = () => {
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
	const wsRef = useRef<WebSocket>();
	const wsUrl = "ws://localhost:8080";

	useEffect(() => {
		wsRef.current = new WebSocket(wsUrl);

		wsRef.current.onopen = () => {
			console.log("WebSocket connected");
		};

		wsRef.current.onerror = (event) => {
			console.error("WebSocket error:", event);
		};

		wsRef.current.onclose = () => {
			console.log("WebSocket closed");
		};

		return () => {
			wsRef.current?.close();
		};
	}, []);

	const handleChange = (elements: any, appState: any) => {
		console.log("onChange triggered", elements, wsRef.current?.readyState);

		const stroke = { elements, appState };

		if (wsRef.current) {
			console.log("is not undefined");

			if (wsRef.current.readyState === 1) {
				console.log(elements, appState);

				wsRef.current?.send(JSON.stringify({ type: "sendStroke", stroke }));
			}
		}
	};

	return (
		<div>
			<div style={{ width: "100vw", height: "80vh" }}>
				<Excalidraw
					initialData={{ elements: [], appState: {} }} // Ensure required initial data is provided
					onChange={handleChange}
					excalidrawAPI={(api) => setExcalidrawAPI(api)}
				/>
			</div>
		</div>
	);
};

export default Teacher;
