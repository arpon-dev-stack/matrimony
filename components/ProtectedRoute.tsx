"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/_store/AuthContext"; // Adjust path as needed

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom loader
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const { user, accessToken, isLoading, getValidToken } = useAuth();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyAuth() {
      if (isLoading) return;

      // If missing in-memory token/user, try silent refresh
      if (!accessToken || !user) {
        const token = await getValidToken();
        if (!token && isMounted) {
          router.replace("/signin");
          return;
        }
      }

      if (isMounted) {
        setIsVerifying(false);
      }
    }

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [accessToken, user, isLoading, getValidToken, router]);

  if (isLoading || isVerifying) {
    return fallback ? <>{fallback}</> : <div>Loading...</div>;
  }

  if (!user || !accessToken) {
    return null;
  }

  return <>{children}</>;
}
