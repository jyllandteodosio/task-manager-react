'use client';
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Task } from "@/types/tasks";
import { deleteTask, updateTask } from "@/redux/actions/tasksActions";

interface TaskComponentProps {
	task: Task
}

const TaskComponent : React.FC<TaskComponentProps> = ({ task }) => {
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

	const handleCancelUpdateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setUpdateTaskState(false);
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
    const handleClickOutside = (e : MouseEvent) => {
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
		<>
			<form
				id="update-task-form"
				data-testid="update-task-form"
				onSubmit={handleUpdateSubmit}
				className="bg-transparent"
				>
				<div
					id="textarea-wrapper"
					data-testid="textarea-wrapper"
					draggable="true"
					ref={taskRef}
					className="block bg-[#1d1d1d] border-[#1d1d1d] border-2 hover:border-white hover:border-2 rounded-sm p-4 mt-4 shadow-md min-w-80 block cursor-grab active:cursor-grabbing">
					<textarea
						id="add-task-form-title"
						data-testid="add-task-form-title"
						name="title"
						onChange={handleFieldChange}
						onClick={handleUpdateTask}
						className="resize-none bg-transparent w-full text-white text-base font-medium tracking-tight focus-visible:outline-0 focus-visible:bg-[#1d1d1d]"
						value={taskData.title} />
				</div>

				{updateTaskState ? (
					<div className="mt-4 flex justify-between">
						<button
							id="update-task"
							data-testid="update-task"
							onClick={handleUpdateSubmit}
							className="task-buttons py-2 px-3 text-sm bg-blue-700 rounded-sm font-bold hover:bg-blue-800">
							Update Task
						</button>
						<button
							id="delete-task"
							data-testid="delete-task"
							onClick={handleDeleteTask}
							className="task-buttons py-2 px-3 text-sm bg-zinc-800 rounded-sm font-bold hover:bg-zinc-900">
							Delete Task
						</button>
						<button
							onClick={handleCancelUpdateTask}
							id="cancel-update-task"
							data-testid="cancel-update-task"
							className="task-buttons py-2 px-3 text-sm bg-red-700 rounded-sm font-bold hover:bg-red-900">
							Cancel
						</button>
					</div>
				) : ""}
			</form>
		</>
	)
}

export default TaskComponent