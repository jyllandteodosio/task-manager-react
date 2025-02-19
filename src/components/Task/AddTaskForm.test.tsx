import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTaskForm from "./AddTaskForm";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
	useDispatch: jest.fn(),
}));

const mockCancelFn = jest.fn();

describe("AddTaskForm Component", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("renders all form elements correctly", () => {
		render(<AddTaskForm onCancel={mockCancelFn} />);

		expect(screen.getByTestId("add-task-form")).toBeInTheDocument();
		expect(screen.getByTestId("textarea-wrapper")).toBeInTheDocument();
		expect(screen.getByTestId("add-task-form-title")).toBeInTheDocument();
		expect(screen.getByTestId("add-task-form-btns")).toBeInTheDocument();
		expect(screen.getByTestId("add-task")).toBeInTheDocument();
		expect(screen.getByTestId("cancel-new-task")).toBeInTheDocument();
	});

	it("calls onCancel function when cancel button is clicked", async () => {
		render(<AddTaskForm onCancel={mockCancelFn} />);

		const cancelButton = await screen.findByTestId("cancel-new-task");

		fireEvent.click(cancelButton);

		expect(mockCancelFn).toHaveBeenCalledTimes(1);
	});

	it("submits the form and dispatches the createTask action", () => {
		const mockInitialTask = {
			id: "",
			title: "",
			body: "",
			userId: "0",
			creationDate: new Date(),
			prev: "",
		};
		const mockDispatch = jest.fn();
		(useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);

		render(<AddTaskForm onCancel={mockCancelFn} />);

		const textarea = screen.getByTestId("add-task-form-title");
		fireEvent.change(textarea, { target: { value: "New Task" } });

		const addTaskButton = screen.getByTestId("add-task");
		fireEvent.click(addTaskButton);

		expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
			type: "tasks/addTaskRequest",
			payload: { ...mockInitialTask, title: "New Task", creationDate: expect.any(String) }
		}));
	});

});
