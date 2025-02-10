import { Task } from "@/types/tasks";
import { config } from "../../config"
const BASE_URL = config.API_URL;

export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  const data = await response.json();
  console.log({fetchedData: data})
  return data?.result ?? [];
}

export async function fetchTaskById(id: string) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch task with id: ${id}`);
  }
  
  const data = await response.json();
  return data;
}

export async function addTask(newTask: Task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  
  const data = await response.json();
  console.log({fetchedData: data})
  return data?.result ?? [];
}

export async function updateTask(task: Task) {
  const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  
  const data = await response.json();
  return data;
}

export async function deleteTask(id: string) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  
  const data = await response.json();
  return data;
}
