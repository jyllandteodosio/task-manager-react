import { Task } from "@/types/tasks";
import { List } from "@/types/lists";

export const formatTaskFormData = (task: Task) => {
  return {
    ...task,
    creationDate: task.creationDate.toISOString(),
  };
};

export const formatListFormData = (list: List) => {
  return {
    ...list,
    creationDate: list.creationDate.toISOString(),
  };
};