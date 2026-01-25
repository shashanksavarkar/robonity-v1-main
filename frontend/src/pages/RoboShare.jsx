import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../components/AuthContext";

export default function RoboShare() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 pt-[90px] relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

        <motion.div
          className="w-full max-w-md bg-slate-900/60 border border-cyan-500/10 backdrop-blur-xl p-10 rounded-[20px] shadow-2xl text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1 className="text-3xl font-black mb-4 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
            RoboShare Access
          </h1>
          <p className="text-slate-400 mb-8">
            You must be logged in to access the RoboShare resources repository.
          </p>
          <Link
            to="/auth"
            className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] transition-all transform hover:-translate-y-1"
          >
            Login / Signup
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 pt-[100px] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/10 pb-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              RoboShare
            </h1>
            <p className="text-slate-400">
              Welcome back, <span className="text-white font-semibold">{currentUser.name}</span>
            </p>
          </div>

          <button className="px-6 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all font-medium">
            + Upload New Resource
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for dashboard content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/40 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">My Uploads</h3>
            <p className="text-slate-400 text-sm">You haven't uploaded any files yet.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/40 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Recent Downloads</h3>
            <p className="text-slate-400 text-sm">No recent download history.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/40 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Activity</h3>
            <p className="text-slate-400 text-sm">Explore shared resources from the community.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
