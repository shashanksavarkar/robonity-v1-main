import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryItem from '../components/GalleryItem';
import "../styles/Gallery.css";

const galleryData = [
    { id: 1, title: 'Autonomous Rover', description: 'A student-built rover navigating an obstacle course.', category: 'Robotics', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 2, title: 'RoboSoccer 2025', description: 'Our team competing in the finals.', category: 'AI', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 3, title: '3D Printed Arm', description: 'A 6-axis robotic arm prototype.', category: 'Mechanical', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 4, title: 'Workshop Day', description: 'Members learning soldering and circuitry.', category: 'Robotics', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 5, title: 'Autonomous Rover', description: 'A student-built rover navigating an obstacle course.', category: 'Robotics', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 6, title: 'RoboSoccer 2025', description: 'Our team competing in the finals.', category: 'AI', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 7, title: '3D Printed Arm', description: 'A 6-axis robotic arm prototype.', category: 'Mechanical', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 8, title: 'Workshop Day', description: 'Members learning soldering and circuitry.', category: 'Robotics', imageUrl: './Public/KickOff-25 GIF.gif' },
    { id: 9, title: 'Workshop Day', description: 'Members learning soldering and circuitry.', category: 'Robotics', imageUrl: './Public/KickOff-25 GIF.gif' }
];

export default function Gallery() {
    const [filter, setFilter] = useState("All");
    const [activeItem, setActiveItem] = useState(null);

    const filteredData = filter === "All" ? galleryData : galleryData.filter(item => item.category === filter);

    return (
        <div className="gallery-page">
            <motion.h1
                className="page-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Project Gallery
            </motion.h1>
            <motion.p
                className="page-subtext"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                A visual showcase of the amazing robots built by our community members.
            </motion.p>

            <motion.div
                className="gallery-filters"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                {["All", "Robotics", "AI", "Mechanical"].map(cat => (
                    <button key={cat} className={filter === cat ? "active" : ""} onClick={() => setFilter(cat)}>{cat}</button>
                ))}
            </motion.div>

            <motion.div
                className="gallery-masonry"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <AnimatePresence>
                    {filteredData.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setActiveItem(item)}
                        >
                            <GalleryItem {...item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

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
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <img src={activeItem.imageUrl} alt={activeItem.title} />
                            <h3>{activeItem.title}</h3>
                            <p>{activeItem.description}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
