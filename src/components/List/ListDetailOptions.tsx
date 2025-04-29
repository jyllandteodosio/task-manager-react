import { useEffect, useRef, useState } from "react";
import Modal from "../layouts/Modal";
import EditListForm from "./EditListForm";
import DeleteListForm from "./DeleteListForm";

const ListDetailOptions = () => {
	const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
	const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

	const optionsButtonRef = useRef<HTMLButtonElement>(null);
	const optionsMenuRef = useRef<HTMLDivElement>(null);

	const openEditModal = () => setIsEditModalOpen(true);
	const closeEditModal = () => setIsEditModalOpen(false);

	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	const toggleOptions = () => {
		setIsOptionsOpen(prev => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!event.target) return;

			if (
				isOptionsOpen &&
				optionsButtonRef.current &&
				!optionsButtonRef.current.contains(event.target as Node) &&
				optionsMenuRef.current &&
				!optionsMenuRef.current.contains(event.target as Node)
			) {
				setIsOptionsOpen(false);
			}
		};

		if (isOptionsOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOptionsOpen]);


	return (
		<div id="list-detail-options-wrapper" className="relative">
			<button
				id="list-detail-options"
				ref={optionsButtonRef}
				onClick={toggleOptions}
				className="rounded-full bg-[#F9FAFB] hover:bg-[#EAECF0] py-2 px-1 transition-all duration-300 ease-in-out"
				aria-haspopup="true"
				aria-expanded={isOptionsOpen}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
				</svg>
			</button>
			{isOptionsOpen && (
				<div
					id="options-menu"
					ref={optionsMenuRef}
					className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10" // Positioning and styling
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="list-detail-options"
				>
					<div className="py-1" role="none">
						<button
							type="submit"
							onClick={openEditModal}
							className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
							role="menuitem"
						>
							Edit List
						</button>
						<button
							type="submit"
							onClick={openDeleteModal}
							className="text-red-600 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
							role="menuitem"
						>
							Delete List
						</button>
						<Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
							<EditListForm closeModal={closeEditModal} />
						</Modal>
						<Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
							<DeleteListForm closeModal={closeDeleteModal} />
						</Modal>
					</div>
				</div>
			)}
		</div>
	)
}

export default ListDetailOptions;