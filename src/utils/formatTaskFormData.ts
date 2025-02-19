import { Task } from "@/types/tasks";

export const formatTaskFormData = (task: Task) => {
  return {
    ...task,
    creationDate: task.creationDate.toISOString(),
  };
};