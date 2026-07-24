'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventItem({ date, title, location, description, fullDetails, registrationLink }) {
  const [expanded, setExpanded] = useState(false);

  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();

  return (
    <motion.div
      className="relative bg-slate-900/60 border border-white/[0.08] rounded-[14px] overflow-hidden backdrop-blur-[10px] transition-[border-color,box-shadow] duration-300 flex flex-col hover:border-cyan-400/[0.35] hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-white/[0.06] bg-black/[0.15]">
        <div className="flex items-baseline gap-1.5 font-mono">
          <span className="text-[1.6rem] font-extrabold text-white leading-none">{day}</span>
          <span className="text-[0.85rem] text-[#00c6ff] uppercase font-bold">{month}</span>
          <span className="text-xs text-slate-500">{year}</span>
        </div>
        <span className="font-mono text-xs text-slate-400 uppercase tracking-wide text-right">
          <span className="text-[#00c6ff] mr-1">📍</span> {location}
        </span>
      </div>

      <div className="px-6 pt-[22px] pb-[26px] flex flex-col flex-1">
        <h3 className="text-[1.3rem] font-bold text-white mb-2.5">{title}</h3>
        <p className="text-slate-300 text-[0.95rem] leading-relaxed mb-5 flex-1">{description}</p>

        <div className="flex gap-3">
          {registrationLink && (
            <a
              href={registrationLink}
              className="px-[18px] py-2 font-mono text-[0.8rem] font-bold uppercase rounded-md cursor-pointer transition-all duration-200 bg-cyan-400/10 text-[#00c6ff] border border-[#00c6ff] hover:bg-[#00c6ff] hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
          )}
          <button
            className="px-[18px] py-2 font-mono text-[0.8rem] font-bold uppercase rounded-md cursor-pointer transition-all duration-200 text-slate-400 bg-transparent border border-white/[0.12] hover:border-white hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Close" : "Details"}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="mt-4 pt-4 border-t border-white/[0.08] text-slate-300 text-[0.9rem] leading-relaxed"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: 'hidden' }}
            >
              <p>{fullDetails || "No additional details available."}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
