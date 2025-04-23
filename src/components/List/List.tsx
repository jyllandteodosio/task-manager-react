'use client'

import UserIcon from "../User/UserIcon"

const List = () => {
	return (
		<li id="list" className="flex justify-between p-4 rounded-lg bg-[#F9FAFB] border-2 border-[#EAECF0] hover:bg-[#5A5A5A] hover:border-[#5A5A5A] hover:text-white transition-all duration-300 ease-in-out">
			<h3 id="list-title">
				Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			</h3>
			<UserIcon />
		</li>
	)
}

export default List