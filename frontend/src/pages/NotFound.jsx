import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-900 text-white">
            <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

            <div className="relative z-10 text-center">
                <motion.h1
                    className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600 mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold mb-4">System Malfunction</h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        The requested data segment could not be located. It may have been corrupted or does not exist in this sector.
                    </p>

                    <Link
                        to="/"
                        className="px-8 py-3 rounded-xl bg-cyan-500 hoover:bg-cyan-400 text-slate-900 font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_30px_rgba(0,198,255,0.4)]"
                    >
                        Return to Base
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
