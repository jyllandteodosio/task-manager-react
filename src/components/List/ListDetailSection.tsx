'use client'

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SharedWith from "./SharedWith";
import Task from "./Task";
import Modal from '../layouts/Modal';
import AddTaskForm from '../Task/AddTaskForm';

const ListDetailSection = () => {
	const currentList = useSelector((state: RootState) => state.currentList.currentList);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	if (!currentList) {
		return (
			<div id="list-detail-section" className="col-span-6 2xl:col-span-5 xl:col-span-7 lg:col-span-6 ml-8">
				<div id="list-detail" className="rounded-lg border-2 border-[#EAECF0] p-6">
					<p className="text-gray-500">Select a list to view its details.</p>
				</div>
			</div >
		);
	}

	return (
		<div id="list-detail-section" className="col-span-6 2xl:col-span-5 xl:col-span-7 lg:col-span-6 ml-8">
			<div id="list-detail" className="rounded-lg border-2 border-[#EAECF0] p-6 min-h-[84vh] max-h-[84vh] overflow-hidden overflow-y-auto">
				<div id="list-detail-header" className="flex justify-between items-start">
					<div className="">
						<h3 className="leading-8 font-semibold text-xl">{currentList.title}</h3>
						<div className="">
							<p className="leading-7 text-[#344054]">{currentList.description}</p>
						</div>
					</div>
					<div id="list-detail-options-wrapper">
						<button id="list-detail-options" className="rounded-full bg-[#F9FAFB] hover:bg-[#EAECF0] py-2 px-1 transition-all duration-300 ease-in-out">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
							</svg>
						</button>
					</div>
				</div>
				<SharedWith />
				<div id="tasks-wrapper" className="mt-6 overflow-hidden xl:border-none border-b-2 border-zinc-300">
					<div id="tasks-header" className="flex justify-between items-end pb-4 border-b-[1px] border-[#EAECF0]">
						<span className="font-semibold">Tasks</span>
						<button
							type="submit"
							onClick={openModal}
							className="block min-w-36 justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">
							Add Task
						</button>
						<Modal isOpen={isModalOpen} onClose={closeModal}>
							<AddTaskForm closeModal={closeModal} />
						</Modal>
					</div>
					<div id="tasks" className="">
						<ul className="divide-y-[1px] divide-[#EAECF0]">
							<Task />
							<Task />
							<Task />
							<Task />
							<Task />
							<Task />
							<Task />
							<Task />
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListDetailSection;