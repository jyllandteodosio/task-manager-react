"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { checkAuth } from "@/redux/slices/authSlice";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const resultAction = await dispatch(checkAuth()).unwrap();
                if (resultAction.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                router.push("/login");
            }
        };

        verifyUser();
    }, [dispatch, router]);

    if (isAuthenticated === null) return <p>Loading...</p>;

    return <>{children}</>;
}
