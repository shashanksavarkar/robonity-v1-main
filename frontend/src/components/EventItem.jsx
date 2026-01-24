import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export default function EventItem({ date, title, location, description, fullDetails, registrationLink }) {
  const [expanded, setExpanded] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();

  return (
    <motion.div
      className="event-card"
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        cursor: "pointer"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {/* Date Panel - Holographic Stamp */}
      <div className="event-date-panel">
        <span className="event-day">{day}</span>
        <div className="event-month-year-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="event-month">{month}</span>
          <span className="event-year">{year}</span>
        </div>
      </div>

      {/* Content Module */}
      <div className="event-content">
        <div className="event-meta">
          <span className="event-location">
            <span className="event-location-icon">📍</span> {location}
          </span>
        </div>

        <h3 className="event-title">{title}</h3>
        <p className="event-description">{description}</p>

        <div className="event-actions">
          {registrationLink && (
            <a href={registrationLink} className="btn-register" target="_blank" rel="noopener noreferrer">
              Register Module
            </a>
          )}
          <button
            className="btn-details"
            onClick={(e) => {
              e.stopPropagation(); // Prevent tilt reset/jitter if clicking button
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Close Data" : "View Intel"}
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              className="event-details-expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: 'hidden' }}
            >
              <p>{fullDetails || "No additional intel available."}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
