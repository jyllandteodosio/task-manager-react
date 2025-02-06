'use client';
import User from "./User";

const TaskFooter = ({ dueDate } : { dueDate: Date }) => {
	let currentDate = new Date(dueDate)
	let currentDateFormatted = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}).format(currentDate);

	return (
		<>
			<div className="flex mt-5 justify-between">
				<div id="task-date" className="rounded-md border-2 border-gray-950 bg-gray-900 opacity-75 px-3 py-2 text-xs text-white">
					{currentDateFormatted}
				</div>
				<User />
			</div>
		</>
	)
}

export default TaskFooter