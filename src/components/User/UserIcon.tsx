'use client'

import { useFetchUserByIdQuery } from "@/redux/api/apiSlice"


const UserIcon = ({ userId }: { userId: string }) => {
	const { data } = useFetchUserByIdQuery(userId);
	const user = data?.result;
	const userInitials = user && user.firstName.charAt(0) + user.lastName.charAt(0);

	return (
		<div className="min-w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
			<span>{userInitials}</span>
		</div>
	)
}

export default UserIcon;