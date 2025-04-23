'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TaskaruIcon from "@/assets/icons/taskaru_icon.png";
import { User } from "@/types/users";
import { useAddUserMutation } from "@/redux/api/apiSlice";
import ErrorMessageAlert from "@/components/Alerts/ErrorMessageAlert";


const RegisterForm = () => {
	const router = useRouter();
	const [registerData, setRegisterData] = useState<User>({
		id: "",
		username: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const [addUser, { isLoading, isError, error }] = useAddUserMutation();

	const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setRegisterData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const result = await addUser(registerData).unwrap();
			console.log("User registered successfully:", result);
			router.push("/login");
		} catch (err) {
			console.error("Sign Up failed:", err);
		}
	};

	return (
		<div id="register-wrapper" className="mt-10 w-lg sm:mx-auto sm:w-full sm:max-w-sm">
			<div className="flex-full items-center text-center justify-center mb-4">
				<Image src={TaskaruIcon} alt="Taskaru" priority={true} className="w-24 h-24 m-auto" />
				<h2 className="text-2xl font-semibold py-2">Sign up to TASKARU</h2>
			</div>

			{isError && <ErrorMessageAlert error={error} />}

			<form
				className="space-y-6 mt-4"
				id="register-form"
				onSubmit={handleSubmit}
			>
				<div>
					<label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">Username</label>
					<div className="mt-2">
						<input
							id="register-username"
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
					</div>
					<div className="mt-2">
						<input
							id="register-password"
							name="password"
							type="password"
							onChange={handleFieldChange}
							required
							autoComplete="password" className="block w-full rounded-md px-3 py-1.5 text-base border-[2px] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
					</div>
				</div>

				<div>
					<label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">First Name</label>
					<div className="mt-2">
						<input
							id="register-firstName"
							name="firstName"
							type="text"
							onChange={handleFieldChange}
							required
							autoComplete="username" className="block w-full rounded-md px-3 py-1.5 text-base border-[2px] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
					</div>
				</div>

				<div>
					<label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">Last Name</label>
					<div className="mt-2">
						<input
							id="register-lastName"
							name="lastName"
							type="text"
							onChange={handleFieldChange}
							required
							autoComplete="username" className="block w-full rounded-md px-3 py-1.5 text-base border-[2px] text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={isLoading}
						className="block w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
					>
						{isLoading ? "Signing Up..." : "Sign Up"}
					</button>
				</div>
			</form>

			<p className="mt-10 text-center text-sm/6 text-gray-500">
				Already a member?{" "}
				<Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign In</Link>
			</p>
		</div>
	);
};

export default RegisterForm;