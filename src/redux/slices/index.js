import { combineReducers } from 'redux';
import tasksReducer from './tasksSlice';
// import usersReducer from './usersSlice';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  // users: usersReducer,
});