import { TasksState } from "./tasks";
import { UsersState } from "./users";

export interface RootState {
	tasks: TasksState,
	users: UsersState
}