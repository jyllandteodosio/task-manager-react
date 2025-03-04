import { User } from '@/types/users';
import { addUserRequest } from '@/redux/slices/usersSlice';

export const registerUser = (newUser: User, onRegisterSuccess?: () => void) => {
	return {
		type: addUserRequest.type,
		payload: { newUser, onRegisterSuccess }
	};
};
