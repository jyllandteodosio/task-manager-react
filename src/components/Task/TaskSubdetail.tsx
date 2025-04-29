'use client';

import { useFetchUserByIdQuery } from "@/redux/api/apiSlice";
import { TaskType } from "@/types/tasks";

interface TaskProps {
	task: TaskType;
}

const TaskSubdetail = ({ task }: TaskProps) => {
	const { data: user } = useFetchUserByIdQuery(task.createdBy);
	const fullName = user && user.result ? `${user.result.firstName} ${user.result.lastName}` : "";

	const date = new Date(task.createdAt);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	const formattedDate = date.toLocaleDateString('en-US', options);

	return (
		<div id="task-subdetail" className="flex items-center gap-x-4">
			<div id="task-subdetail-left" className="flex items-center align-center">
				<div id="createdDate" className="flex gap-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
					</svg>
					<span className="text-xs text-[#344054]">
						{formattedDate}
					</span>
				</div>
			</div>
			<div id="task-subdetail-right" className="flex items-center align-center">
				<div id="createdBy" className="flex gap-x-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
					</svg>
					<span className="text-xs text-[#344054]">
						{fullName}
					</span>
				</div>
			</div>
		</div>
	)
}

export default TaskSubdetail