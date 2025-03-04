'use client'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types";
import { Task } from "@/types/tasks";
import { selectTasksData } from "@/redux/selectors/taskSelectors";
import { fetchTasksByUser } from "@/redux/actions/taskActions";
import AddTask from "@/components/Task/AddTask"
import TaskComponent from "@/components/Task/TaskComponent"


const TasksComponent = () => {
	const dispatch = useDispatch();
	const { items, loading, error } = useSelector(selectTasksData);
	const currentUserId = useSelector((state: RootState) => state.users.currentUser);

	useEffect(() => {
		if (currentUserId) {
			dispatch(fetchTasksByUser(currentUserId));
		}
	}, [dispatch, currentUserId]);

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;

	return (
		<div id="tasks" data-testid="tasks" className="">
			<ul role="list" className="space-y-2">
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
				<li><AddTask /></li>
			</ul>
		</div>
	)
}

export default TasksComponent