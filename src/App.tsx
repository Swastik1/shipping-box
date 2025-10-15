import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddBox from "./components/AddBox";
import BoxList from "./components/BoxList";
import { BoxProvider } from "./context/BoxContext";

function App() {
	return (
		<BoxProvider>
			<BrowserRouter>
				<div className="min-h-screen bg-gray-50">
					<Navbar />
					<Routes>
						<Route path="/" element={<AddBox />} />
						<Route path="/box-list" element={<BoxList />} />
					</Routes>
				</div>
			</BrowserRouter>
		</BoxProvider>
	);
}

export default App;
