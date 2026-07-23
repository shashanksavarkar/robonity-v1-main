'use client';

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../components/AuthContext";

function OAuthSuccessInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setCurrentUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get("token");
        const name = searchParams.get("name");
        const avatar = searchParams.get("avatar");

        if (token) {
            const user = { token, name, avatar };
            localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(user);
            router.push("/roboshare");
        }
    }, [searchParams, router, setCurrentUser]);

    return null;
}

export default function OAuthSuccess() {
    return (
        <Suspense fallback={null}>
            <OAuthSuccessInner />
        </Suspense>
    );
}
