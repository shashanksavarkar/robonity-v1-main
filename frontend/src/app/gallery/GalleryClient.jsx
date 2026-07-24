'use client';

import React, { useState } from 'react';
import { LayoutGrid, Wrench, GraduationCap, Trophy } from 'lucide-react';
import HoloCard from '../../components/HoloCard';
import LazyMedia from '../../components/LazyMedia';

const CATEGORIES = [
    { key: "All", label: "All", icon: LayoutGrid },
    { key: "WORKSHOP", label: "Workshop", icon: Wrench },
    { key: "INDUCTION", label: "Induction", icon: GraduationCap },
    { key: "ROBOSOCCER", label: "RoboSoccer", icon: Trophy },
];

export default function GalleryClient({ gallery }) {
    const [filter, setFilter] = useState("All");
    const [activeItem, setActiveItem] = useState(null);

    const filteredData = filter === "All" ? gallery : gallery.filter(item => item.category === filter);

    return (
        // Breaks out of the shared LayoutWrapper's centered max-width + padding
        // so the grid can run edge to edge.
        <div className="relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] bg-[#05070d] overflow-hidden">
            <nav className="fixed z-900 flex bg-[rgba(5,7,13,0.85)] backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                             bottom-5 left-1/2 -translate-x-1/2 flex-row rounded-full
                             md:bottom-auto md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 md:flex-col md:border-l-0 md:rounded-l-none md:rounded-r-2xl">
                {CATEGORIES.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        type="button"
                        className={`group relative flex items-center justify-center bg-transparent border-none cursor-pointer
                                    w-11 h-11 border-r border-white/[0.06] last:border-r-0
                                    md:w-13 md:h-13 md:border-r-0 md:border-b md:border-white/[0.06] md:last:border-b-0
                                    ${filter === key ? "bg-[#00c6ff] text-[#06121c]" : "text-slate-400 hover:bg-[rgba(0,198,255,0.1)] hover:text-white"}`}
                        onClick={() => setFilter(key)}
                        aria-label={`Filter by ${label}`}
                        aria-pressed={filter === key}
                    >
                        <Icon size={18} strokeWidth={2} />
                        <span className="pointer-events-none absolute whitespace-nowrap rounded-md border border-[rgba(0,198,255,0.3)] bg-[rgba(8,13,26,0.95)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100
                                         left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)]
                                         md:left-[calc(100%+10px)] md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0">
                            {label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="relative grid grid-cols-3 auto-rows-fr [grid-auto-flow:dense] gap-0 w-full sm:grid-cols-5 lg:grid-cols-7 min-[1440px]:grid-cols-9">
                <div className="relative z-10 col-span-3 row-span-3 sm:row-span-2 flex flex-col items-center justify-center text-center gap-3.5 p-6">
                    <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black m-0 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-[-1px]">Gallery</h1>
                    <p className="text-slate-300 text-[clamp(0.8rem,2vw,1rem)] max-w-[32ch] leading-relaxed m-0">
                        Photos from Robonity workshops, inductions, and RoboSoccer events.
                    </p>
                    <span className="text-[#00c6ff] text-xs font-bold uppercase tracking-[1.5px]">{filteredData.length} photos</span>
                </div>

                {filteredData.map(item => (
                    <HoloCard
                        key={item.id}
                        item={item}
                        onClick={setActiveItem}
                    />
                ))}
            </div>

            {activeItem && (
                <div
                    className="fixed inset-0 bg-black/85 backdrop-blur-md z-2000 flex items-center justify-center p-5"
                    onClick={() => setActiveItem(null)}
                >
                    <div
                        className="bg-slate-900/95 border border-[#00c6ff] rounded-2xl w-full max-w-[500px] overflow-hidden relative shadow-[0_0_50px_rgba(0,198,255,0.25)] max-[768px]:w-[90%] max-[768px]:max-h-[90vh] max-[768px]:overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="h-[300px] w-full relative border-b border-[rgba(0,198,255,0.4)]">
                            {activeItem.image ? (
                                <LazyMedia src={activeItem.image} alt={activeItem.title} className="w-full h-full [&_img]:object-cover block" placeholderColor={activeItem.color || '#1e293b'} sizes="500px" />
                            ) : (
                                <div style={{ width: '100%', height: '100%', background: activeItem.color }} />
                            )}
                        </div>
                        <div className="p-[30px]">
                            <span className="text-[#00c6ff] text-[0.8rem] uppercase font-bold block mb-2 font-mono">{activeItem.category}</span>
                            <h3 className="text-[1.8rem] text-white my-2.5 uppercase">{activeItem.title}</h3>
                            <p className="text-slate-400 leading-relaxed mb-5">{activeItem.description}</p>
                            <button
                                className="mt-2.5 w-full py-3 bg-[#00c6ff] text-black font-extrabold uppercase border-none cursor-pointer rounded-lg transition-colors hover:bg-white"
                                onClick={() => setActiveItem(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
