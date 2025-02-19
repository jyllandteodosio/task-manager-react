import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskComponent from "./TaskComponent";
import { useDispatch } from "react-redux";

jest.mock("react-redux", () => ({
	useDispatch: jest.fn(),
}));

const creationDate = new Date();

const mockTask = {
	id: "1",
	title: "Task 1",
	body: "Test 1",
	creationDate: creationDate,
	userId: "1",
	prev: "1"
};

const controlButtons = [
	"update-task",
	"delete-task",
	"cancel-update-task"
];

const expectControlButtonsToBeVisible = (visible: boolean) => {
	controlButtons.forEach((buttonTestId) => {
		if (visible) {
			expect(screen.queryByTestId(buttonTestId)).toBeInTheDocument();
		} else {
			expect(screen.queryByTestId(buttonTestId)).toBeNull();
		}
	});
};


describe("TaskComponent", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders task and does not show control buttons initially", () => {
		render(<TaskComponent task={mockTask} />)

		expect(screen.getByTestId("update-task-form")).toBeInTheDocument();
		expect(screen.getByTestId("textarea-wrapper")).toBeInTheDocument();

		const textarea = screen.getByTestId("add-task-form-title");
		expect(textarea).toBeInTheDocument();
		expect(textarea).toHaveValue(mockTask.title);

		expectControlButtonsToBeVisible(false);
	});

	it("displays control buttons when TaskComponent is clicked", () => {
		render(<TaskComponent task={mockTask} />)

		const textarea = screen.getByTestId("add-task-form-title");
		fireEvent.click(textarea);

		expectControlButtonsToBeVisible(true);
	});

	it("hides the control buttons and removes focus on form after clicking Cancel", async () => {
		render(<TaskComponent task={mockTask} />)

		const textarea = screen.getByTestId("add-task-form-title");
		fireEvent.click(textarea);

		const cancelButton = await screen.findByTestId("cancel-update-task");
		expect(cancelButton).toBeInTheDocument();

		fireEvent.click(cancelButton);

		expectControlButtonsToBeVisible(false);
	});

	it("updates task title on field change", () => {
		render(<TaskComponent task={mockTask} />);

		const textarea = screen.getByTestId("add-task-form-title");
		expect(textarea).toHaveValue(mockTask.title);
		
		fireEvent.change(textarea, { target: { value: "Updated task title" } });

		expect(textarea).toHaveValue("Updated task title");
	});

	it("dispatches updateTask action when update button is clicked", async () => {
		const mockDispatch = jest.fn();
		(useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);

		render(<TaskComponent task={mockTask} />);

		const textarea = screen.getByTestId("add-task-form-title");
		fireEvent.change(textarea, { target: { value: "Updated task title" } });

		fireEvent.click(textarea);

		const updateButton = await screen.findByTestId("update-task");
		expect(updateButton).toBeInTheDocument();

		fireEvent.click(updateButton);

		expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ 
			type: "tasks/updateTaskRequest",
			payload: { ...mockTask, title: "Updated task title", creationDate: expect.any(String) }
		}));
	});

	it("dispatches updateTask action when form is submitted", () => {
		const mockDispatch = jest.fn();
		(useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);

		render(<TaskComponent task={mockTask} />);

		const textarea = screen.getByTestId("add-task-form-title");
		fireEvent.change(textarea, { target: { value: "Updated task title" } });

		const form = screen.getByTestId("update-task-form");
		fireEvent.submit(form);

		expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ 
			type: "tasks/updateTaskRequest",
			payload: { ...mockTask, title: "Updated task title", creationDate: expect.any(String) }
		}));
	});

	it("dispatches deleteTask action when delete button is clicked", async () => {
		const mockDispatch = jest.fn();
		(useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);
	
		render(<TaskComponent task={mockTask} />);
		fireEvent.click(screen.getByTestId("add-task-form-title"));
	
		const deleteButton = await screen.findByTestId("delete-task");
		fireEvent.click(deleteButton);
	
		expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ 
			type: "tasks/deleteTaskRequest",
			payload: mockTask.id 
		}));
	});

	it("hides update controls when clicking outside the task", () => {
		render(<TaskComponent task={mockTask} />);
		fireEvent.click(screen.getByTestId("add-task-form-title"));
		expectControlButtonsToBeVisible(true);
	
		fireEvent.mouseDown(document.body);
		expectControlButtonsToBeVisible(false);
	});
	

});
