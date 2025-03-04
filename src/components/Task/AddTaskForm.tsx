'use client';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task } from "@/types/tasks";
import { createTask } from "@/redux/actions/taskActions";
import { RootState } from "@/types";

interface AddTaskFormProps {
	onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onCancel }) => {
	const currentUserId = useSelector((state: RootState) => state.users.currentUser);
	const [taskData, setTaskData] = useState<Task>({
		id: "",
		title: "",
		body: "",
		userId: currentUserId ?? "",
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
		<div className="flex-auto justify-between border-none">
			<form
				id="add-task-form"
				data-testid="add-task-form"
				onSubmit={handleSubmit}
				className="bg-transparent"
				data-userid={currentUserId}
			>
				<div
					id="textarea-wrapper"
					data-testid="textarea-wrapper"
					className="min-w-0 flex-auto px-5 py-4 bg-zinc-800 hover:bg-zinc-700">
					<textarea
						id="add-task-form-title"
						data-testid="add-task-form-title"
						name="title"
						onChange={handleFieldChange}
						className="text-sm/6 font-semibold text-white tracking-tight bg-transparent w-full resize-none focus-visible:outline-0"
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
		</div>
	)
}

export default AddTaskForm