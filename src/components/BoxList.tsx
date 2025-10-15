import React from "react";
import { useBoxContext } from "../context/BoxContext";

const BoxList = () => {
	// Get boxes from context
	const { boxes } = useBoxContext();

	return (
		<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
			<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
				<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
					Shipping Box List
				</h2>

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
								</tr>
							</thead>

							{/* Table Body */}
							<tbody>
								{boxes.map((box) => (
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
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default BoxList;
