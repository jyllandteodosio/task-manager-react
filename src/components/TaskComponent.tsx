import { Task } from "@/types/tasks"
import Status from "./Status"
import TaskFooter from "./TaskFooter"

const TaskComponent = ({ task } : { task: Task }) => {
	return (
		<>
			<div className="block bg-white dark:bg-gray-800 rounded-lg p-4 ring shadow-xl ring-gray-900/5 min-w-80 block">
				<Status status={task.status}/>
				<p></p>
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