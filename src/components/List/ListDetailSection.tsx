'use client'

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFetchTasksByListIdQuery } from '@/redux/api/apiSlice';
import { TaskType } from '@/types/tasks';
import SharedWith from "./SharedWith";
import Task from "../Task/Task";
import Modal from '../layouts/Modal';
import AddTaskForm from '../Task/AddTaskForm';
import ListDetailOptions from './ListDetailOptions';

const ListDetailSection = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const currentList = useSelector((state: RootState) => state.currentList.currentList);

	const { data: tasks, isLoading, isError } = useFetchTasksByListIdQuery(
		currentList?._id,
		{
			skip: !currentList,
		}
	);

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
					<ListDetailOptions />
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
							{isLoading && <p>Loading tasks...</p>}
							{isError && <p className="text-red-500">Failed to load tasks.</p>}
							{tasks && tasks.result && tasks.result.length > 0 ? (
								tasks.result.map((task: TaskType) => (
									<Task key={task._id} task={task} />
								))
							) : (
								<li className="p-4 hover:shadow-md">
									<p className="text-sm leading-6 text-gray-500">No tasks available.</p>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListDetailSection;