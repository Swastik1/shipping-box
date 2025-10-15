import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoxContext } from "../context/BoxContext";
import { Country, COUNTRY_RATES } from "../types";
import { calculateShippingCost } from "../utils/calculations";

const AddBox = () => {
	// Hook to navigate programmatically
	const navigate = useNavigate();

	// Get addBox function from context
	const { addBox } = useBoxContext();

	// Form state - each field has its own state
	const [receiverName, setReceiverName] = useState("");
	const [weight, setWeight] = useState<number | string>("");
	const [boxColor, setBoxColor] = useState("#ffffff");
	const [destinationCountry, setDestinationCountry] =
		useState<Country>("Sweden");

	// Error state
	const [errors, setErrors] = useState<string[]>([]);

	// Convert hex color to RGB format
	const hexToRgb = (hex: string): string => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		if (result) {
			const r = parseInt(result[1], 16);
			const g = parseInt(result[2], 16);
			const b = parseInt(result[3], 16);
			return `${r}, ${g}, ${b}`;
		}
		return "255, 255, 255";
	};

	// Validate form
	const validateForm = (): boolean => {
		const newErrors: string[] = [];

		if (!receiverName.trim()) {
			newErrors.push("Receiver name is required");
		}

		const weightNum = Number(weight);

		if (weightNum < 0) {
			newErrors.push("Weight cannot be negative");
			setWeight(0);
		}

		if (weight === "" || weightNum === 0) {
			newErrors.push("Weight must be greater than 0");
		}

		setErrors(newErrors);
		return newErrors.length === 0;
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page reload

		// Validate form
		if (!validateForm()) {
			return; // Stop if validation fails
		}

		// Calculate shipping cost
		const shippingCost = calculateShippingCost(
			Number(weight),
			destinationCountry
		);

		// Create box object
		const newBox = {
			receiverName,
			weight: Number(weight),
			boxColor: hexToRgb(boxColor),
			destinationCountry,
			shippingCost,
		};

		// Save to context
		addBox(newBox);

		// Reset form
		setReceiverName("");
		setWeight("");
		setBoxColor("#ffffff");
		setDestinationCountry("Sweden");
		setErrors([]);

		// Navigate to box list
		navigate("/box-list");
	};

	return (
		<div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
			<div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
				<h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
					Add New Shipping Box
				</h2>

				{/* Error Messages */}
				{errors.length > 0 && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
						<p className="font-bold">
							Please fix the following errors:
						</p>
						<ul className="list-disc list-inside mt-2">
							{errors.map((error, index) => (
								<li key={index}>{error}</li>
							))}
						</ul>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Receiver Name */}
					<div>
						<label
							htmlFor="receiverName"
							className="block text-gray-700 font-semibold mb-2"
						>
							Receiver Name{" "}
							<span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							value={receiverName}
							onChange={(e) => {
								setReceiverName(e.target.value);
								setErrors([]);
							}}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter receiver name"
						/>
					</div>

					{/* Weight */}
					<div>
						<label
							htmlFor="weight"
							className="block text-gray-700 font-semibold mb-2"
						>
							Weight (kg) <span className="text-red-500">*</span>
						</label>
						<input
							type="number"
							value={weight}
							onChange={(e) => {
								const value = e.target.value;
								setWeight(value === "" ? "" : Number(value));
								setErrors([]);
							}}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter weight in kilograms"
							min="0"
							step="0.01"
						/>
					</div>

					{/* Box Color */}
					<div>
						<label
							htmlFor="boxColor"
							className="block text-gray-700 font-semibold mb-2"
						>
							Box Color <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center gap-4">
							<input
								type="color"
								value={boxColor}
								onChange={(e) => {
									setBoxColor(e.target.value);
									setErrors([]);
								}}
								className="h-12 w-20 border border-gray-300 rounded cursor-pointer"
							/>
							<span className="text-gray-600">
								RGB: {hexToRgb(boxColor)}
							</span>
						</div>
					</div>

					{/* Destination Country */}
					<div>
						<label
							htmlFor="destinationCountry"
							className="block text-gray-700 font-semibold mb-2"
						>
							Destination Country{" "}
							<span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<select
								id="destinationCountry"
								name="destinationCountry"
								value={destinationCountry}
								onChange={(e) => {
									setDestinationCountry(
										e.target.value as Country
									);
									setErrors([]);
								}}
								className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
							>
								{Object.keys(COUNTRY_RATES).map((country) => (
									<option key={country} value={country}>
										{country} (
										{COUNTRY_RATES[country as Country]}{" "}
										INR/kg)
									</option>
								))}
							</select>

							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700">
								<svg
									className="h-5 w-5 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
					>
						Save Box
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddBox;
