import { UserCredentialState } from "./userCredentials";
import { TasksState } from "./tasks";
import { UsersState } from "./users";

export interface RootState {
	auth: UserCredentialState
	tasks: TasksState,
	users: UsersState
}