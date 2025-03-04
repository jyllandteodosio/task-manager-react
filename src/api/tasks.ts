import { Task } from "@/types/tasks";
import { config } from "../../config"
const BASE_URL = config.API_URL;

export async function fetchTasks() {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  
  const data = await response.json();
  return data?.result ?? [];
}

export async function fetchTaskById(id: string) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch task with id: ${id}`);
  }
  
  const data = await response.json();
  return data?.result ?? [];
}

export async function fetchTasksByUserId(userId: string) {
  const response = await fetch(`${BASE_URL}/tasks/user/`, {
    method: "GET",
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch task with userId: ${userId}`);
  }
  
  const data = await response.json();
  return data?.result ?? [];
}

export async function addTask(newTask: Task) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTask),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  
  const data = await response.json();
  return data?.result ?? [];
}

export async function updateTask(task: Task) {
  const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  
  const data = await response.json();
  return data?.result ?? [];
}

export async function deleteTask(id: string) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  
  const data = await response.json();
  return data?.result ?? [];
}
