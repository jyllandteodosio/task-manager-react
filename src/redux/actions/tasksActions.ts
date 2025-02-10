import { Task } from '@/types/tasks';
import { addTaskRequest } from '@/redux/slices/tasksSlice';
import { formatDate } from '@/utils/formatDate';
import { formatTaskFormData } from '@/utils/formatTaskFormData';

export const createTask = (newTask: Task) => {
  return {
    type: addTaskRequest.type,
    payload: formatTaskFormData(newTask)
  };
};