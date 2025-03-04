'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Task } from "@/types/tasks";
import { deleteTask, updateTask } from "@/redux/actions/taskActions";

interface TaskComponentProps {
	task: Task
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
	const taskRef = useRef<HTMLDivElement | null>(null);
	const [taskData, setTaskData] = useState(task);
	const [updateTaskState, setUpdateTaskState] = useState(false);

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setTaskData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleUpdateTask = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setUpdateTaskState(true);
	}

	const dispatch = useDispatch();

	const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(updateTask(taskData));
		setUpdateTaskState(false);
	};

	const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(deleteTask(taskData.id));
		setUpdateTaskState(false);
	};

	const handleClose = useCallback(() => {
		setUpdateTaskState(false);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			// console.log(target.id);

			if (target.id == "update-task" || target.id == "delete-task") {
				return;
			}

			if (taskRef.current && !taskRef.current.contains(e.target as Node)) {
				handleClose();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [handleClose]);

	return (
		<li className="flex-auto justify-between bg-zinc-800 hover:bg-zinc-700 border-none">
			<form
				id="update-task-form"
				data-testid="update-task-form"
				onSubmit={handleUpdateSubmit}
				className="bg-transparent flex"
			>
				<div
					id="textarea-wrapper"
					data-testid="textarea-wrapper"
					draggable="true"
					ref={taskRef}
					className="basis-3/4 min-w-0 flex-auto px-5 py-4">
					<textarea
						id="add-task-form-title"
						data-testid="add-task-form-title"
						name="title"
						onChange={handleFieldChange}
						onClick={handleUpdateTask}
						className="text-sm/6 font-semibold text-white tracking-tight bg-transparent w-full resize-none focus-visible:outline-0"
						value={taskData.title} />
				</div>

				{updateTaskState ? (
					<div className="basis-1/4 mt-4 flex-col flex">
						<button
							id="update-task"
							data-testid="update-task"
							onClick={handleUpdateSubmit}
							className="task-buttons basis-1/3 py-2 px-3 text-sm bg-blue-700 rounded-sm font-bold hover:bg-blue-800">
							Update
						</button>
						<button
							id="delete-task"
							data-testid="delete-task"
							onClick={handleDeleteTask}
							className="task-buttons basis-1/3 py-2 px-3 text-sm bg-red-700 rounded-sm font-bold hover:bg-red-800">
							Delete
						</button>
					</div>
				) : ""}
			</form>
		</li>
	)
}

export default TaskComponent