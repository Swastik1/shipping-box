import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoxContext } from "../context/BoxContext";
import { Country, COUNTRY_RATES } from "../types";
import { calculateShippingCost } from "../utils/calculations";

const AddBox = () => {
	const navigate = useNavigate();
	const { addBox } = useBoxContext();

	return <div>Add Box</div>;
};

export default AddBox;
