'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/authActions";
import { UserCredentials } from "@/types/userCredentials";
import { useRouter } from "next/navigation";
import { RootState } from "@/types";

const LoginForm = () => {
	const [loginData, setLoginData] = useState<UserCredentials>({
		username: "",
		password: ""
	});
	const dispatch = useDispatch();
	const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser(loginData, () => router.push("/dashboard")));
	};

	return (
		<div id="login-wrapper" className="mt-10 w-lg sm:mx-auto sm:w-full sm:max-w-sm">
			<form
				className="space-y-6"
				id="login-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="username" className="block text-sm/6 font-medium text-white">Username</label>
					<div className="mt-2">
						<input
							id="login-username"
							name="username"
							type="text"
							onChange={handleFieldChange}
							required className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
						<div className="text-sm">
							{/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
						</div>
					</div>
					<div className="mt-2">
						<input
							id="login-password"
							name="password"
							type="password"
							onChange={handleFieldChange}
							required className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
					</div>
				</div>

				<div>
					<button type="submit" className="flex w-full justify-center rounded-sm bg-indigo-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
				</div>
			</form>

			<p className="mt-10 text-center text-sm/6 text-gray-500">
				Not a member?{" "}
				<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Register</a>
			</p>
		</div>
	)
}

export default LoginForm