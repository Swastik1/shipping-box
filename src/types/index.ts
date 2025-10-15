export type Country = "Sweden" | "China" | "Brazil" | "Australia";

export const COUNTRY_RATES: Record<Country, number> = {
	Sweden: 7.35,
	China: 11.53,
	Brazil: 15.63,
	Australia: 50.09,
};

export interface Box {
	id: string;
	receiverName: string;
	weight: number;
	boxColor: string;
	destinationCountry: Country;
	shippingCost: number;
}
