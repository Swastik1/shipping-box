import React, { createContext, useContext, useState, useEffect } from "react";
import { Box } from "../types";

interface BoxContextType {
	boxes: Box[];
	addBox: (box: Omit<Box, "id">) => void;
}

const BoxContext = createContext<BoxContextType | undefined>(undefined);

export const BoxProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [boxes, setBoxes] = useState<Box[]>([]);

	// Load boxes from local storage on mount
	useEffect(() => {
		const savedBoxes = localStorage.getItem("shippingBoxes");
		if (savedBoxes) {
			setBoxes(JSON.parse(savedBoxes));
		}
	}, []);

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
	return (
		<BoxContext.Provider value={{ boxes, addBox }}>
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
