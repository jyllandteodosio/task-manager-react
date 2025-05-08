'use client'

import { useEffect, useState, useCallback } from 'react'; // Import useCallback
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useFetchTasksByListIdQuery, apiSlice } from '@/redux/api/apiSlice';
import { useSocket } from '../layouts/SocketContext';
import { TaskType } from '@/types/tasks';
import { ToastContainer, toast, ToastContentProps } from 'react-toastify';
import SharedWith from "./SharedWith";
import Task from "../Task/Task";
import Modal from '../layouts/Modal';
import AddTaskForm from '../Task/AddTaskForm';
import ListDetailOptions from './ListDetailOptions';
import Notification from '../layouts/Notification';

const ListDetailSection = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const currentList = useSelector((state: RootState) => state.currentList.currentList);
	const currentUser = useSelector((state: RootState) => state.auth.user);
	const { socket } = useSocket();
	const dispatch = useDispatch<AppDispatch>();

	const listId = currentList?._id;

	const { data: tasks, isLoading, isError } = useFetchTasksByListIdQuery(
		listId,
		{
			skip: !listId,
		}
	);

	const notify = useCallback((
		title: string,
		description: string,
		type: 'success' | 'error' | 'info' | 'warning' = 'info'
	) => {
		toast((props: ToastContentProps<any>) => (
			<Notification
				title={title}
				description={description}
				type={type}
				closeToast={props.closeToast}
				toastProps={props.toastProps}
				isPaused={props.isPaused}
				data={props.data}
			/>
		), {
			closeButton: false,
			className: () => "p-0 bg-transparent shadow-none",
		});
	}, []);

	const updateTasksCache = useCallback((
		listIdToUpdate: string,
		updateFn: (draftTasks: { result: TaskType[] | undefined }) => void
	) => {
		dispatch(
			apiSlice.util.updateQueryData(
				'fetchTasksByListId',
				listIdToUpdate,
				(draftTasks: { result: TaskType[] | undefined }) => {
					if (draftTasks?.result === undefined) {
						draftTasks.result = [];
					}
					updateFn(draftTasks);
				}
			)
		);
	}, [dispatch]);

	useEffect(() => {
		if (!socket || !listId || !currentUser?._id) return;

		// Join the list room
		socket.emit('joinList', listId);

		const handleAddCollaborator = ({ listId: eventListId, collaboratorId, ownerId }: any) => {
			if (collaboratorId === currentUser._id) {
				notify(
					'Collaborator Added',
					`You have been added as a collaborator to list "${currentList?.title || eventListId}".`,
					'success'
				);
			} else {
				notify(
					'New Collaborator',
					`A new collaborator has been added to list "${currentList?.title || eventListId}".`,
					'info'
				);
			}
		};

		const handleRemoveCollaborator = ({ listId: eventListId, collaboratorId, ownerId }: any) => {
			if (collaboratorId === currentUser._id) {
				notify(
					'Collaborator Removed',
					`You have been removed as a collaborator from list "${currentList?.title || eventListId}".`,
					'warning'
				);
			} else {
				notify(
					'Collaborator Removed',
					`A collaborator has been removed from list "${currentList?.title || eventListId}".`,
					'info'
				);
			}
		};


		const handleTaskAdded = ({ listId: eventListId, task, message }: { listId: string, task: TaskType, message?: string }) => {
			if (eventListId === listId) {
				notify(
					'Task Added',
					`Task "${task.title}" has been added.`,
					'success'
				);
				updateTasksCache(eventListId, (draftTasks) => {
					if (draftTasks?.result) {
						draftTasks.result.push(task);
					}
				});
			}
		};

		const handleTaskEdited = ({ listId: eventListId, task, message }: { listId: string, task: TaskType, message?: string }) => {
			if (eventListId === listId) {
				notify(
					'Task Edited',
					`Task "${task.title}" has been updated.`,
					'info'
				);
				updateTasksCache(eventListId, (draftTasks) => {
					if (draftTasks?.result) {
						const taskIndex = draftTasks.result.findIndex((t: TaskType) => t._id === task._id);
						if (taskIndex !== -1) {
							draftTasks.result[taskIndex] = task;
						}
					}
				});
			}
		};

		const handleTaskDeleted = ({ listId: eventListId, task, message }: { listId: string, task: TaskType, message?: string }) => {
			if (eventListId === listId) {
				notify(
					'Task Deleted',
					`Task "${task.title}" has been deleted.`,
					'warning'
				);
				updateTasksCache(eventListId, (draftTasks) => {
					if (draftTasks?.result) {
						draftTasks.result = draftTasks.result.filter((t: TaskType) => t._id !== task._id);
					}
				});
			}
		};


		socket.on('addCollaborator', handleAddCollaborator);
		socket.on('removeCollaborator', handleRemoveCollaborator);
		socket.on('taskAdded', handleTaskAdded);
		socket.on('taskEdited', handleTaskEdited);
		socket.on('taskDeleted', handleTaskDeleted);

		// Leave the list room on unmount
		return () => {
			socket.emit('leaveList', listId);
			socket.off('addCollaborator', handleAddCollaborator);
			socket.off('removeCollaborator', handleRemoveCollaborator);
			socket.off('taskAdded', handleTaskAdded);
			socket.off('taskEdited', handleTaskEdited);
			socket.off('taskDeleted', handleTaskDeleted);
		};
	}, [socket, listId, currentUser, notify, updateTasksCache, currentList?.title]); // Added dependencies

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

	if (isLoading) {
		return (
			<div id="list-detail-section" className="col-span-6 2xl:col-span-5 xl:col-span-7 lg:col-span-6 ml-8">
				<div id="list-detail" className="rounded-lg border-2 border-[#EAECF0] p-6">
					<p className="text-gray-500">Loading list details and tasks...</p>
				</div>
			</div >
		);
	}

	if (isError) {
		return (
			<div id="list-detail-section" className="col-span-6 2xl:col-span-5 xl:col-span-7 lg:col-span-6 ml-8">
				<div id="list-detail" className="rounded-lg border-2 border-[#EAECF0] p-6">
					<p className="text-red-500">Error loading list details.</p>
				</div>
			</div >
		);
	}


	return (
		<>
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
					<div id="tasks-wrapper" className="mt-6 xl:border-none border-b-2 border-zinc-300 relative">
						<div id="tasks-header" className="flex justify-between items-end pb-4 border-b-[1px] border-[#EAECF0]">
							<span className="font-semibold">Tasks</span>
							<button
								type="button"
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
			<ToastContainer />
		</>
	);
};

export default ListDetailSection;
