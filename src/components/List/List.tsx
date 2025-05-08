'use client'
import { ListType } from "@/types/lists";
import UserIcon from "../User/UserIcon";

interface ListProps {
	list: ListType;
	isSelected: boolean | null;
	handleListClick: React.MouseEventHandler<HTMLLIElement>;
}

const List = ({ list, isSelected, handleListClick }: ListProps) => {

	const selectedClass = "bg-[#5A5A5A] border-[#5A5A5A] text-white";
	const unselectedClass = "bg-[#F9FAFB] border-[#EAECF0] text-[#373737]";
	const listClass = isSelected ? selectedClass : unselectedClass;
	const listTitleTrimmed = list.title.length > 60 ? list.title.slice(0, 60) + "..." : list.title;

	return (
		<li id="list"
			onClick={handleListClick}
			className={`${listClass} flex justify-between p-4 rounded-lg hover:bg-[#5A5A5A] hover:border-[#5A5A5A] hover:text-white transition-all duration-300 ease-in-out`}>
			<h3 id="list-title" className="pr-4 text-sm">
				{listTitleTrimmed}
			</h3>
			<UserIcon userId={list.ownerId}/>
		</li>
	)
}

export default List