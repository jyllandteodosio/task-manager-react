'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { fetchTasksRequest } from "@/redux/slices/tasksSlice";
import AddTask from "./AddTask"
import TaskComponent from "./TaskComponent"
import { Task } from "@/types/tasks";

const List = () => {

	const dispatch = useDispatch();
	const { items, loading, error } = useSelector((state: RootState) => state.tasks);

	useEffect(() => {
		dispatch(fetchTasksRequest());
	}, [dispatch]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<>
			<div id="list" className="bg-white dark:bg-gray-900 rounded-lg px-4 pt-6 pb-6 ring shadow-xl ring-gray-900/5 min-w-80 block">
				<div id="list-title" className="px-2 mb-4 text-sm font-semibold">
					<h2>Task List</h2>
				</div>
				{items.map((task: Task) => (
					<TaskComponent key={task.id} task={task} />
				))}
				<AddTask />
			</div>
		</>
	)
}

export default List