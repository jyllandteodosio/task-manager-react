import { UserCredentialState } from "./userCredentials";
import { ListsState } from "./lists";
import { TasksState } from "./tasks";
import { UsersState } from "./users";

export interface RootState {
	auth: UserCredentialState
	lists: ListsState,
	tasks: TasksState,
	users: UsersState,
}