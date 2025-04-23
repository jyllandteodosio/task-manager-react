'use client'

import SharedWith from "./SharedWith"
import Task from "./Task"

const ListDetailSection = () => {
	return (
		<div id="list-detail-section" className="col-span-6 2xl:col-span-5 xl:col-span-7 lg:col-span-6 ml-8">
			<div id="list-detail" className="rounded-lg border-2 border-[#EAECF0] p-6">
				<div className="leading-10">
					<h3 className="font-semibold text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h3>
					<p className="text-[#344054]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.</p>
				</div>
				<SharedWith />
				<div id="tasks-wrapper" className="mt-6">
					<div id="tasks-header" className="flex justify-between items-end pb-4 border-b-[1px] border-[#EAECF0]">
						<span className="font-semibold">Tasks</span>
						<button
							type="submit"
							className="block min-w-36 justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
							Add Task
						</button>
					</div>
					<div id="tasks">
						<ul className="divide-y-[1px] divide-[#EAECF0]">
							<Task />
							<Task />
							<Task />
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListDetailSection