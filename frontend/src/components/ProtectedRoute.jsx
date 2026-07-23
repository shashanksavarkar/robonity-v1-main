'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) router.replace("/auth");
    }, [currentUser, router]);

    if (!currentUser) return null;
    return children;
}
