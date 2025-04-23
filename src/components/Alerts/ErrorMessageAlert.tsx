import React from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface ErrorMessageProps {
	error: FetchBaseQueryError | SerializedError | string | undefined;
}

const ErrorMessageAlert: React.FC<ErrorMessageProps> = ({ error }) => {
	if (!error) return null;

	let errorMessage = "Something went wrong";

	if (typeof error === "string") {
		errorMessage = error;
	} else if ("data" in error) {
		const serverError = error as FetchBaseQueryError;
		errorMessage = serverError.status.toString() || errorMessage;
	} else if ("message" in error) {
		const clientError = error as SerializedError;
		errorMessage = clientError.message || errorMessage;
	}

	return (
		<div id="error-message" className="mt-4 flex items-center justify-start p-4 bg-red-100 border-l-4 border-red-500">
			<p className="text-sm text-red-700">{errorMessage}</p>
		</div>
	);
}

export default ErrorMessageAlert