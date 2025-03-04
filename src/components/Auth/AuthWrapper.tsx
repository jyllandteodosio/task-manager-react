"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/api/auth";

const AuthWrapper = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function ProtectedComponent(props: P) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      const verifyUser = async () => {
        try {
          const authData = await checkAuth();

          if (authData?.isAuthenticated) {
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
    }, [router]);

    if (isAuthenticated === null) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthWrapper;
