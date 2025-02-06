export interface Task {
	id: string,
	title: string,
	body: string,
	dueDate: Date,
	status: string,
	userId: number,
	creationDate: Date,
	prev: string,
}

export interface TasksState {
	items: Task[],
	loading: boolean,
	error: string | null,
}