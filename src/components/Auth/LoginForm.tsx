'use client'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TaskaruIcon from "@/assets/icons/taskaru_icon.png";
import { UserCredentials } from "@/types/userCredentials";
import { login } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';
import ErrorMessageAlert from "../Alerts/ErrorMessageAlert";

const LoginForm = () => {
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const [loginData, setLoginData] = useState<UserCredentials>({
		username: "",
		password: ""
	});
	const [error, setError] = useState<string | null>(null);

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const resultAction = await dispatch(login(loginData)).unwrap();
			if (resultAction) {
				router.push("/dashboard");
			}
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	return (
		<div id="login-wrapper" className="mt-10 w-lg sm:mx-auto sm:w-full sm:max-w-sm">
			<div className="flex-full items-center text-center justify-center mb-8">
				<Image src={TaskaruIcon} alt="Taskaru" priority={true} className="w-24 h-24 m-auto" />
				<h2 className="text-2xl font-semibold py-2">Sign in to TASKARU</h2>
				<p className="text-sm/6 text-zinc-400">
					Don't have an account?{" "}
					<Link className="font-semibold text-indigo-600 hover:text-indigo-500" href="/register">Sign Up</Link>
				</p>
			</div>

			{error && <ErrorMessageAlert error={error} />}

			<form
				className="space-y-6"
				id="login-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
					<div className="mt-2">
						<input
							id="login-username"
							name="username"
							type="text"
							onChange={handleFieldChange}
							required
							autoComplete="username" className="block w-full rounded-md px-3 py-1.5 text-base border-[2px] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
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
							required
							autoComplete="password" className="block w-full rounded-md px-3 py-1.5 text-base border-[2px] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
					</div>
				</div>

				<div>
					<button type="submit" className="block w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700">Sign in</button>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;