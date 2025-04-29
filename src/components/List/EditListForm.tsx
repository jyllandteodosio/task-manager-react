import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateListMutation } from "@/redux/api/apiSlice";
import { setCurrentList } from "@/redux/slices/currentListSlice";
import { RootState } from "@/redux/store";
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

interface NewListData {
	title: string;
	description?: string;
}

interface EditListFormProps {
	closeModal: () => void;
}

const EditListForm: React.FC<EditListFormProps> = ({ closeModal }) => {
	const dispatch = useDispatch();
	const currentList = useSelector((state: RootState) => state.currentList.currentList);
	const [formData, setFormData] = useState<NewListData>({
		title: currentList?.title || "",
		description: currentList?.description || "",
	});
	const [updateList, { isLoading, isError, error }] = useUpdateListMutation();

	const handleFieldChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log("EditListForm submitted");
		e.preventDefault();

		if (!formData.title.trim()) {
			alert("List title cannot be empty.");
			return;
		}

		if (!currentList?._id) {
			alert("No list is currently selected.");
			return;
		}

		const payload = {
			id: currentList._id,
			title: formData.title.trim(),
			description: formData.description?.trim() || undefined,
		};

		try {
			const data = await updateList(payload).unwrap();

			dispatch(setCurrentList(data.result));

			setFormData({ title: "", description: "" });
			closeModal();
		} catch (err) {
			console.error("Failed to edit list:", err);
		}
	};

	return (
		<>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">Edit List</h2>

			{isError && <ErrorMessageAlert error={error} />}

			<form
				className="mt-4 space-y-4"
				id="edit-list-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="list-title" className="block text-sm font-medium leading-6 text-gray-900">
						Title <span className="text-red-600">*</span>
					</label>
					<div className="mt-1">
						<input
							id="list-title"
							name="title"
							type="text"
							value={formData.title}
							onChange={handleFieldChange}
							required
							autoComplete="off"
							className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div>
					<label htmlFor="list-description" className="block text-sm font-medium leading-6 text-gray-900">
						Description (Optional)
					</label>
					<div className="mt-1">
						<textarea
							id="list-description"
							name="description"
							rows={3}
							value={formData.description}
							onChange={handleFieldChange}
							autoComplete="off"
							className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

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
						disabled={isLoading || !formData.title.trim()}
						className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Updating List..." : "Edit List"}
					</button>
				</div>
			</form>
		</>
	);
};

export default EditListForm;
