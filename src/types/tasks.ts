export interface Task {
	id: string,
	title: string,
	body: string,
	userId: string,
	creationDate: Date,
	prev: string,
}

export interface TasksState {
	items: Task[],
	loading: boolean,
	error: string | null,
	currentTask: Task | null,
}