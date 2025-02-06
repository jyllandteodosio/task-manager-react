import { Task } from '@/types/tasks';
import { addTaskRequest } from '@/redux/slices/tasksSlice';

export const createPost = (newTask: Task) => {
  return {
    type: addTaskRequest.type,
    payload: newTask,
  };
};