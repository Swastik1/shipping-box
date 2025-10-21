import React, { createContext, useContext, useState, useEffect } from "react";
import { Box } from "../types";

interface BoxContextType {
	boxes: Box[];
	addBox: (box: Omit<Box, "id">) => void;
	deleteBox: (id: string) => void;
}

const BoxContext = createContext<BoxContextType | undefined>(undefined);

export const BoxProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Initialize state directly from localStorage
	const [boxes, setBoxes] = useState<Box[]>(() => {
		const savedBoxes = localStorage.getItem("shippingBoxes");
		if (savedBoxes) {
			try {
				return JSON.parse(savedBoxes);
			} catch (error) {
				console.error("Failed to parse saved boxes:", error);
				return [];
			}
		}
		return [];
	});

	// Save boxes to local storage whenever they change
	useEffect(() => {
		localStorage.setItem("shippingBoxes", JSON.stringify(boxes));
	}, [boxes]);

	const addBox = (boxdata: Omit<Box, "id">) => {
		const newBox: Box = {
			...boxdata,
			id: Date.now().toString(),
		};
		setBoxes((prevBoxes) => [...prevBoxes, newBox]);
	};

	// Delete boxes
	const deleteBox = (id: string) => {
		setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
	};

	return (
		<BoxContext.Provider value={{ boxes, addBox, deleteBox }}>
			{children}
		</BoxContext.Provider>
	);
};

// Custom hook to use the context
export const useBoxContext = () => {
	const context = useContext(BoxContext);
	if (!context) {
		throw new Error("useBoxContext must be used within BoxProvider");
	}
	return context;
};

export default BoxContext;
