import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function RoboShare() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", rollNo: "", mobile: "", password: "", otp: "" });
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegisterInitiate = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith("@gsv.ac.in")) return setError("Use @gsv.ac.in only");
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/roboshare/send-otp`, formData);
      setStep(2);
    } catch {
      setStep(2);
      setError("Note: Check backend terminal for OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/roboshare/verify-otp`, { ...formData, otp: formData.otp.toString() });
      if (res.status === 200) setIsLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl p-12 rounded-[24px] text-center max-w-2xl w-full shadow-2xl">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
          >
            Coming Soon
          </motion.h1>
          <p className="text-slate-400 text-lg">We are building something amazing for the Robonity community.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 pt-[90px] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <motion.div
        className="w-full max-w-[650px] bg-slate-900/60 border border-cyan-500/10 backdrop-blur-xl p-10 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tight">
            {step === 1 ? "RoboShare Access" : "Verification"}
          </h1>
          <p className="text-slate-400 text-sm">
            {step === 1 ? "Enter your details to proceed" : "Enter the OTP sent to your mobile"}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleRegisterInitiate : handleVerify} className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-5">
                <div className="relative w-full">
                  <input name="email" type="email" placeholder=" " onChange={handleChange} required className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent" />
                  <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-500 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1">Email Address</label>
                </div>
                <div className="relative w-full">
                  <input name="rollNo" type="text" placeholder=" " onChange={handleChange} required className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent" />
                  <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-500 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1">Roll Number</label>
                </div>
                <div className="relative w-full">
                  <input name="mobile" type="tel" placeholder=" " onChange={handleChange} required className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent" />
                  <label className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-cyan-500 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1">Mobile Number</label>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col gap-5">
                <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 mb-2">
                  <p className="text-blue-300 text-center text-sm m-0">OTP sent to {formData.mobile}</p>
                </div>
                <div className="relative w-full">
                  <input name="otp" type="text" placeholder=" " maxLength={6} onChange={handleChange} required className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent text-center tracking-[0.5em] text-xl font-bold" />
                  <label className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-cyan-500 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:bg-slate-900 peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-cyan-500">Verification Code</label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-cyan-500 to-blue-600 border-none rounded-xl text-white font-bold uppercase tracking-widest mt-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Processing..." : step === 1 ? "Send OTP" : "Verify & Access"}
          </motion.button>
        </form>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-center text-sm">
            {error}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
