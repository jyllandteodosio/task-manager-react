import { UserCredentials } from "@/types/userCredentials";
import { config } from "../../config"
const BASE_URL = config.API_URL;

export async function checkAuth() {
	const response = await fetch(`${BASE_URL}/auth-status`, {
		method: 'GET',
		credentials: 'include',
	});
	
	if (!response.ok) {
		throw new Error('Failed to get auth status');
	}
	
	const data = await response.json();
	return data?.result ?? [];
}

export async function login(credentials: UserCredentials) {
	const response = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	
	if (!response.ok) {
		throw new Error('Failed to log in');
	}
	
	const data = await response.json();
	return data?.result ?? [];
}

