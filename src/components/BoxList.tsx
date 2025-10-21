import React, { useState, useMemo } from "react";
import { useBoxContext } from "../context/BoxContext";
import { useDebounce } from "../hooks/useDebounce";
import { Country, SortField } from "../types";

const BoxList = () => {
	// Get boxes from context
	const { boxes, deleteBox } = useBoxContext();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const [filterCountry, setFilterCountry] = useState<Country | "all">("all");
	const [sortField, setSortField] = useState<SortField | "none">("none");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const handleSort = (field: string) => {
		if (sortField === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(field as SortField);
			setSortOrder("asc");
		}
	};

	const filteredBoxes = useMemo(() => {
		let result = boxes.filter((box) => {
			const matchesSearch =
				box.receiverName
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()) ||
				box.destinationCountry
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase());
			const matchesCountry =
				filterCountry === "all" ||
				box.destinationCountry === filterCountry;

			return matchesSearch && matchesCountry;
		});

		// Sort if it is not none

		if (sortField !== "none") {
			result = [...result].sort((a, b) => {
				let valueA, valueB;
				switch (sortField) {
					case "name":
						valueA = a.receiverName.toLowerCase();
						valueB = b.receiverName.toLowerCase();
						break;
					case "weight":
						valueA = a.weight;
						valueB = b.weight;
						break;
					case "cost":
						valueA = a.shippingCost;
						valueB = b.shippingCost;
						break;
					default:
						return 0;
				}
				if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
				if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
				return 0;
			});
		}

		return result;
	}, [boxes, debouncedSearchTerm, filterCountry, sortField, sortOrder]);

	const totalShippingCost = useMemo(() => {
		return boxes.reduce((sum, box) => sum + box.shippingCost, 0);
	}, [boxes]);

	return (
		<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
			<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
						Shipping Box List
					</h2>
					{/* Total Cost */}
					{boxes.length > 0 && (
						<div className="bg-blue-100 px-4 py-2 rounded-lg">
							<span className="text-blue-800 font-semibold text-l">
								Total Cost : ₹{totalShippingCost.toFixed(2)}
							</span>
						</div>
					)}
				</div>

				{/* Search Input */}
				{boxes.length > 0 && (
					<div className="flex gap-4 mb-6">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent text-nowrap"
							placeholder="Search by Receiver..."
						/>
						<select
							value={filterCountry}
							onChange={(e) =>
								setFilterCountry(
									e.target.value as Country | "all"
								)
							}
							className="w-2xl bg-white-200 pl-4 pr-10 py-2 cursor-pointer rounded-lg border border-gray-300 text-indigo-500 appearance-none"
							style={{
								backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
								backgroundPosition: "right 0.75rem center",
								backgroundRepeat: "no-repeat",
								backgroundSize: "1.5em 1.5em",
							}}
						>
							<option value="all">All Countries</option>
							<option value="Sweden">Sweden</option>
							<option value="China">China</option>
							<option value="Brazil">Brazil</option>
							<option value="Australia">Australia</option>
						</select>

						{/* Clear All Filters - Show when any filter is active */}
						{(searchTerm !== "" ||
							filterCountry !== "all" ||
							sortField !== "none") && (
							<button
								onClick={() => {
									setSearchTerm("");
									setFilterCountry("all");
									setSortField("none");
									setSortOrder("asc");
								}}
								className="px-4 py-2 bg-gray-100 text-black-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap font-semibold"
							>
								Clear All
							</button>
						)}
					</div>
				)}

				{/* No boxes message */}
				{boxes.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">
							No boxes added yet. Add your first box to get
							started!
						</p>
					</div>
				) : (
					/* Table */
					<div className="overflow-x-auto -mx-4 sm:mx-0">
						<table className="w-full border-collapse min-w-[640px]">
							{/* Table Header */}
							<thead>
								<tr className="bg-blue-600 text-white">
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										<button
											onClick={() => handleSort("name")}
											className="flex items-center gap-2 hover:text-blue-200 transition-colors"
										>
											Receiver Name
											<span className="text-base">
												{
													sortField === "name"
														? sortOrder === "asc"
															? "↑"
															: "↓" // Active: single arrow
														: "↕" // Inactive: both arrows
												}
											</span>
										</button>
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										<button
											onClick={() => handleSort("weight")}
											className="flex items-center gap-2 hover:text-blue-200 transition-colors"
										>
											Weight (kg) {""}
											<span className="text-base">
												{sortField === "weight"
													? sortOrder === "asc"
														? "↑"
														: "↓"
													: "↕"}
											</span>
										</button>
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Box Color
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Destination
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										<button
											onClick={() => handleSort("cost")}
											className="flex items-center gap-2 hover:text-blue-200 transition-colors"
										>
											Cost (INR)
											<span className="text-base">
												{sortField === "cost"
													? sortOrder === "asc"
														? "↑"
														: "↓"
													: "↕"}
											</span>
										</button>
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Actions
									</th>
								</tr>
							</thead>

							{/* Table Body */}
							<tbody>
								{filteredBoxes.length === 0 ? (
									<tr>
										<td className="px-6 py-8 text-gray-500 text-center">
											No boxes found matching {searchTerm}{" "}
											...
										</td>
									</tr>
								) : (
									filteredBoxes.map((box) => (
										<tr
											key={box.id}
											className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
										>
											{/* Receiver Name */}
											<td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-800 text-sm sm:text-base">
												{box.receiverName}
											</td>

											{/* Weight */}
											<td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-800 text-sm sm:text-base">
												{box.weight}
											</td>

											{/* Box Color - Display as colored box */}
											<td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
												<div className="flex items-center gap-2 sm:gap-3">
													<div
														className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 border-gray-300 rounded shadow-sm flex-shrink-0"
														style={{
															backgroundColor: `rgb(${box.boxColor})`,
														}}
														title={`RGB(${box.boxColor})`}
													></div>
													<span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
														{box.boxColor}
													</span>
												</div>
											</td>

											{/* Destination Country */}
											<td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-800 text-sm sm:text-base">
												{box.destinationCountry}
											</td>

											{/* Shipping Cost */}
											<td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-gray-800 font-semibold text-sm sm:text-base">
												₹{box.shippingCost.toFixed(2)}
											</td>
											{/* Actions */}
											<td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
												<button
													onClick={() =>
														deleteBox(box.id)
													}
													className="flex flex-column justify-center bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded text-sm transition-colors"
												>
													Delete
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoxList;
