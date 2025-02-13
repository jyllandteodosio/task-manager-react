'use client'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Task } from "@/types/tasks";
import { selectTasksData } from "@/redux/selectors/taskSelectors";
import { fetchTasksRequest } from "@/redux/slices/tasksSlice";
import AddTask from "@/components/Task/AddTask"
import TaskComponent from "@/components/Task/TaskComponent"


const List = () => {
	const dispatch = useDispatch();
	const { items, loading, error } = useSelector(selectTasksData);

	useEffect(() => {
		dispatch(fetchTasksRequest());
	}, [dispatch]);

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;

	return (
		<div id="list" className="bg-transparent rounded-sm border-2 border-white px-4 py-6 ring shadow-xl ring-gray-900/5 min-w-80 block">
			{items && (
				items.map((task: Task) => {
					const newTask: Task = {
						...task,
						creationDate: new Date(task.creationDate),
					};
					return (
						<TaskComponent key={newTask.id} task={newTask} />
					);
				})
			)}
			<AddTask />
		</div>
	)
}

export default List