import { Task } from '@/types/tasks';
import { addTaskRequest, deleteTaskRequest, updateTaskRequest, fetchTasksByUserIdRequest } from '@/redux/slices/tasksSlice';
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

export const fetchTasksByUser = (userId: string) => {
  return {
    type: fetchTasksByUserIdRequest.type,
    payload: userId,
  };
};

