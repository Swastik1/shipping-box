import { Country, COUNTRY_RATES } from "../types";

/**
 * Calculates the shipping cost based on weight and destination country
 * @param weight - Weight of the box in kilograms
 * @param country - Destination country
 * @returns Shipping cost in INR
 */

export const calculateShippingCost = (
	weight: number,
	country: Country
): number => {
	const rate = COUNTRY_RATES[country];
	const cost = weight * rate;

	return Math.round(cost * 100) / 100;
};
