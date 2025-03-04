"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/api/auth";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '@/redux/slices/usersSlice';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const verifyUser = async () => {
			try {
				const authData = await checkAuth();

				if (authData?.isAuthenticated) {
					setIsAuthenticated(true);
					if (authData.userId) {
						dispatch(setCurrentUser(authData.userId));
					}
				} else {
					router.push("/login");
				}
			} catch (error) {
				console.error("Error checking authentication:", error);
				router.push("/login");
			}
		};

		verifyUser();
	}, [router]);
	if (isAuthenticated === null) return <p>Loading...</p>;

	return <>{children}</>;
}
