'use client'

import TaskSubdetail from "./TaskSubdetail"

const Task = () => {
	return (
		<li className="p-4 hover:shadow-md">
			<div id="task" className="flex justify-between align-top">
				<div id="task-detail" className="pr-4">
					<h4 id="task-title" className="font-semibold text-sm leading-6">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
					</h4>
					<div id="task-content" className="mb-4">
						<p className="text-[#344054] font-light text-sm leading-6">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
						</p>
					</div>
					<TaskSubdetail />
				</div>
				<button id="task-options" className="h-10 rounded-full bg-[#F9FAFB] hover:bg-[#EAECF0] py-2 px-1 transition-all duration-300 ease-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
					</svg>
				</button>
			</div>
		</li>
	)
}

export default Task