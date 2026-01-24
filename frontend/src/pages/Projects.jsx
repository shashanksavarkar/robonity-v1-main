import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getProjects } from '../api/projectApi';
import SkeletonCard from '../components/SkeletonCard';
import '../styles/Projects.css';

const ALL_CATEGORIES = ["All", "AI", "Robotics", "IoT", "Embedded", "Software"];

export default function Projects() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [projects, setProjects] = useState([]);
    const [activeProject, setActiveProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesCategory = filter === "All" || project.category === filter;
        const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPct = (clientX / innerWidth) - 0.5;
        const yPct = (clientY / innerHeight) - 0.5;
        x.set(xPct);
        y.set(yPct);

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
                        {loading && (
                            <>
                                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SkeletonCard /></motion.div>
                                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SkeletonCard /></motion.div>
                                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><SkeletonCard /></motion.div>
                            </>
                        )}
                        {!loading && filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                className="project-card"
                                initial={{ opacity: 0, z: 50 }}
                                animate={{ opacity: 1, z: 0 }}
                                exit={{ opacity: 0, z: 50 }}
                                whileHover={{ scale: 1.05, z: 60, rotateX: 2, rotateY: -2 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                onClick={() => setActiveProject(project)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card-image" style={{
                                    background: project.image ? `url("${project.image}") center/cover no-repeat` : project.color
                                }} />
                                <div className="card-content">
                                    <span className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}>{project.status}</span>
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

                    <motion.div
                        layout
                        className="project-card cta-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05, z: 50 }}
                    >
                        <motion.a href="/auth" style={{ textDecoration: 'none', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="cta-content">
                                <h3>Join Community</h3>
                                <p>Unlock full access to submit projects and collaborate.</p>
                            </div>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        className="lightbox"
                        onClick={() => setActiveProject(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            className="lightbox-content"
                            onClick={e => e.stopPropagation()}
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 50 }}
                            style={{
                                background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '20px', overflow: 'hidden', maxWidth: '800px', width: '90%',
                                display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr'
                            }}
                        >
                            <div className="lightbox-image" style={{
                                background: activeProject.image ? `url("${activeProject.image}") center/cover no-repeat` : activeProject.color,
                                minHeight: '300px',
                                height: '100%'
                            }} />
                            <div className="lightbox-details" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <span className="lightbox-category" style={{ color: '#00c6ff', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem' }}>
                                    {activeProject.category || 'PROJECT'}
                                </span>
                                <h3 style={{ fontSize: '2rem', color: 'white', lineHeight: 1.2 }}>{activeProject.title}</h3>
                                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#94a3b8' }}>
                                    <span>BY {activeProject.author || 'ANONYMOUS'}</span>
                                    <span>•</span>
                                    <span>{activeProject.status || 'COMPLETED'}</span>
                                </div>
                                <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginTop: '1rem' }}>{activeProject.desc}</p>
                                <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="close-btn"
                                        onClick={() => setActiveProject(null)}
                                        style={{
                                            padding: '10px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
                                            color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
                                        }}
                                    >
                                        CLOSE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
