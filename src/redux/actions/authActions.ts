import { UserCredentials } from '@/types/userCredentials';
import { loginRequest } from '@/redux/slices/authSlice';

export const loginUser = (credentials: UserCredentials, onLoginSuccess?: () => void) => {
	return {
		type: loginRequest.type,
		payload: { credentials, onLoginSuccess }
	};
};
