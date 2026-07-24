'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
    const { currentUser, isInitialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && !currentUser) router.replace("/auth");
    }, [isInitialized, currentUser, router]);

    if (!isInitialized || !currentUser) return null;
    return children;
}
