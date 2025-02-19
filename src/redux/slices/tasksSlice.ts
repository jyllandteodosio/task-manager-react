import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/tasks';
import { TasksState } from '@/types/tasks';

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
  currentTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchTasksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTaskByIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTaskByIdSuccess: (state, action: PayloadAction<Task>) => {
      state.loading = false;
      state.currentTask = action.payload;
    },
    fetchTaskByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.loading = false;
      state.items.push(action.payload);
    },
    addTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action: PayloadAction<Task>) => {
      state.loading = false;

      const taskId = action.payload.id;
      const taskIndex = state.items.findIndex(item => item.id === taskId);
      if (taskIndex !== -1) {
        state.items[taskIndex] = action.payload;
      }
    },
    updateTaskFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action: PayloadAction<{ id: string }>) => {
      state.loading = false;
      state.items = state.items.filter(task => task.id !== action.payload.id);
    },
    deleteTaskFailure: (state, action: PayloadAction<string>) => {
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
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
} = tasksSlice.actions;

export default tasksSlice.reducer;