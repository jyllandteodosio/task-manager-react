import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteListMutation } from "@/redux/api/apiSlice";
import { clearCurrentList } from "@/redux/slices/currentListSlice";
import { RootState } from "@/redux/store";
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

interface DeleteListFormProps {
	closeModal: () => void;
}

const DeleteListForm: React.FC<DeleteListFormProps> = ({ closeModal }) => {
	const dispatch = useDispatch();
	const currentList = useSelector((state: RootState) => state.currentList.currentList);

	const [deleteList, { isLoading, isError, error }] = useDeleteListMutation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log("DeleteListForm submitted");
		e.preventDefault();

		if (!currentList?._id) {
			alert("No list is currently selected.");
			return;
		}

		const payload = currentList._id;

		try {
			await deleteList(payload).unwrap();

			dispatch(clearCurrentList());

			closeModal();

		} catch (err) {
			console.error("Failed to delete list:", err);
		}
	};

	return (
		<>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">Delete List</h2>

			{isError && <ErrorMessageAlert error={error} />}

			<form
				className="mt-4 space-y-4"
				id="delete-list-form"
				onSubmit={handleSubmit}
			>
				<p className="py-1.5">Are you sure you want to delete this list?</p>

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
						{isLoading ? "Deleting List..." : "Delete List"}
					</button>
				</div>
			</form>
		</>
	);
};

export default DeleteListForm;
