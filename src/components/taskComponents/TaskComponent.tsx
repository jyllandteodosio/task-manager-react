'use client';
import { Task } from "@/types/tasks";
import Status from "./Status";
import TaskFooter from "./TaskFooter";
import { useState } from "react";
import { UpdateTaskModal } from "./UpdateTaskModal";

const TaskComponent = ({ task }: { task: Task }) => {
	const [updateTaskState, setUpdateTaskState] = useState(false);

	const handleEditTask = () => {
		setUpdateTaskState(true);
	}

	const handleEditClose = () => {
		setUpdateTaskState(false);
	}

	return (
		<>
		{updateTaskState ? <UpdateTaskModal onClose={handleEditClose} task={task}/> : ""}
		<div
			onClick={handleEditTask}
			draggable="true"
			className="block bg-gray-800 rounded-lg p-4 mt-4 first:mt-0 ring shadow-xl ring-gray-900 min-w-80 block cursor-grab active:cursor-grabbing hover:bg-gray-950">
			<Status status={task.status} />
			<h3 className="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">{task.title}</h3>
			<p className="text-gray-500 dark:text-gray-400 mt-2 text-sm ">
				{task.body}
			</p>
			<TaskFooter dueDate={task.dueDate} />
		</div>
		</>
	)
}

export default TaskComponent