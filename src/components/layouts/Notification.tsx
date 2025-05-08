import React from 'react';
import { ToastContentProps } from 'react-toastify';

import {
	CheckCircleIcon,
	XCircleIcon,
	InformationCircleIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

interface NotificationProps extends ToastContentProps<any> {
	title: string;
	description: string;
	type?: 'success' | 'error' | 'info' | 'warning';
}

const Notification: React.FC<NotificationProps> = ({
	closeToast,
	title,
	description,
	type = 'info',
}) => {

	let IconComponent: React.ElementType;
	let iconColorClass = 'text-gray-500';

	switch (type) {
		case 'success':
			IconComponent = CheckCircleIcon;
			iconColorClass = 'text-green-500';
			break;
		case 'error':
			IconComponent = XCircleIcon;
			iconColorClass = 'text-red-500';
			break;
		case 'warning':
			IconComponent = ExclamationTriangleIcon;
			iconColorClass = 'text-yellow-500';
			break;
		case 'info':
		default:
			IconComponent = InformationCircleIcon;
			iconColorClass = 'text-blue-500';
			break;
	}

	return (
		<div className="flex items-start p-4 rounded-md shadow-lg bg-white text-gray-800 border border-gray-200 w-full max-w-xs pointer-events-auto">
			<div className={`flex-shrink-0 mr-3 ${iconColorClass}`}>
				<IconComponent className="h-6 w-6" aria-hidden="true" />
			</div>

			<div className="flex-grow">
				<h3 className="text-base font-semibold text-gray-900">{title}</h3>
				<p className="text-sm text-gray-600">{description}</p>
			</div>

			<div className="ml-4 flex-shrink-0">
				<button
					onClick={closeToast}
					className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md transition ease-in-out duration-150"
					aria-label="Close"
				>
					<span className="sr-only">Close</span>
					<svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Notification;