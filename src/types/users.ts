export interface User {
	id: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface UsersState {
	items: User[],
	loading: boolean,
	error: string | null,
}