import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { getResources } from '../api/resourceApi';
import SkeletonCard from '../components/SkeletonCard';
import "../styles/Resources.css";

const CATEGORIES = ["All", "Documentation", "Hardware", "Robotics", "AI/ML", "3D Printing", "Software", "Tools", "Community"];

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handlePageMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set((clientX / innerWidth) - 0.5);
    y.set((clientY / innerHeight) - 0.5);
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const { data } = await getResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleCardMouseMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const filteredResources = resources.filter(item => {
    const matchesCategory = filter === "All" || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="resources-page" onMouseMove={handlePageMouseMove}>
      <div className="resources-bg-grid" />
      <div className="resources-header-section">
        <motion.h1
          className="page-title glitch-effect"
          data-text="RESOURCE ARCHIVE"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          RESOURCE ARCHIVE
        </motion.h1>

        <div className="controls-bar">
          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`filter-btn ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
            ))}
          </div>
          <input type="text" placeholder="Search database..." className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div style={{ perspective: "1000px", width: "100%", maxWidth: "1200px" }}>
        <motion.div
          className="resources-grid"
          style={{ rotateX, rotateY }}
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        >
          {loading ? (
            <><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
          ) : filteredResources.length > 0 ? (
            filteredResources.map(item => (
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
                key={item.id}
                onMouseMove={handleCardMouseMove}
                initial="hidden"
                animate="visible"
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="scan-line" />
                <div className="resource-card-inner">
                  <div className="resource-icon-wrapper">{item.icon}</div>
                  <div className="resource-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="resource-meta">
                    <span className="resource-category">{item.category}</span>
                    <span className="resource-link-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#64748b" }}>No resources found in archive.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}