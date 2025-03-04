'use client'
import ListComponent from "./ListComponent"
import TasksComponent from "./TasksComponent"

const ListsComponent = () => {

	return (
		<div id="list-panel" className="flex flex-row w-full h-full">
			<div id="lists" data-testid="lists" className="bg-zinc-800 pl-8 pt-[70px] pb-20 basis-1/4">
				<ul role="list" className="space-y-2">
					<ListComponent />
					<ListComponent />
				</ul>
			</div>
			<div id="tasks-panel" className="bg-zinc-900 pl-8 pt-[70px] pb-20 basis-1/4">
				<TasksComponent />
			</div>
		</div>
	)
}

export default ListsComponent

