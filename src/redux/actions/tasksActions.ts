import { Task } from '@/types/tasks';
import { addTaskRequest, deleteTaskRequest, updateTaskRequest } from '@/redux/slices/tasksSlice';
import { formatTaskFormData } from '@/utils/formatTaskFormData';

export const createTask = (newTask: Task) => {
  return {
    type: addTaskRequest.type,
    payload: formatTaskFormData(newTask)
  };
};

export const updateTask = (task: Task) => {
  return {
    type: updateTaskRequest.type,
    payload: formatTaskFormData(task)
  };
};

export const deleteTask = (id: string) => {
  return {
    type: deleteTaskRequest.type,
    payload: id
  };
};

