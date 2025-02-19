import React from "react";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import List from "./List";
import { Task } from "@/types/tasks";
import { useDispatch, useSelector } from "react-redux";

jest.mock("@/components/Task/AddTask", () => () => <div data-testid="add-task-wrapper" />);
jest.mock("@/components/Task/TaskComponent", () => () => <div data-testid="update-task-form" />);

jest.mock("react-redux", () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

describe("List", () => {
	const mockDispatch = jest.fn();

	beforeEach(() => {
		(useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);
		(useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({ items: [], loading: false, error: null, currentTask: null });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the div element", () => {
		render(<List />);
		expect(screen.getByTestId("list")).toBeInTheDocument();
	});

	it("renders the AddTask component", () => {
		render(<List />);
		expect(screen.getByTestId("add-task-wrapper")).toBeInTheDocument();
	});

	it("renders the TaskComponent when there are tasks inside items", () => {
		const creationDate = new Date();

		const mockTasks: Task[] = [
			{ id: "1", title: "Task 1", body: "Test 1", creationDate: creationDate, userId: "1", prev: "1" },
			{ id: "2", title: "Task 2", body: "Test 2", creationDate: creationDate, userId: "2", prev: "2" }
		];

		(useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({ items: mockTasks, loading: false, error: null, currentTask: null });

		render(<List />);

		const taskComponents = screen.getAllByTestId("update-task-form");
		expect(taskComponents).toHaveLength(mockTasks.length);
	});

	it("does not render the TaskComponent when there are no tasks inside items", () => {
		(useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({ items: [], loading: false, error: null, currentTask: null });

		render(<List />);

		expect(screen.queryByTestId("update-task-form")).not.toBeInTheDocument();
	});

	it("dispatches fetchTasksRequest on mount", () => {
		(useSelector as jest.MockedFunction<typeof useSelector>).mockReturnValue({ 
			items: [], 
			loading: false, 
			error: null, 
			currentTask: null 
		});

		render(<List />);

		expect(mockDispatch).toHaveBeenCalledWith({
			type: "tasks/fetchTasksRequest",
		});
	});
});
