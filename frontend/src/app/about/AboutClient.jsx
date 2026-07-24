'use client';

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function AboutClient({ aboutItems, developers, developersError }) {
    return (
        <div className="pt-[90px] px-[4%] pb-20 max-[900px]:pt-[100px] max-[900px]:px-[6%] max-[900px]:pb-[70px] max-[600px]:pt-[90px] max-[600px]:px-5 max-[600px]:pb-15">
            <div className="w-full flex justify-center mb-[30px]">
                <motion.h1
                    className="text-[3.5rem] max-[600px]:text-[2.2rem] font-black bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-[-2px] m-0 table w-fit"
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    ABOUT ROBONITY
                </motion.h1>
            </div>
            <motion.p
                className="max-w-[820px] mx-auto mb-14 text-[1.1rem] max-[600px]:text-base leading-[1.75] text-slate-400 text-left"
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                Robonity is a community-driven platform built for robotics enthusiasts, engineers, and i
                nnovators. Our goal is to create a space where ideas turn into real-world robotic solutions through collaboration and learning.
            </motion.p>
            <motion.div
                className="mt-8 grid grid-cols-4 gap-[30px] max-[900px]:grid-cols-2 max-[900px]:gap-6 max-[600px]:grid-cols-1"
                variants={containerVariants}
                initial="visible"
                animate="visible"
            >
                {aboutItems.map((item, i) => (
                    <motion.div
                        key={item._id || i}
                        className="p-[30px] max-[600px]:p-6 rounded-[20px] bg-slate-900/60 border border-[rgba(0,198,255,0.1)] backdrop-blur-xl transition-all duration-[350ms] hover:-translate-y-2 hover:border-[rgba(0,198,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,198,255,0.15)] shadow-[0_10px_30px_rgba(0,0,0,0.2)] group"
                        variants={itemVariants}
                    >
                        <div
                            className="w-[60px] h-[60px] bg-[rgba(0,198,255,0.1)] rounded-xl flex items-center justify-center mb-5 text-[#00c6ff] shadow-[0_0_20px_rgba(0,198,255,0.2)] transition-all duration-300 group-hover:bg-[#00c6ff] group-hover:text-slate-900 group-hover:shadow-[0_0_30px_rgba(0,198,255,0.6)] group-hover:scale-110 group-hover:rotate-[5deg]"
                            dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                        <h3 className="m-0 mb-4 text-2xl font-bold text-white uppercase tracking-wide">{item.title}</h3>
                        <p className="text-slate-300 text-base leading-[1.7]">{item.text}</p>
                    </motion.div>
                ))}
            </motion.div>
            <motion.div
                className="mt-20 p-10 max-[600px]:p-6 max-[600px]:mt-12 rounded-3xl bg-gradient-to-br from-[rgba(0,198,255,0.1)] to-[rgba(0,114,255,0.05)] border border-[rgba(0,198,255,0.3)] text-white max-w-[900px] mx-auto text-center backdrop-blur-md"
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-white mb-4 text-[2rem] max-[600px]:text-2xl uppercase tracking-wide">Why Robonity?</h2>
                <p className="text-[1.15rem] max-[600px]:text-base leading-[1.7] text-slate-200">Because the future of robotics isn&apos;t built alone. It&apos;s built together — openly, collaboratively, and fearlessly.</p>
            </motion.div>

            <motion.div
                className="mt-24"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-white uppercase tracking-wide mb-4 text-[2.5rem] max-[900px]:text-[2rem] max-[600px]:text-[1.8rem]">Meet Our Devs</h2>
                    <div className="h-1 w-[60px] bg-[#00c6ff] mx-auto rounded-sm shadow-[0_0_10px_#00c6ff]" />
                </div>

                {developersError ? (
                    <p className="text-red-500 text-center">{developersError}</p>
                ) : developers.length === 0 ? (
                    <p className="text-white text-center">No developers found.</p>
                ) : (
                    <div className="grid grid-cols-4 gap-5 max-w-[1400px] mx-auto max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
                        {developers.map((dev, i) => (
                            <motion.div
                                key={dev._id || i}
                                className="bg-slate-900/40 border border-[rgba(0,198,255,0.1)] backdrop-blur-md rounded-3xl p-[30px] text-center relative overflow-hidden transition-all duration-[400ms] hover:-translate-y-2.5 hover:border-[rgba(0,198,255,0.5)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(0,198,255,0.1)] hover:bg-slate-900/60"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-[120px] h-[120px] mx-auto mb-5 rounded-full p-1 bg-gradient-to-br from-[#00c6ff] to-[#0072ff] shadow-[0_0_20px_rgba(0,198,255,0.3)]">
                                    <img src={dev.image} alt={dev.name} className="w-full h-full rounded-full object-cover border-4 border-slate-900" />
                                </div>
                                <h3 className="text-white text-[1.4rem] mb-1.5 font-bold">{dev.name}</h3>
                                <span className="block text-[#00c6ff] text-sm uppercase tracking-wide mb-5 font-semibold">{dev.role}</span>
                                <div className="flex justify-center gap-5 mb-5">
                                    {dev.socials?.github && (
                                        <a
                                            href={dev.socials.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-slate-400 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:text-white hover:bg-[rgba(0,198,255,0.2)] hover:border-[#00c6ff] hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] hover:scale-110"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                    {dev.socials?.instagram && (
                                        <a
                                            href={dev.socials.instagram}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-slate-400 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:text-white hover:bg-[rgba(0,198,255,0.2)] hover:border-[#00c6ff] hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] hover:scale-110"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                    )}
                                    {dev.socials?.linkedin && (
                                        <a
                                            href={dev.socials.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-slate-400 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:text-white hover:bg-[rgba(0,198,255,0.2)] hover:border-[#00c6ff] hover:shadow-[0_0_15px_rgba(0,198,255,0.4)] hover:scale-110"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <p className="text-slate-300 text-[0.95rem] leading-[1.6]">{dev.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
