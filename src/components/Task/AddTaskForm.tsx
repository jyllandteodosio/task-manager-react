'use client';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Task } from "@/types/tasks";
import { createTask } from "@/redux/actions/tasksActions";

interface AddTaskFormProps {
	onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onCancel }) => {
	const [taskData, setTaskData] = useState<Task>({
		id: "",
		title: "",
		body: "",
		userId: "0",
		creationDate: new Date(),
		prev: "",
	});

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setTaskData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleCancelTask = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onCancel();
	}

	const dispatch = useDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createTask(taskData));
		onCancel();
	};


	return (
		<>
			<form
				id="add-task-form"
				data-testid="add-task-form"
				onSubmit={handleSubmit}
				className="bg-transparent"
			>
				<div
					id="textarea-wrapper"
					data-testid="textarea-wrapper"
					className="block bg-[#1d1d1d] border-[#1d1d1d] border-2 hover:border-white hover:border-2 rounded-sm p-4 mt-4 shadow-md min-w-80 block">
					<textarea
						id="add-task-form-title"
						data-testid="add-task-form-title"
						name="title"
						onChange={handleFieldChange}
						className="resize-none bg-transparent w-full text-white text-base font-medium tracking-tight focus-visible:outline-0 focus-visible:bg-[#1d1d1d]"
						placeholder="Enter task" />

				</div>
				<div 
				id="add-task-form-btns"
				data-testid="add-task-form-btns"
				className="mt-4 flex justify-between">
					<button
						id="add-task"
						data-testid="add-task"
						className="py-2 px-3 text-sm bg-indigo-900 rounded-sm font-bold hover:bg-indigo-950">
						Add Task
					</button>
					<button
						onClick={handleCancelTask}
						id="cancel-new-task"
						data-testid="cancel-new-task"
						className="py-2 px-3 text-sm bg-red-700 rounded-sm font-bold hover:bg-red-900">
						Cancel
					</button>
				</div>

			</form>
		</>
	)
}

export default AddTaskForm