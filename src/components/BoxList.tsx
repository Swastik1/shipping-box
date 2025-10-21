import React, { useState, useMemo } from "react";
import { useBoxContext } from "../context/BoxContext";
import { useDebounce } from "../hooks/useDebounce";

const BoxList = () => {
	// Get boxes from context
	const { boxes, deleteBox } = useBoxContext();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 5000);

	const filteredBoxes = useMemo(() => {
		return boxes.filter(
			(box) =>
				box.receiverName
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase()) ||
				box.destinationCountry
					.toLowerCase()
					.includes(debouncedSearchTerm.toLowerCase())
		);
	}, [boxes, debouncedSearchTerm]);

	return (
		<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
			<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
				<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
					Shipping Box List
				</h2>

				{boxes.length > 0 && (
					<div>
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus: border-transparent"
							placeholder="Search by Receiver / Destination"
						/>
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
										Receiver Name
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Weight (kg)
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Box Color
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Destination
									</th>
									<th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
										Cost (INR)
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
										<td>
											No boxes found matching {searchTerm}
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
