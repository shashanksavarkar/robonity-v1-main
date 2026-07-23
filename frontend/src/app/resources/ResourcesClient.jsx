'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import "../../styles/Resources.css";

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
    <div className="resources-page">
      <div className="resources-header-section">
        <motion.h1
          className="page-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          RESOURCE ARCHIVE
        </motion.h1>

        <div className="resources-controls">
          <input type="text" placeholder="Search database..." className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="resources-filters">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`filter-chip ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="resources-grid"
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
              className="resource-card"
              key={item.id}
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="resource-icon-wrapper" dangerouslySetInnerHTML={{ __html: item.icon }} />
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
            </motion.a>
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#64748b" }}>No resources found in archive.</p>
        )}
      </motion.div>
    </div>
  );
}
