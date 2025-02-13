import { Task } from "@/types/tasks";

export const formatTaskFormData = (task: Task) => {
  return {
    ...task,
    creationDate: new Date(task.creationDate).toISOString(),
  };
};