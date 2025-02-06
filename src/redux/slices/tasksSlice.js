import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentTask: null,
  },
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
		fetchTaskByIdRequest: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchTaskByIdSuccess: (state, action) => {
			state.loading = false;
			state.currentTask = action.payload;
		},
    fetchTaskByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess: (state, action) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    addTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
	fetchTasksRequest, 
	fetchTasksSuccess, 
	fetchTasksFailure,
	fetchTaskByIdRequest,
  fetchTaskByIdSuccess,
  fetchTaskByIdFailure,
  addTaskRequest,
  addTaskSuccess,
  addTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;