'use client'

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import TaskaruIcon from "@/assets/icons/taskaru_icon.png";
import { UserType } from "@/types/users";
import { useAddUserMutation } from "@/redux/api/apiSlice";
import ErrorMessageAlert from "@/components/Alerts/ErrorMessageAlert";
// import { useGoogleReCaptcha } from '@google-recaptcha/react';


type RegisterFormData = Omit<UserType, '_id' | 'password'> & { password?: string };

const RegisterForm = () => {
    const router = useRouter();
    const [registerData, setRegisterData] = useState<RegisterFormData>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [addUser, { isLoading, isError, error }] = useAddUserMutation();

    // const { executeV3 } = useGoogleReCaptcha();


    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!registerData.username || !registerData.password || !registerData.firstName || !registerData.lastName) {
            alert("Please fill in all required fields.");
            return;
        }

        // if (!executeV3) {
        //     console.log('Recaptcha not yet available');
        //     return;
        // }

        try {
            // const token = await executeV3('register');
            const token = "dummy";

            const payload: Partial<UserType> & { recaptchaToken?: string } = {
                username: registerData.username,
                password: registerData.password,
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                recaptchaToken: token,
            };

            console.log("Submitting registration data:", payload);

            const result = await addUser(payload).unwrap();
            console.log("User registered successfully:", result);
            router.push("/login");
        } catch (err) {
            console.error("Sign Up failed:", err);
        }
        // }, [executeV3, registerData, addUser, router]);
    }, [registerData, addUser, router]);


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
                    <label htmlFor="register-username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div className="mt-1">
                        <input
                            id="register-username"
                            name="username"
                            type="text"
                            value={registerData.username}
                            onChange={handleFieldChange}
                            required
                            autoComplete="username"
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="register-password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-1">
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            value={registerData.password}
                            onChange={handleFieldChange}
                            required
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="register-firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div className="mt-1">
                        <input
                            id="register-firstName"
                            name="firstName"
                            type="text"
                            value={registerData.firstName}
                            onChange={handleFieldChange}
                            required
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="register-lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div className="mt-1">
                        <input
                            id="register-lastName"
                            name="lastName"
                            type="text"
                            value={registerData.lastName}
                            onChange={handleFieldChange}
                            required
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Already a member?{" "}
                <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;