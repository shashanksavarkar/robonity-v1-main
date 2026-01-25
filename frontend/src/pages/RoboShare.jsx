import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function RoboShare() {
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    rollNo: "",
    mobile: "",
    emailOtp: "",
    mobileOtp: ""
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email.toLowerCase().endsWith("@gsv.ac.in")) {
      return setError("Access Denied: Please use your @gsv.ac.in email address.");
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${apiUrl}/api/roboshare/send-otp`, {
        email: formData.email,
        mobile: formData.mobile,
        rollNo: formData.rollNo
      });
      setStep(2);
    } catch (err) {
      console.error(err);
      // Even if it fails (e.g. Twilio trial), we might proceed for dev purposes if the backend says so
      if (err.response?.data?.message?.includes("Check terminal")) {
        setStep(2);
        setError("Dev Mode: Check backend terminal for OTPs.");
      } else {
        setError(err.response?.data?.message || "Failed to send OTPs. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${apiUrl}/api/roboshare/verify-otp`, {
        email: formData.email,
        emailOtp: formData.emailOtp.trim(),
        mobileOtp: formData.mobileOtp.trim()
      });

      if (res.status === 200) {
        setIsVerified(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Check your OTPs.");
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen p-5 pt-[100px] relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center md:text-left mb-10">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              RoboShare Dashboard
            </h1>
            <p className="text-slate-400 mt-2">Welcome, verified user <span className="text-white">{formData.rollNo}</span>.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">Upload Resource</h3>
              <p className="text-slate-400 text-sm">Share documentation or code with the community.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">My Downloads</h3>
              <p className="text-slate-400 text-sm">Access your previously downloaded files.</p>
            </div>
            <div className="bg-slate-900/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">Browse Repository</h3>
              <p className="text-slate-400 text-sm">Search the entire RoboShare database.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 pt-[90px] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <motion.div
        className="w-full max-w-[600px] bg-slate-900/80 border border-cyan-500/20 backdrop-blur-xl p-8 md:p-10 rounded-[20px] shadow-[0_0_50px_rgba(0,198,255,0.1)] relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black mb-2 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tight">
            {step === 1 ? "RoboShare Login" : "OTP Verification"}
          </h1>
          <p className="text-slate-400 text-sm">
            {step === 1
              ? "Restricted Access: @gsv.ac.in Accounts Only"
              : `Enter OTPs sent to ${formData.email} and ${formData.mobile}`
            }
          </p>
        </div>

        <form onSubmit={step === 1 ? handleSendOTP : handleVerify} className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">University Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="student@gsv.ac.in"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:border-cyan-500 outline-none transition-colors placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Roll Number</label>
                  <input
                    name="rollNo"
                    type="text"
                    placeholder="e.g. 21BEC001"
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:border-cyan-500 outline-none transition-colors placeholder:text-slate-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 ml-1">Mobile Number</label>
                  <input
                    name="mobile"
                    type="tel"
                    placeholder="+91..."
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-lg text-white focus:border-cyan-500 outline-none transition-colors placeholder:text-slate-600"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20 text-center">
                  <p className="text-cyan-300 text-sm">Security Code Sent</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Email OTP</label>
                    <input
                      name="emailOtp"
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={formData.emailOtp}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-lg text-white text-center tracking-widest font-bold focus:border-emerald-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 ml-1">Mobile OTP</label>
                    <input
                      name="mobileOtp"
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      value={formData.mobileOtp}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-slate-800/50 border border-white/10 rounded-lg text-white text-center tracking-widest font-bold focus:border-emerald-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Verifying..." : step === 1 ? "Verify Identity" : "Continue to RoboShare"}
          </button>
        </form>

        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-center text-sm">
            {error}
          </motion.div>
        )}

        {step === 2 && (
          <button onClick={() => setStep(1)} className="w-full text-center text-slate-500 text-sm mt-4 hover:text-white transition-colors">
            ← Back to details
          </button>
        )}
      </motion.div>
    </div>
  );
}
