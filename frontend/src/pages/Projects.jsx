import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../styles/Projects.css';

const ALL_CATEGORIES = ["All", "AI", "Robotics", "IoT", "Embedded", "Software"];

const projectsData = [
    {
        id: 1,
        title: "A-Bot",
        desc: "An autonomous raspberry-pi rover capable of mapping its environment.",
        category: "Robotics",
        status: "Completed",
        author: "DevTeam Alpha",
        color: "linear-gradient(135deg, #FF6B6B 0%, #556270 100%)"
    },
    {
        id: 2,
        title: "Swarm Control",
        desc: "Coordinated multi-agent system for search and rescue operations.",
        category: "AI",
        status: "In Progress",
        author: "Sarah J.",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 3,
        title: "Smart Arm",
        desc: "Voice-controlled robotic arm assistance for home automation.",
        category: "IoT",
        status: "Beta",
        author: "TechWiz",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 4,
        title: "Neural Vision",
        desc: "Computer vision pipeline for object detection in low light.",
        category: "Software",
        status: "Completed",
        author: "Visionary",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 5,
        title: "Underwater Drone",
        desc: "Submersible exploration vehicle for pipeline inspection.",
        category: "Robotics",
        status: "Planning",
        author: "DeepDive",
        color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    },
    {
        id: 6,
        title: "Home Brain",
        desc: "Centralized home automation server with local LLM integration.",
        category: "IoT",
        status: "In Progress",
        author: "NetRunner",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
];

export default function Projects() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    const filteredProjects = projectsData.filter(project => {
        const matchesCategory = filter === "All" || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // 3D Wall Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    // Wall rotation - wider range but subtle to feel large
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]); // Horizontal Pan
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]); // Vertical Tilt

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPct = (clientX / innerWidth) - 0.5;
        const yPct = (clientY / innerHeight) - 0.5;
        x.set(xPct);
        y.set(yPct);

        // CSS variable update for spotlight
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const xLocal = e.clientX - rect.left;
        const yLocal = e.clientY - rect.top;
        document.documentElement.style.setProperty("--cursor-x", `${xLocal}px`);
        document.documentElement.style.setProperty("--cursor-y", `${yLocal}px`);
    };

    return (
        <div className="projects-page" onMouseMove={handleMouseMove}>
            <div className="projects-header-section">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="page-title glitch-effect"
                    data-text="EXPLORE PROJECTS"
                >
                    EXPLORE PROJECTS
                </motion.h1>
                <div className="controls-bar">
                    <div className="category-filters">
                        {ALL_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="project-scene">
                <motion.div
                    className="projects-grid"
                    style={{ rotateX, rotateY }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                className="project-card"
                                initial={{ opacity: 0, z: 50 }}
                                animate={{ opacity: 1, z: 0 }}
                                exit={{ opacity: 0, z: 50 }}
                                whileHover={{
                                    scale: 1.05,
                                    z: 60,
                                    rotateX: 2,
                                    rotateY: -2,
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className="card-image" style={{ background: project.color }} />
                                <div className="card-content">
                                    <span className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}>
                                        {project.status}
                                    </span>
                                    <h3>{project.title}</h3>
                                    <p>{project.desc}</p>
                                    <div className="card-footer">
                                        <span className="category-tag">{project.category}</span>
                                        <span className="author-tag">by {project.author}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Always show CTA card */}
                    <motion.div
                        layout
                        className="project-card cta-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05, z: 50 }}
                    >
                        <div className="cta-content">
                            <h3>+ Submit Project</h3>
                            <p>Have an idea? Share it with the world.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
