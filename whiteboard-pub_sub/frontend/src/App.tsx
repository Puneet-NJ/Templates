import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Student from "./Pages/Student";
import Teacher from "./Pages/Teacher";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/student" element={<Student />} />
					<Route path="/teacher" element={<Teacher />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
