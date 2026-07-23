'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Wrench, GraduationCap, Trophy } from 'lucide-react';
import HoloCard from '../../components/HoloCard';
import LazyMedia from '../../components/LazyMedia';
import "../../styles/Gallery.css";

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
        <div className="gallery-page">
            <nav className="gallery-filter-sidebar">
                {CATEGORIES.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        type="button"
                        className={`sidebar-filter-btn ${filter === key ? "active" : ""}`}
                        onClick={() => setFilter(key)}
                        aria-label={`Filter by ${label}`}
                        aria-pressed={filter === key}
                    >
                        <Icon size={18} strokeWidth={2} />
                        <span className="sidebar-tooltip">{label}</span>
                    </button>
                ))}
            </nav>

            <div className="gallery-grid">
                <motion.div
                    layout
                    className="gallery-header-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h1 className="page-title">Gallery</h1>
                    <p className="gallery-subtitle">
                        Photos from Robonity workshops, inductions, and RoboSoccer events.
                    </p>
                    <span className="gallery-count">{filteredData.length} photos</span>
                </motion.div>

                <AnimatePresence mode="popLayout">
                    {filteredData.map(item => (
                        <HoloCard
                            key={item.id}
                            item={item}
                            onClick={setActiveItem}
                        />
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        className="lightbox"
                        onClick={() => setActiveItem(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="lightbox-content"
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                        >
                            <div className="lightbox-image-container">
                                {activeItem.image ? (
                                    <LazyMedia src={activeItem.image} alt={activeItem.title} className="lightbox-img" placeholderColor={activeItem.color || '#1e293b'} sizes="500px" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: activeItem.color }} />
                                )}
                            </div>
                            <div className="lightbox-details">
                                <span className="lightbox-category">{activeItem.category}</span>
                                <h3>{activeItem.title}</h3>
                                <p>{activeItem.description}</p>
                                <button className="close-btn" onClick={() => setActiveItem(null)}>Close</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
