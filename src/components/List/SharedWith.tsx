'use client'

import UserIcon from "../User/UserIcon";
import ShareToUserButton from "./ShareToUserButton";

const SharedWith = () => {
	return (
		<div id="sharedWith" className="mt-4">
			<span className="font-bold text-sm text-[#757575]">Shared with:</span>
			<div id="sharedWithUsers" className="flex items-center justify-start mt-2 gap-x-2">
				<UserIcon />
				<UserIcon />
				<UserIcon />
				<ShareToUserButton />
			</div>
		</div>
	)
}

export default SharedWith