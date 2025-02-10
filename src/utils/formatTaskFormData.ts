import { Task } from "@/types/tasks";

export const formatTaskFormData = (task: Task) => {
  return {
    ...task,
    dueDate: new Date(task.dueDate).toISOString(),
    creationDate: new Date(task.creationDate).toISOString(),
  };
};