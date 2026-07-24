'use client';

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Code2, CircuitBoard, Boxes, GraduationCap, MoreHorizontal,
  Plus, ExternalLink, Loader2, Inbox, Search, X, LogOut, User as UserIcon, Share2,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  sendOTP as sendOTPRequest,
  verifyOTP as verifyOTPRequest,
  getResources,
  createResource,
  getRoboshareSession,
  setRoboshareSession,
  clearRoboshareSession,
} from "../../api/roboshareApi";

const CATEGORIES = [
  { key: "Notes", icon: FileText },
  { key: "Code", icon: Code2 },
  { key: "Datasheet", icon: CircuitBoard },
  { key: "Project", icon: Boxes },
  { key: "Tutorial", icon: GraduationCap },
  { key: "Other", icon: MoreHorizontal },
];
const CATEGORY_ICON = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.icon]));

// Per-category identity for the document-tile cards — full literal class
// strings (not interpolated) so Tailwind's scanner picks them up.
const CATEGORY_STYLES = {
  Notes: { icon: FileText, accent: "bg-blue-500", chip: "bg-blue-500/10 text-blue-400 border-blue-500/30", iconWrap: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  Code: { icon: Code2, accent: "bg-violet-500", chip: "bg-violet-500/10 text-violet-400 border-violet-500/30", iconWrap: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  Datasheet: { icon: CircuitBoard, accent: "bg-amber-500", chip: "bg-amber-500/10 text-amber-400 border-amber-500/30", iconWrap: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  Project: { icon: Boxes, accent: "bg-cyan-500", chip: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30", iconWrap: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  Tutorial: { icon: GraduationCap, accent: "bg-emerald-500", chip: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", iconWrap: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  Other: { icon: MoreHorizontal, accent: "bg-slate-500", chip: "bg-slate-500/10 text-slate-400 border-slate-500/30", iconWrap: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
};

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
};

function UploadResourceModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ title: "", description: "", url: "", category: "Notes" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const { data } = await createResource(form);
      onCreated(data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to share resource. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-2000 bg-black/80 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-[520px] bg-slate-900 border border-white/10 rounded-[20px] p-8 max-h-[calc(100vh-40px)] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 id="upload-modal-title" className="text-2xl font-black text-white mb-1">Share a Resource</h2>
        <p className="text-slate-400 text-sm mb-6">Post a link for the community — notes, code, datasheets, tutorials, anything useful.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative w-full">
            <input
              name="title"
              type="text"
              placeholder=" "
              value={form.title}
              onChange={handleChange}
              required
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${form.title ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>Title</label>
          </div>

          <div className="relative w-full">
            <input
              name="url"
              type="url"
              placeholder=" "
              value={form.url}
              onChange={handleChange}
              required
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${form.url ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>Link (Drive, GitHub, docs...)</label>
          </div>

          <div className="relative w-full">
            <textarea
              name="description"
              placeholder=" "
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent resize-none"
            />
            <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${form.description ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-4"}`}>Description</label>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setForm({ ...form, category: key })}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${form.category === key ? "bg-cyan-500 border-cyan-500 text-slate-950" : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
              >
                <Icon size={14} /> {key}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">{error}</div>
          )}

          <motion.button
            type="submit"
            disabled={submitting}
            className="w-full p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white font-bold uppercase tracking-widest mt-2 shadow-[0_10px_20px_rgba(0,198,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            whileHover={{ scale: submitting ? 1 : 1.02 }}
            whileTap={{ scale: submitting ? 1 : 0.98 }}
          >
            {submitting ? "Sharing..." : "Share Resource"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function ResourceCard({ resource }) {
  const style = CATEGORY_STYLES[resource.category] || CATEGORY_STYLES.Other;
  const Icon = style.icon;
  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col gap-3 pl-6 pr-5 py-5 bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden no-underline transition-colors hover:border-white/20"
    >
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${style.accent}`} aria-hidden="true" />

      <div className="flex items-start justify-between gap-3">
        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${style.iconWrap}`}>
          <Icon size={18} />
        </div>
        <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors shrink-0 mt-1" />
      </div>

      <div>
        <span className={`inline-block mb-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wide ${style.chip}`}>
          {resource.category}
        </span>
        <h3 className="text-white font-bold text-base leading-snug">{resource.title}</h3>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{resource.description}</p>

      <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-3 border-t border-white/[0.06]">
        <span>{resource.uploadedBy?.rollNo}</span>
        <span>{timeAgo(resource.createdAt)}</span>
      </div>
    </motion.a>
  );
}

function Dashboard({ session, onLogout }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [tab, setTab] = useState("all"); // 'all' | 'mine'
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError("");
      try {
        const { data } = await getResources();
        if (!cancelled) setResources(data);
      } catch (err) {
        if (!cancelled) setLoadError(err.response?.data?.message || "Failed to load resources.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const myResources = useMemo(
    () => resources.filter((r) => r.uploadedBy?.email === session.email),
    [resources, session.email]
  );

  const visible = useMemo(() => {
    const source = tab === "mine" ? myResources : resources;
    const q = search.trim().toLowerCase();
    return source.filter((r) => {
      const matchesCategory = categoryFilter === "All" || r.category === categoryFilter;
      const matchesSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [tab, resources, myResources, search, categoryFilter]);

  return (
    <div className="min-h-screen p-5 pt-[100px] pb-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Left: persistent branding / CTA / stats panel — deliberately distinct
            from the top-hero-then-grid layout used on every other page. */}
        <motion.aside
          className="w-full lg:w-[300px] lg:shrink-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:sticky lg:top-[110px] flex flex-col gap-5">
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-[20px] p-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <Share2 size={11} /> Community Repository
              </span>
              <h1 className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                RoboShare
              </h1>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Notes, code, datasheets, and project files — shared by GSV students, for GSV students.
              </p>

              <motion.button
                type="button"
                onClick={() => setShowUpload(true)}
                className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white font-bold text-sm shadow-[0_10px_20px_rgba(0,198,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.6)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} /> Share a Resource
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-extrabold text-white">{resources.length}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-1">Total</div>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5 text-center">
                <div className="text-2xl font-extrabold text-white">{myResources.length}</div>
                <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-1">Mine</div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-1">
              <span className="inline-flex items-center gap-1.5 text-slate-400 text-xs">
                <UserIcon size={13} /> <span className="text-slate-200 font-semibold">{session.rollNo}</span>
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-red-400 transition-colors text-xs font-medium"
              >
                <LogOut size={13} /> Logout
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Right: search, filters, resource grid */}
        <motion.div
          className="flex-1 min-w-0 flex flex-col gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl">
            <Search size={16} className="text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
                <X size={14} className="text-slate-500 hover:text-white" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setTab("all")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === "all" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
              >
                Browse Repository
              </button>
              <button
                type="button"
                onClick={() => setTab("mine")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === "mine" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
              >
                My Uploads
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategoryFilter("All")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${categoryFilter === "All" ? "bg-cyan-500 border-cyan-500 text-slate-950" : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
              >
                All
              </button>
              {CATEGORIES.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategoryFilter(key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${categoryFilter === key ? "bg-cyan-500 border-cyan-500 text-slate-950" : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"}`}
                >
                  <Icon size={12} /> {key}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-cyan-400" size={32} />
            </div>
          ) : loadError ? (
            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-center">{loadError}</div>
          ) : visible.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-slate-500 text-center">
              <Inbox size={32} strokeWidth={1.5} />
              <p>{tab === "mine" ? "You haven't shared anything yet." : "No resources match your search."}</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {visible.map((r) => <ResourceCard key={r._id} resource={r} />)}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showUpload && (
          <UploadResourceModal
            onClose={() => setShowUpload(false)}
            onCreated={(newResource) => setResources((prev) => [newResource, ...prev])}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RoboShare() {
  const [session, setSession] = useState(undefined); // undefined = not checked yet, null = no session
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    rollNo: "",
    emailOtp: "",
  });

  useEffect(() => {
    setSession(getRoboshareSession());
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.email.toLowerCase().endsWith("@gsv.ac.in")) {
      return setError("Access Denied: Please use your @gsv.ac.in email address.");
    }

    setLoading(true);
    setError("");

    try {
      await sendOTPRequest({
        email: formData.email,
        rollNo: formData.rollNo
      });
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await verifyOTPRequest({
        email: formData.email,
        emailOtp: formData.emailOtp.trim(),
      });

      const newSession = {
        token: res.data.token,
        rollNo: res.data.user.rollNo,
        email: res.data.user.email,
      };
      setRoboshareSession(newSession);
      setSession(newSession);
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Check your OTPs.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearRoboshareSession();
    setSession(null);
    setStep(1);
    setFormData({ email: "", rollNo: "", emailOtp: "" });
  };

  if (session === undefined) return null; // avoid a login-form flash before localStorage is checked

  if (session) {
    return <Dashboard session={session} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-5 pt-[90px] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <motion.div
        className="w-full max-w-[550px] bg-slate-900/60 border border-cyan-500/10 backdrop-blur-xl p-10 rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 transition-colors hover:border-cyan-500/30"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-[3.5rem] font-black mb-5 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tight">
            {step === 1 ? "RoboShare" : "OTP Verification"}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[90%] mx-auto">
            {step === 1
              ? "Restricted access: sign in with your @gsv.ac.in account to browse and share resources."
              : `Enter the code sent to ${formData.email}.`
            }
          </p>
        </div>

        <form onSubmit={step === 1 ? handleSendOTP : handleVerify} className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex flex-col gap-5">
                <div className="relative w-full">
                  <input
                    name="email"
                    type="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
                  />
                  <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${formData.email ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>University Email</label>
                </div>
                <div className="relative w-full">
                  <input
                    name="rollNo"
                    type="text"
                    placeholder=" "
                    value={formData.rollNo}
                    onChange={handleChange}
                    required
                    className="peer w-full p-4 bg-slate-800/50 border border-white/10 rounded-xl text-white outline-none focus:bg-slate-800/80 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,198,255,0.2)] transition-all placeholder-transparent"
                  />
                  <label className={`absolute left-5 text-slate-400 text-sm pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-cyan-500 peer-focus:bg-slate-900 peer-focus:px-1 ${formData.rollNo ? "top-0 text-xs text-cyan-500 bg-slate-900 px-1" : "top-1/2 -translate-y-1/2"}`}>Roll Number</label>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-5">
                <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20 text-center">
                  <p className="text-cyan-300 text-sm">Security Code Sent</p>
                </div>

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
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full p-[18px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white font-bold uppercase tracking-widest mt-2 shadow-[0_10px_20px_rgba(0,198,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "Verifying..." : step === 1 ? "Verify Identity" : "Continue to RoboShare"}
          </motion.button>
        </form>

        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-center text-sm">
            {error}
          </motion.div>
        )}

        {step === 2 && (
          <Button variant="ghost" onClick={() => setStep(1)} className="w-full text-slate-500 hover:text-white">
            ← Back to details
          </Button>
        )}
      </motion.div>
    </div>
  );
}
