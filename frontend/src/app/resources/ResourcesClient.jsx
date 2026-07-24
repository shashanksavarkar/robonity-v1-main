'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = ["All", "Hardware", "Software", "Embedded", "AI/ML", "Simulation", "Control", "Manufacturing", "CAD", "Learning", "Community", "Research", "DevOps", "Tools"];

export default function ResourcesClient({ resources }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredResources = resources.filter(item => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-[90px] pb-15 px-5 max-w-[1200px] mx-auto text-white flex flex-col items-center max-[768px]:pt-[100px] max-[768px]:pb-10 max-[768px]:px-4">
      <div className="w-full text-center mb-10">
        <motion.h1
          className="text-[3.5rem] max-[768px]:text-[2rem] font-black bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-[-1px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          RESOURCE ARCHIVE
        </motion.h1>

        <div className="w-full max-w-[700px] mx-auto mt-[30px] flex flex-col gap-4">
          <input
            type="text"
            placeholder="Search database..."
            className="w-full py-[15px] px-5 bg-slate-900/60 border border-[rgba(0,198,255,0.3)] rounded-lg text-[#00c6ff] text-base transition-all outline-none focus:border-[#00c6ff] focus:shadow-[0_0_20px_rgba(0,198,255,0.2)] focus:bg-slate-900/80 placeholder:text-slate-400/60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2.5 overflow-x-auto pb-0.5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`shrink-0 py-2 px-4 rounded-full text-[0.85rem] whitespace-nowrap cursor-pointer transition-all border ${filter === cat ? "bg-[rgba(0,198,255,0.2)] border-[#00c6ff] text-white" : "bg-white/5 border-white/10 text-slate-400 hover:bg-[rgba(0,198,255,0.2)] hover:border-[#00c6ff] hover:text-white"}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5 w-full max-[768px]:grid-cols-1"
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
      >
        {filteredResources.length > 0 ? (
          filteredResources.map(item => (
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3.5 bg-slate-800 border border-white/[0.08] rounded-xl p-5 no-underline transition-[border-color,box-shadow] duration-250 hover:border-[rgba(0,198,255,0.5)] hover:shadow-[0_10px_30px_-10px_rgba(0,198,255,0.25)]"
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div
                className="w-11 h-11 bg-white/5 rounded-[10px] flex items-center justify-center text-[#00c6ff] transition-colors duration-250 group-hover:bg-[#00c6ff] group-hover:text-slate-900 [&>svg]:w-[22px] [&>svg]:h-[22px]"
                dangerouslySetInnerHTML={{ __html: item.icon }}
              />
              <div>
                <h3 className="m-0 text-[1.1rem] text-slate-100">{item.title}</h3>
                <p className="mt-1.5 mb-0 text-slate-400 text-[0.9rem] leading-relaxed">{item.description}</p>
              </div>
              <div className="mt-auto flex justify-between items-center pt-3.5 border-t border-white/[0.06]">
                <span className="text-xs text-[#00c6ff] uppercase tracking-wide">{item.category}</span>
                <span className="text-slate-500 transition-colors group-hover:text-[#00c6ff]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </span>
              </div>
            </motion.a>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">No resources found in archive.</p>
        )}
      </motion.div>
    </div>
  );
}
