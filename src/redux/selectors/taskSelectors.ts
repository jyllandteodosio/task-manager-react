import { RootState } from '@/types';
import { createSelector } from '@reduxjs/toolkit';

export const selectTasksState = (state: RootState) => state.tasks;

// Get All Tasks
export const selectTasksData = createSelector(
  selectTasksState,
  (tasksState) => ({
    items: tasksState.items,
    loading: tasksState.loading,
    error: tasksState.error
  })
);

// Get Task by ID
export const makeSelectTaskData = (taskId: string) => createSelector(
  selectTasksState,
  (tasksState) => ({
    item: tasksState.items.find(task => task.id === taskId),
    loading: tasksState.loading,
    error: tasksState.error
  })
);


