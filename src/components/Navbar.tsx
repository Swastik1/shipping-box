import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
	// Get current URL path
	const location = useLocation();

	return (
		<nav className="bg-blue-600 text-white shadow-lg">
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between">
					{/* App Title */}
					<h1 className="text-2xl font-bold mb-4 md:mb-0">
						📦 Shipping Box
					</h1>

					{/* Navigation Links */}
					<div className="flex gap-4">
						<Link
							to="/"
							className={`px-4 py-2 rounded transition-colors ${
								location.pathname === "/"
									? "bg-white text-blue-600 font-semibold"
									: "bg-blue-700 hover:bg-blue-800"
							}`}
						>
							Add Box
						</Link>
						<Link
							to="/box-list"
							className={`px-4 py-2 rounded transition-colors ${
								location.pathname === "/box-list"
									? "bg-white text-blue-600 font-semibold"
									: "bg-blue-700 hover:bg-blue-800"
							}`}
						>
							Box List
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
