import { calculateShippingCost } from "./calculations";
import { Country } from "../types";

describe("calculateShippingCost", () => {
	test("calculates correct shipping cost for Sweden", () => {
		const cost = calculateShippingCost(5, "Sweden" as Country);
		expect(cost).toBe(36.75); // 5 * 7.35
	});

	test("calculates correct shipping cost for China", () => {
		const cost = calculateShippingCost(10, "China" as Country);
		expect(cost).toBe(115.3); // 10 * 11.53
	});

	test("calculates correct shipping cost for Brazil", () => {
		const cost = calculateShippingCost(3, "Brazil" as Country);
		expect(cost).toBe(46.89); // 3 * 15.63
	});

	test("calculates correct shipping cost for Australia", () => {
		const cost = calculateShippingCost(2, "Australia" as Country);
		expect(cost).toBe(100.18); // 2 * 50.09
	});

	test("rounds to 2 decimal places", () => {
		const cost = calculateShippingCost(1.234, "Sweden" as Country);
		expect(cost).toBe(9.07); // Rounded from 9.0729
	});

	test("handles zero weight", () => {
		const cost = calculateShippingCost(0, "Sweden" as Country);
		expect(cost).toBe(0);
	});

	test("handles decimal weight", () => {
		const cost = calculateShippingCost(2.5, "China" as Country);
		expect(cost).toBe(28.83); // 2.5 * 11.53 = 28.825, rounded to 28.83
	});
});
