'use client';

import React, { useEffect, useState } from "react";
import { Send, X } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function CreateThread({ onCreateThread, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) return setError("Title cannot be empty.");
    if (!content.trim()) return setError("Write something to start the discussion.");
    if (!isAuthenticated || !currentUser) return setError("You must be logged in to post.");

    setSubmitting(true);
    try {
      await onCreateThread({ title: title.trim(), content: content.trim() });
      onClose();
    } catch {
      setError("Failed to create thread. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-2000 bg-black/80 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[560px] bg-slate-900 border border-white/10 rounded-[20px] p-8 max-h-[calc(100vh-40px)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-thread-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 id="create-thread-title" className="text-2xl font-black text-white mb-6">Start a New Discussion</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder=" "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
              required
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] placeholder-transparent"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${title ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>
              What do you want to discuss?
            </label>
          </div>

          <div className="relative w-full">
            <textarea
              placeholder=" "
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={submitting}
              required
              rows={4}
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] placeholder-transparent resize-none"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${content ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-4"}`}>
              Share the details...
            </label>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-sm uppercase tracking-wide shadow-[0_10px_20px_rgba(0,198,255,0.3)] hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {submitting ? "Posting..." : <>Post Thread <Send size={15} /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
