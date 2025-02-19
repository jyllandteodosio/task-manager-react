import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/testUtils";
import "@testing-library/jest-dom";
import AddTask from "./AddTask";

describe("AddTask Component", () => {
  it("renders AddTask button initially and AddTaskForm when clicked", async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    renderWithProviders(<AddTask />);
    
    const addTaskButton = screen.getByTestId("add-task");
    expect(addTaskButton).toBeInTheDocument();

    fireEvent.click(addTaskButton);

    expect(await screen.findByTestId("add-task-form")).toBeInTheDocument();
  });

	it("hides the AddTaskForm and shows the AddTask button after clicking Cancel", async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

		renderWithProviders(<AddTask />);
		
		const addTaskButton = screen.getByTestId("add-task");
		fireEvent.click(addTaskButton);
		
		const addTaskForm = await screen.findByTestId("add-task-form");
		expect(addTaskForm).toBeInTheDocument();

		const cancelButton = await screen.findByTestId("cancel-new-task");
		expect(cancelButton).toBeInTheDocument();

		fireEvent.click(cancelButton);
		
		expect(screen.queryByTestId("add-task-form")).not.toBeInTheDocument();
		expect(screen.getByTestId("add-task")).toBeInTheDocument();
	});
	
});
