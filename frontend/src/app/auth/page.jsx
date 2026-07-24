'use client';

import React, { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../../api/authApi";
import { useAuth } from "../../components/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import toast from 'react-hot-toast';

function AuthPage() {
  const { setCurrentUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState(() => (searchParams.get("mode") === "signup" ? "signup" : "login"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = mode === "login"
        ? await loginUser({ email, password })
        : await registerUser({ name: displayName, email, password });

      const userData = response.data;

      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);

      toast.success("Welcome back! Redirecting...");
      setTimeout(() => router.push("/roboshare"), 1200);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Authentication failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 pt-[90px] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <motion.div
        className="w-full max-w-[550px] bg-slate-900/60 border border-cyan-500/10 backdrop-blur-xl p-10 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={mode}
            className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tight text-center w-fit mx-auto relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </motion.h1>
        </AnimatePresence>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-5">
          <AnimatePresence>
            {mode === "signup" && (
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder=" "
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
                />
                <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${displayName ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>Display Name</label>
              </div>
            )}
          </AnimatePresence>

          <div className="relative w-full">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${email ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>Email Address</label>
          </div>

          <div className="relative w-full">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${password ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>Password</label>
          </div>

          <motion.button
            type="submit"
            className="w-full p-4 bg-gradient-to-br from-cyan-500 to-blue-600 border-none rounded-xl text-white font-bold uppercase tracking-widest mt-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
          </motion.button>
        </form>

        <p className="text-center mt-6 text-slate-400 text-sm">
          {mode === "login" ? (
            <>New here? <span onClick={() => setMode("signup")} className="text-cyan-400 cursor-pointer font-semibold ml-1 hover:text-cyan-300 hover:underline hover:underline-offset-4 transition-colors">Create an account</span></>
          ) : (
            <>Already have an account? <span onClick={() => setMode("login")} className="text-cyan-400 cursor-pointer font-semibold ml-1 hover:text-cyan-300 hover:underline hover:underline-offset-4 transition-colors">Log in</span></>
          )}
        </p>
      </motion.div>
    </div>
  );
}

export default function Auth() {
  return (
    <Suspense fallback={null}>
      <AuthPage />
    </Suspense>
  );
}
