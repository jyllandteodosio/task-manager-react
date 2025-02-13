import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

jest.mock("@/components/layouts/HeaderComponent", () => () => <div data-testid="header-component" />);
jest.mock("@/components/List/ListWrapper", () => () => <div data-testid="list-wrapper" />);

describe("Home Page", () => {
  it("renders the HeaderComponent", () => {
    render(<Home />);
    expect(screen.getByTestId("header-component")).toBeInTheDocument();
  });

  it("renders the ListWrapper component", () => {
    render(<Home />);
    expect(screen.getByTestId("list-wrapper")).toBeInTheDocument();
  });

  it("renders the main layout correctly", () => {
    render(<Home />);
    const mainElement = screen.getByRole("main");
    expect(mainElement).toHaveClass("flex", "flex-col", "gap-8", "row-start-2", "items-center", "sm:items-start");
  });
});
