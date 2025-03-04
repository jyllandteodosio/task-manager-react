import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredentials } from '@/types/userCredentials';
import { UserCredentialState } from '@/types/userCredentials';

const initialState: UserCredentialState = {
  items: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<UserCredentials>) => {
      state.loading = false;
      state.items = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkAuthRequest: (state) => {
      state.loading = true;
    },
    checkAuthSuccess: (state, action: PayloadAction<UserCredentials>) => {
      state.loading = false;
      state.items = action.payload;
      state.isAuthenticated = true;
    },
    checkAuthFailure: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  checkAuthRequest,
  checkAuthSuccess,
  checkAuthFailure,
} = authSlice.actions;

export default authSlice.reducer;