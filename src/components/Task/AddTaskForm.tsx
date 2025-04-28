import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTaskUnderListMutation } from "@/redux/api/apiSlice";
import { RootState } from "@/redux/store";
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

interface NewTaskData {
	title: string;
	description?: string;
}

interface AddTaskFormProps {
	closeModal: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ closeModal }) => {
	const currentList = useSelector((state: RootState) => state.currentList.currentList);
	const [formData, setFormData] = useState<NewTaskData>({
		title: "",
		description: "",
	});

	const [addTask, { isLoading, isError, error }] = useAddTaskUnderListMutation();

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
		e.preventDefault();

		if (!formData.title.trim()) {
			alert("Task title cannot be empty.");
			return;
		}

		if (!currentList) {
			alert("No list is currently selected.");
			return;
		}

		const payload = {
			listId: currentList._id,
			newTask: {
				title: formData.title.trim(),
				description: formData.description?.trim() || undefined,
			},
		};

		console.log("Submitting task data:", payload);

		try {
			const result = await addTask(payload).unwrap();
			console.log("Task added successfully:", result);

			setFormData({ title: "", description: "" });
			closeModal();

		} catch (err) {
			console.error("Failed to add task:", err);
		}
	};

	return (
		<>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">Add New Task</h2>

			{isError && <ErrorMessageAlert error={error} />}

			<form
				className="mt-4 space-y-4"
				id="add-task-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="task-title" className="block text-sm font-medium leading-6 text-gray-900">
						Title <span className="text-red-600">*</span>
					</label>
					<div className="mt-1">
						<input
							id="task-title"
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
					<label htmlFor="task-description" className="block text-sm font-medium leading-6 text-gray-900">
						Description (Optional)
					</label>
					<div className="mt-1">
						<textarea
							id="task-description"
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
						{isLoading ? "Adding..." : "Add Task"}
					</button>
				</div>
			</form>
		</>
	);
};

export default AddTaskForm;
