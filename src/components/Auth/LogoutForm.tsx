import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

interface LogoutFormProps {
	closeModal: () => void;
}

const LogoutForm: React.FC<LogoutFormProps> = ({ closeModal }) => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log("LogoutForm submitted");
		e.preventDefault();
		setIsLoading(true);

		try {
			await dispatch(logout()).unwrap();
			closeModal();
			router.push("/login");
		} catch (err) {
			console.error("Failed to sign out:", err);
			setError("Failed to sign out. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<h2 className="mb-4 text-xl font-semibold text-gray-800">Sign Out</h2>

			{error && <ErrorMessageAlert error={error} />}

			<form
				className="mt-4 space-y-4"
				id="delete-task-form"
				onSubmit={handleSubmit}
			>
				<p className="py-1.5">Are you sure you want to Sign Out?</p>

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
						className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "Signing Out..." : "Sign Out"}
					</button>
				</div>
			</form>
		</>
	);
};

export default LogoutForm;
