'use client';
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import User from "./User";

const TaskFooter = ({ dueDate }: { dueDate: Date }) => {
	const [dueDateFormatted, setDueDateFormatted] = useState('');

	useEffect(() => {
		const formattedDate = formatDate(dueDate);
		setDueDateFormatted(formattedDate);
	}, []);

	return (
		<div className="flex mt-5 justify-between">
			<div id="task-date" className="rounded-md border-2 border-gray-950 bg-gray-900 opacity-75 px-3 py-2 text-xs text-white">
				{dueDateFormatted}
			</div>
			<User />
		</div>
	)
}

export default TaskFooter