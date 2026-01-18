import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { resourcesData } from '../api/data';
import SkeletonCard from '../components/SkeletonCard';
import "../styles/Resources.css";

const CATEGORIES = ["All", "Documentation", "Hardware", "Robotics", "AI/ML", "3D Printing", "Software", "Tools", "Community"];

export default function Resources() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]); // Tilt up/down
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]); // Tilt left/right

  const handlePageMouseMove = (e) => {
    // Disable tilt on mobile
    if (window.innerWidth < 768) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPct = (clientX / innerWidth) - 0.5;
    const yPct = (clientY / innerHeight) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Spotlight Logic (Per Card)
  const handleCardMouseMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const filteredResources = resourcesData.filter(item => {
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
            placeholder="Search database..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ perspective: "1000px", width: "100%", maxWidth: "1200px" }}>
        <motion.div
          className="resources-grid"
          style={{ rotateX, rotateY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
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
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="scan-line" />
                <div className="resource-card-inner">
                  <div className="resource-icon-wrapper">
                    {item.icon}
                  </div>
                  <div className="resource-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="resource-meta">
                    <span className="resource-category">{item.category}</span>
                    <span className="resource-link-icon">↗</span>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#64748b" }}>
              No resources found in archive.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}