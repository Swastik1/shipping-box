import { render } from "@testing-library/react";
import BoxList from "./BoxList";

// Mock BoxContext
jest.mock("../context/BoxContext", () => ({
	useBoxContext: () => ({
		boxes: [],
	}),
}));

describe("BoxList Component", () => {
	test("renders without crashing", () => {
		const { container } = render(<BoxList />);
		expect(container).toBeInTheDocument();
	});
});
