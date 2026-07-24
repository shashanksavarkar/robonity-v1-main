'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterClient() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const fieldInput = "w-full py-4 px-5 bg-slate-800/50 border border-white/10 rounded-xl text-white text-base transition-all outline-none box-border focus:bg-slate-800/80 focus:border-[#00c6ff] focus:shadow-[0_0_15px_rgba(0,198,255,0.2)]";
    const floatingLabel = (hasValue) =>
        `absolute left-5 text-slate-500 text-[0.95rem] pointer-events-none transition-all bg-transparent px-1 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#00c6ff] peer-focus:bg-slate-900 peer-focus:font-semibold peer-focus:tracking-wide ${hasValue ? "top-0 text-xs text-[#00c6ff] bg-slate-900 font-semibold tracking-wide" : "top-1/2 -translate-y-1/2"
        }`;

    return (
        <div className="relative min-h-screen pt-[90px] px-5 pb-20 flex justify-center items-start overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(0,198,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,198,255,0.03)_1px,transparent_1px)] before:bg-[size:50px_50px] before:pointer-events-none before:z-0">
            <motion.div
                className="w-full max-w-[550px] py-10 px-6 sm:px-[50px] rounded-[20px] bg-slate-900/60 border border-cyan-400/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-[2] transition-[border-color,box-shadow] duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(0,198,255,0.15)]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-[2.2rem] sm:text-5xl md:text-[3.5rem] font-black mb-5 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-[-2px] text-center block mx-auto w-fit"
                    variants={itemVariants}
                >
                    NEWSLETTER
                </motion.h1>
                <motion.p className="text-center mx-auto mb-10 text-base leading-relaxed text-slate-400 max-w-[90%]" variants={itemVariants}>
                    Sign up for the Robonity newsletter to get the latest news, project highlights, and tutorials sent straight to your inbox.
                </motion.p>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <motion.div className="relative w-full" variants={itemVariants}>
                        <input
                            type="text"
                            required
                            placeholder=" "
                            disabled={submitted}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`peer ${fieldInput}`}
                        />
                        <label className={floatingLabel(!!name)}>Your Name</label>
                    </motion.div>
                    <motion.div className="relative w-full" variants={itemVariants}>
                        <input
                            type="email"
                            required
                            placeholder=" "
                            disabled={submitted}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`peer ${fieldInput}`}
                        />
                        <label className={floatingLabel(!!email)}>Your Email Address</label>
                    </motion.div>
                    <motion.button
                        type="submit"
                        disabled={submitted}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2.5 py-[18px] bg-gradient-to-br from-[#00c6ff] to-[#0072ff] border-none rounded-xl text-white text-[1.1rem] font-bold cursor-pointer uppercase tracking-wide transition-all duration-300 shadow-[0_10px_20px_rgba(0,198,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0"
                    >
                        {submitted ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                Subscribed <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                            </span>
                        ) : 'Subscribe'}
                    </motion.button>
                </form>
                {submitted && (
                    <motion.div
                        className="mt-[25px] p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-semibold text-base"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            <span>You&apos;re subscribed! Check your inbox for updates.</span>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
