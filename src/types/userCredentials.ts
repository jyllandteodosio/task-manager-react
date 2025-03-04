export interface UserCredentials {
	username: string;
	password: string;
}

export interface UserCredentialState {
	items: UserCredentials | null,
	loading: boolean,
	error: string | null,
	isAuthenticated: boolean,
}