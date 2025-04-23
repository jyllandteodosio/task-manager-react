'use client'

import List from "./List"

const ListsSection = () => {

	return (
		<div id="lists-section" className="col-span-4 2xl:col-span-2 xl:col-span-3 lg:col-span-4 pb-4">
			<div id="lists-section-header" className="flex justify-between align-top">
				<div className="leading-8 mb-8">
					<h2 className="font-semibold">Lists</h2>
					<p className="text-[#373737]">Create a list and add your tasks</p>
				</div>
				<div id="list-options-wrapper">
					<button id="list-options" className="rounded-full bg-[#F9FAFB] hover:bg-[#EAECF0] py-2 px-1 transition-all duration-300 ease-in-out">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
						</svg>
					</button>
				</div>
			</div>
			<button
				type="submit"
				className="block w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
				Add List
			</button>
			<div id="lists" className="mt-6">
				<ul className="flex flex-col gap-y-4">
					<List />
					<List />
				</ul>
			</div>
		</div>
	)
}

export default ListsSection