import React from "react";
import { useRemoveCollaboratorMutation } from "@/redux/api/apiSlice";
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

interface UnshareWithUserFormProps {
	userId: string;
	closeModal: () => void;
	listId: string | undefined;
}

const UnshareWithUserForm: React.FC<UnshareWithUserFormProps> = ({ userId, closeModal, listId }) => {
	const [removeCollaborator, { isLoading, isError, error }] = useRemoveCollaboratorMutation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!listId) {
			alert("No list is currently selected.");
			return;
		}

		const payload = {
			listId: listId,
			collaboratorId: userId,
		};

		try {
			await removeCollaborator(payload).unwrap();
			closeModal();

		} catch (err) {
			console.error("Failed to delete task:", err);
		}
	};

	return (
		<>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">Remove User</h2>

			{isError && <ErrorMessageAlert error={error} />}

			<form
				className="mt-4 space-y-4"
				id="delete-task-form"
				onSubmit={handleSubmit}
			>
				<p className="py-1.5">Are you sure you want to remove this user?</p>

				<div className="flex justify-end space-x-3 pt-2">
					<button
						type="button"
						onClick={closeModal}
						disabled={isLoading}
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isLoading}
						className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Removing User..." : "Remove User"}
					</button>
				</div>
			</form>
		</>
	);
};

export default UnshareWithUserForm;
