import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getGallery } from '../api/galleryApi';
import SkeletonCard from '../components/SkeletonCard';
import HoloCard from '../components/HoloCard';
import "../styles/Gallery.css";

const CATEGORIES = ["All", "WORKSHOP", "INDUCTION", "ROBOSOCCER"];

export default function Gallery() {
    const [filter, setFilter] = useState("All");
    const [activeItem, setActiveItem] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data } = await getGallery();
                setGallery(data);
            } catch (error) {
                console.error("Failed to fetch gallery", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const filteredData = filter === "All" ? gallery : gallery.filter(item => item.category === filter);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
    const bgX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

    const handleMouseMove = (e) => {
        // Optimization: Only run on desktop
        if (window.innerWidth < 768) return;

        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        x.set((clientX / innerWidth) - 0.5);
        y.set((clientY / innerHeight) - 0.5);
    };

    return (
        <div className="gallery-page" onMouseMove={handleMouseMove}>
            <motion.div className="gallery-bg-grid" style={{ x: bgX, y: bgY }} />
            <div className="gallery-header-section">
                <motion.h1
                    className="page-title glitch-effect"
                    data-text="GALLERY"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    GALLERY
                </motion.h1>

                <motion.div
                    className="gallery-filters"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? "active" : ""}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>
            </div>

            <div className="scene-container">
                <motion.div
                    className="gallery-plane"
                    style={{ rotateX, rotateY }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <AnimatePresence mode="popLayout">
                        {loading && (
                            <motion.div
                                key="skeletons"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="gallery-skeletons"
                                style={{ display: 'contents' }}
                            >
                                <SkeletonCard /><SkeletonCard /><SkeletonCard />
                            </motion.div>
                        )}
                        {!loading && filteredData.map(item => (
                            <HoloCard
                                key={item.id}
                                item={item}
                                onClick={setActiveItem}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
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
                            initial={{ scale: 0.5, rotateX: 45 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            exit={{ scale: 0.5, rotateX: -45 }}
                        >
                            <div className="lightbox-image-container">
                                {activeItem.image ? (
                                    <img src={activeItem.image} alt={activeItem.title} className="lightbox-img" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: activeItem.color }} />
                                )}
                            </div>
                            <div className="lightbox-details">
                                <span className="lightbox-category">{activeItem.category}</span>
                                <h3>{activeItem.title}</h3>
                                <p>{activeItem.description}</p>
                                <button className="close-btn" onClick={() => setActiveItem(null)}>Terminate View</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
