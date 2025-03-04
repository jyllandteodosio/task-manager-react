import { combineReducers } from 'redux';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';
import authReducer from './authSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  users: usersReducer,
});