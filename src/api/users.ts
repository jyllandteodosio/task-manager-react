import { User } from "@/types/users";
import { config } from "../../config"
const BASE_URL = config.API_URL;

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  
  const data = await response.json();
  return data;
}

export async function fetchUserById(id: string) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user with id: ${id}`);
  }
  
  const data = await response.json();
  return data;
}

export async function fetchUserTasksById(id: string) {
  const response = await fetch(`${BASE_URL}/users/${id}/tasks`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user tasks with id: ${id}`);
  }
  
  const data = await response.json();
  return data;
}

export async function addUser(newUser: User) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add user');
  }
  
  const data = await response.json();
  return data;
}
