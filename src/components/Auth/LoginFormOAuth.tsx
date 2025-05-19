'use client';
import React from 'react';
import Image from "next/image";
import TaskaruIcon from "@/assets/icons/taskaru_icon.png";

const LoginFormOAuth: React.FC = () => {
	const handleGoogleSignIn = () => {
		console.log('Initiating Google Sign-In...');
		console.log("NEXT_PUBLIC_API_URL: " + process.env.NEXT_PUBLIC_API_URL);
		window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
	};

	return (
		<>
			<div id="login-wrapper" className="mt-10 w-xl sm:mx-auto sm:w-full sm:max-w-sm">
				<div className="flex-full items-center text-center justify-center mb-8">
					<Image src={TaskaruIcon} alt="Taskaru" priority={true} className="w-24 h-24 m-auto" />
					<h2 className="text-2xl font-semibold py-2">TASKARU</h2>
				</div>
				<button
					onClick={handleGoogleSignIn}
					className="flex items-center justify-center w-full rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
				>
					<svg className="w-5 h-5 mr-2" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
						<path d="M12.0003 4.75C14.0503 4.75 15.8353 5.44333 17.2493 6.85833L20.0473 4.06033C17.9373 1.95033 15.0713 0.75 12.0003 0.75C7.03133 0.75 2.79366 3.47533 0.824996 7.51699L4.51633 10.4817C5.37666 7.94501 8.46466 4.75 12.0003 4.75Z" fill="#EA4335"></path><path d="M23.25 12.0007C23.25 11.1807 23.1833 10.5327 23.0607 9.89301H12.2503V14.6403H18.8047C18.5897 15.9317 17.8997 16.9843 16.8177 17.7483L20.5083 20.7127C22.6193 18.6027 23.8243 15.537 23.25 12.0007Z" fill="#4285F4"></path><path d="M4.51501 13.5167C4.29001 12.87 4.16268 12.154 4.16268 11.5007C4.16268 10.8467 4.29001 10.1307 4.51501 9.48401L0.823681 6.51835C-0.440985 9.08035 -0.440985 13.921 0.823681 16.483L4.51501 13.5167Z" fill="#FBBC05"></path><path d="M12.0003 23.2503C15.0713 23.2503 17.6923 22.2507 19.6683 20.4117L16.8177 17.7483C15.8977 18.3937 14.7557 18.8287 12.0003 18.8287C8.46466 18.8287 5.37666 15.6337 4.51633 13.097L0.824996 16.0617C2.79366 20.0937 7.03133 23.2503 12.0003 23.2503Z" fill="#34A853"></path><path d="M12.0003 11.5007V14.6403H23.0167C22.8937 15.2767 22.805 15.9317 22.6497 16.587L16.8177 17.7483C17.8997 16.9843 18.5897 15.9317 18.8047 14.6403H12.2503V14.6403H12.0003Z" fill="#4285F4"></path>
					</svg>
					Sign in with Google
				</button>
			</div>
			<div className="max-w-md mx-auto mt-10">
				<div className="text-center">
				</div>
			</div>
		</>
	);
};

export default LoginFormOAuth;
