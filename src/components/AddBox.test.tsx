import { render } from "@testing-library/react";
import AddBox from "./AddBox";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => jest.fn(),
}));

// Mock BoxContext
jest.mock("../context/BoxContext", () => ({
	useBoxContext: () => ({
		boxes: [],
		addBox: jest.fn(),
	}),
}));

describe("AddBox Component", () => {
	test("renders without crashing", () => {
		const { container } = render(<AddBox />);
		expect(container).toBeInTheDocument();
	});
});
