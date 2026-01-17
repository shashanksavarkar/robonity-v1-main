import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import "../styles/Gallery.css";

const galleryData = [
    { id: 1, title: 'Autonomous Rover', description: 'A student-built rover navigating an obstacle course.', category: 'Robotics', color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)' },
    { id: 2, title: 'RoboSoccer 2025', description: 'Our team competing in the finals.', category: 'AI', color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
    { id: 3, title: '3D Printed Arm', description: 'A 6-axis robotic arm prototype.', category: 'Mechanical', color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { id: 4, title: 'Workshop Day', description: 'Members learning soldering and circuitry.', category: 'Robotics', color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)' },
    { id: 5, title: 'Autonomous Drone', description: 'Quad-copter with obstacle avoidance.', category: 'Robotics', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 6, title: 'AI Chess Bot', description: 'Computer vision based chess engine.', category: 'AI', color: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
    { id: 7, title: 'Line Follower', description: 'High speed line following robot.', category: 'Robotics', color: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)' },
    { id: 8, title: 'Guest Lecture', description: 'Industry expert talk on Future of AI.', category: 'Events', color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
    { id: 9, title: 'Smart Wearable', description: 'Health monitoring wristband prototype.', category: 'IoT', color: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' },
    { id: 10, title: 'Home Automation', description: 'Voice controlled lights and fans.', category: 'IoT', color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
    { id: 11, title: 'Solar Tracker', description: 'Dual-axis solar panel tracking system.', category: 'Mechanical', color: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)' },
    { id: 12, title: 'Maze Solver', description: 'Micromouse robot solving a maze.', category: 'Robotics', color: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)' },
    { id: 13, title: 'Face Recognition', description: 'Attendance system using OpenCV.', category: 'AI', color: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)' },
    { id: 14, title: 'Hexapod', description: 'Six-legged spider robot.', category: 'Robotics', color: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 15, title: 'Tech Expo', description: 'Annual showcase of student projects.', category: 'Events', color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
];

const CATEGORIES = ["All", "Robotics", "AI", "Mechanical", "Events", "IoT"];

export default function Gallery() {
    const [filter, setFilter] = useState("All");
    const [activeItem, setActiveItem] = useState(null);
    const filteredData = filter === "All" ? galleryData : galleryData.filter(item => item.category === filter);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Tilt up/down
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Tilt left/right

    // Parallax background movement
    const bgX = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPct = (clientX / innerWidth) - 0.5;
        const yPct = (clientY / innerHeight) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <div className="gallery-page" onMouseMove={handleMouseMove}>
            <motion.div
                className="gallery-bg-grid"
                style={{ x: bgX, y: bgY }}
            />

            <div className="gallery-header-section">
                <motion.h1
                    className="page-header glitch-effect"
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
                        {filteredData.map(item => (
                            <motion.div
                                key={item.id}
                                layout
                                className="holo-card"
                                initial={{ opacity: 0, z: -100 }}
                                animate={{ opacity: 1, z: 0 }}
                                exit={{ opacity: 0, z: -100 }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                onClick={() => setActiveItem(item)}
                                whileHover={{
                                    z: 50,
                                    scale: 1.1,
                                    rotateX: 5,
                                    rotateY: -5,
                                    zIndex: 100
                                }}
                            >
                                <div className="holo-visual" style={{ background: item.color }}>
                                    <div className="scan-line"></div>
                                </div>
                                <div className="holo-info">
                                    <span className="holo-cat">{item.category}</span>
                                    <h3>{item.title}</h3>
                                </div>
                            </motion.div>
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
                            <div className="lightbox-image" style={{ background: activeItem.color }} />
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
