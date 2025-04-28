import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) {
		return null;
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
			onClick={handleOverlayClick}
		>
			<div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-scale-in">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 focus:outline-none"
					aria-label="Close modal"
				>
					<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>

				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;

