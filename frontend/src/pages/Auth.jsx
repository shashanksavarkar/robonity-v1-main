import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../api/authApi";
import { registerUser } from "../api/registrationApi";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Auth() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
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
      setTimeout(() => navigate("/roboshare"), 1200);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Authentication failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
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
            className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tighter text-center w-fit mx-auto relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {mode === "login" ? "Log In" : "Create Account"}
          </motion.h1>
        </AnimatePresence>

        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleSocial("google")}
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2 font-medium"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleSocial("github")}
            className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2 font-medium"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="relative text-center my-6 text-slate-500 text-sm">
          <span className="bg-transparent px-2 z-10 relative">OR</span>
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-0"></div>
        </div>

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
                <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-500 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1">Display Name</label>
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
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-500 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1">Email Address</label>
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
            <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-500 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1">Password</label>
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
