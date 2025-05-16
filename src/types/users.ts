export interface UserType {
	_id: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface AuthState {
	user: UserType | null;
	isAuthenticated: boolean;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}
