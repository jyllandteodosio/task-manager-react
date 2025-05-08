'use client'

import { TaskType } from "@/types/tasks";
import TaskSubdetail from "./TaskSubdetail";
import TaskOptions from "./TaskOptions";

interface TaskProps {
	task: TaskType;
}

const Task = ({ task }: TaskProps) => {
	return (
		<li className="p-4 hover:shadow-md relative">
			<div id="task" className="flex justify-between align-top">
				<div id="task-detail" className="pr-4">
					<h4 id="task-title" className="font-semibold text-sm leading-6">
						{task.title}
					</h4>
					<div id="task-content" className="mb-4">
						<p className="text-[#344054] font-light text-sm leading-6">
							{task.description}
						</p>
					</div>
					<TaskSubdetail task={task} />
				</div>
				<TaskOptions task={task} />
			</div>
		</li>
	)
}

export default Task