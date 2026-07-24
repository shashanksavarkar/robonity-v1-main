'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center p-5 pt-[90px] relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none" />

                <motion.div
                    className="w-full max-w-[550px] bg-slate-900/60 border border-cyan-500/10 backdrop-blur-xl p-10 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 text-center transition-colors hover:border-cyan-500/30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-6">
                        <Lock size={24} />
                    </div>

                    <h1 className="text-4xl md:text-[3.5rem] font-black mb-5 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tight">
                        Forum Access
                    </h1>
                    <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-[90%] mx-auto">
                        Sign in to join the conversation — create threads, reply to fellow builders, and take part in the Robonity community forum.
                    </p>

                    <Link
                        href="/auth"
                        className="block w-full p-[18px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white font-bold uppercase tracking-widest text-center shadow-[0_10px_20px_rgba(0,198,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.6)]"
                    >
                        Log In
                    </Link>

                    <p className="text-center mt-6 text-slate-400 text-sm">
                        New here? <Link href="/auth?mode=signup" className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline hover:underline-offset-4 transition-colors">Create an account</Link>
                    </p>
                </motion.div>
            </div>
        );
    }

    return children;
}
