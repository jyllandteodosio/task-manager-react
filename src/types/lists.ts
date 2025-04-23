export interface List {
	id: string,
	title: string,
	userId: string,
	creationDate: Date,
}

export interface ListsState {
	items: List[],
	loading: boolean,
	error: string | null,
	currentList: List | null,
}