import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/users';
import { UsersState } from '@/types/users';

const initialState: UsersState = {
	items: [],
	loading: false,
	error: null,
	currentUser: null,
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<string | null>) => {
			state.currentUser = action.payload;
		},
		// fetchUsersRequest: (state) => {
		// 	state.loading = true;
		// 	state.error = null;
		// },
		// fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
		// 	state.loading = false;
		// 	state.items = action.payload;
		// },
		// fetchUsersFailure: (state, action: PayloadAction<string>) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// },
		// fetchUserByIdRequest: (state) => {
		// 	state.loading = true;
		// 	state.error = null;
		// },
		// fetchUserByIdSuccess: (state, action: PayloadAction<User>) => {
		// 	state.loading = false;
		// 	state.currentUser = action.payload;
		// },
		// fetchUserByIdFailure: (state, action: PayloadAction<string>) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// },
		addUserRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		addUserSuccess: (state, action: PayloadAction<User>) => {
			state.loading = false;
			state.items.push(action.payload);
		},
		addUserFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		// updateUserRequest: (state) => {
		// 	state.loading = true;
		// 	state.error = null;
		// },
		// updateUserSuccess: (state, action: PayloadAction<User>) => {
		// 	state.loading = false;

		// 	const userId = action.payload.id;
		// 	const userIndex = state.items.findIndex(item => item.id === userId);
		// 	if (userIndex !== -1) {
		// 		state.items[userIndex] = action.payload;
		// 	}
		// },
		// updateUserFailure: (state, action: PayloadAction<string>) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// },
		// deleteUserRequest: (state) => {
		// 	state.loading = true;
		// 	state.error = null;
		// },
		// deleteUserSuccess: (state, action: PayloadAction<{ id: string }>) => {
		// 	state.loading = false;
		// 	state.items = state.items.filter(user => user.id !== action.payload.id);
		// },
		// deleteUserFailure: (state, action: PayloadAction<string>) => {
		// 	state.loading = false;
		// 	state.error = action.payload;
		// },
	},
});

export const {
	setCurrentUser,
	// fetchUsersRequest,
	// fetchUsersSuccess,
	// fetchUsersFailure,
	// fetchUserByIdRequest,
	// fetchUserByIdSuccess,
	// fetchUserByIdFailure,
	addUserRequest,
	addUserSuccess,
	addUserFailure,
	// updateUserRequest,
	// updateUserSuccess,
	// updateUserFailure,
	// deleteUserRequest,
	// deleteUserSuccess,
	// deleteUserFailure,
} = usersSlice.actions;

export default usersSlice.reducer;