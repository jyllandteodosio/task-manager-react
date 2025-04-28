'use client'
import { useState, useEffect } from 'react';
import { useFetchListsQuery } from '@/redux/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentList } from '@/redux/slices/currentListSlice';
import { ListType } from '@/types/lists';
import { RootState } from '@/redux/store';
import List from "./List"
import Modal from '../layouts/Modal';
import AddListForm from './AddListForm';

const ListsSection = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const dispatch = useDispatch();

	const currentList = useSelector((state: RootState) => state.currentList.currentList);

	const { data: lists, isLoading, isError } = useFetchListsQuery({});

	useEffect(() => {
		if (lists && lists.result && lists.result.length > 0 && !currentList) {
			dispatch(setCurrentList(lists.result[0]));
		}
	}, [lists, dispatch]);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleListClick = (list: ListType) => {
		dispatch(setCurrentList(list));
	};

	return (
		<div id="lists-section" className="col-span-4 2xl:col-span-2 xl:col-span-3 lg:col-span-4 pb-4">
			<div id="lists-section-header" className="flex justify-between align-top">
				<div className="leading-8 mb-8">
					<h2 className="font-semibold">Lists</h2>
					<p className="text-[#373737]">Create a list and add your tasks</p>
				</div>
				<div id="list-options-wrapper">
					<button id="list-options" className="rounded-full bg-[#F9FAFB] hover:bg-[#EAECF0] py-2 px-1 transition-all duration-300 ease-in-out">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
						</svg>
					</button>
				</div>
			</div>
			<button
				type="submit"
				onClick={openModal}
				className="block w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
				Add List
			</button>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<AddListForm closeModal={closeModal} />
			</Modal>

			<div id="lists" className="mt-6 max-h-[65vh] overflow-y-auto inset-shadow-md">
				<ul className="flex flex-col gap-y-4">
					{isLoading && <p>Loading lists...</p>}
					{isError && <p className="text-red-500">"Failed to load lists"</p>}
					{lists && lists.result && lists.result.map((list: ListType) => (
						<List
							key={list._id}
							list={list}
							isSelected={currentList && list._id === currentList._id}
							handleListClick={() => handleListClick(list)} />
					))}
				</ul>
			</div>
		</div>
	)
}

export default ListsSection;