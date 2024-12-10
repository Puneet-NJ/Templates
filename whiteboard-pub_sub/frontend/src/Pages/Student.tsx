import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useEffect, useRef, useState } from "react";

const Student = () => {
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
	const wsRef = useRef<WebSocket>();
	const wsUrl = "ws://localhost:8080";

	useEffect(() => {
		wsRef.current = new WebSocket(wsUrl);

		wsRef.current.onopen = () => {
			console.log("WebSocket connected");
		};

		wsRef.current.onmessage = (event) => {
			const data = JSON.parse(event.data);

			const state = { ...data.appState };
			state.collaborators = [];

			const dummyData = { elements: data.elements, appState: state };

			console.log(data.appState);

			console.log(dummyData);

			excalidrawAPI?.updateScene(dummyData); // Directly update the scene
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
	}, [excalidrawAPI]);

	return (
		<div>
			<div style={{ width: "100vw", height: "100vh" }}>
				<Excalidraw
					initialData={{ elements: [], appState: {} }} // Ensure required initial data is provided
					excalidrawAPI={(api) => setExcalidrawAPI(api)}
					viewModeEnabled={true}
					onChange={() => {
						console.log("no");
					}}
				/>
			</div>
		</div>
	);
};

export default Student;
