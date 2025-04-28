import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../../config';
import { UserCredentials } from '@/types/userCredentials';

const BASE_URL = config.API_URL;

// Thunk for checking authentication status
export const checkAuth = createAsyncThunk<
	{ isAuthenticated: boolean; user: any },
	void,
	{ rejectValue: string }
>('auth/checkAuth', async (_, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BASE_URL}/auth-status`, {
			method: 'GET',
			credentials: 'include',
		});
		if (!response.ok) throw new Error('Failed to get auth status');
		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('An unknown error occurred');
	}
});

// Thunk for login
export const login = createAsyncThunk<
	{ user: any },
	UserCredentials,
	{ rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
	try {
		const response = await fetch(`${BASE_URL}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
			credentials: 'include',
		});
		if (!response.ok) throw new Error('Failed to log in');
		const data = await response.json();
		return data.result;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('An unknown error occurred');
	}
});

// Slice for authentication
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isAuthenticated: false,
		status: 'idle',
		error: null as string | null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuthenticated = action.payload.isAuthenticated;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'An unknown error occurred';
			})
			.addCase(login.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isAuthenticated = true;
				state.user = action.payload.user;
				state.error = null;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload || 'An unknown error occurred';
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;