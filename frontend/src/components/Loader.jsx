import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full gap-4">
            <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border-4 border-cyan-500/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Ring */}
                <motion.div
                    className="absolute inset-0 border-t-4 border-cyan-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Core Pulse */}
                <motion.div
                    className="absolute inset-4 bg-cyan-500 rounded-full opacity-50"
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
            <motion.p
                className="text-cyan-400 font-mono text-sm tracking-widest uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Initializing...
            </motion.p>
        </div>
    );
};

export default Loader;
