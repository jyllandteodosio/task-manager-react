'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/actions/userActions";
import { User } from "@/types/users";
import { useRouter } from "next/navigation";
import { RootState } from "@/types";
import Link from "next/link";

const RegisterForm = () => {
	const [registerData, setRegisterData] = useState<User>({
		id: "",
		username: "",
		password: "",
		firstName: "",
		lastName: "",
	});

	const dispatch = useDispatch();
	const router = useRouter();
	const { loading, error } = useSelector((state: RootState) => state.auth);

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setRegisterData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser(registerData, () => router.push("/login")));
	};

	return (
		<div id="register-wrapper" className="mt-10 w-lg sm:mx-auto sm:w-full sm:max-w-sm">
			<form
				className="space-y-6"
				id="register-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="username" className="block text-sm/6 font-medium text-white">Username</label>
					<div className="mt-2">
						<input
							id="register-username"
							name="username"
							type="text"
							onChange={handleFieldChange}
							required className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
					</div>
				</div>

				<div>
					<div className="flex items-center justify-between">
						<label htmlFor="password" className="block text-sm/6 font-medium text-white">Password</label>
					</div>
					<div className="mt-2">
						<input
							id="register-password"
							name="password"
							type="password"
							onChange={handleFieldChange}
							required className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
					</div>
				</div>
				
				<div>
					<label htmlFor="firstName" className="block text-sm/6 font-medium text-white">First Name</label>
					<div className="mt-2">
						<input
							id="register-firstName"
							name="firstName"
							type="text"
							onChange={handleFieldChange}
							required className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
					</div>
				</div>
				
				<div>
					<label htmlFor="lastName" className="block text-sm/6 font-medium text-white">Last Name</label>
					<div className="mt-2">
						<input
							id="register-lastName"
							name="lastName"
							type="text"
							onChange={handleFieldChange}
							required className="block w-full rounded-sm bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600" />
					</div>
				</div>

				<div>
					<button type="submit" className="flex w-full justify-center rounded-sm bg-indigo-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
				</div>
			</form>

			<p className="mt-10 text-center text-sm/6 text-gray-500">
				Already a member?{" "}
				<Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Log In</Link>
			</p>
		</div>
	)
}

export default RegisterForm