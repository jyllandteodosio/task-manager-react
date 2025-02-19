import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListWrapper from "./ListWrapper";

jest.mock("@/components/List/List", () => () => <div data-testid="list" />);

describe("ListWrapper", () => {
	it("renders the List component", () => {
		render(<ListWrapper />);
		expect(screen.getByTestId("list")).toBeInTheDocument();
	});
});
