'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventItem({ date, title, location, description, fullDetails, registrationLink }) {
  const [expanded, setExpanded] = useState(false);

  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('default', { month: 'short' });
  const year = eventDate.getFullYear();

  return (
    <motion.div
      className="event-card"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="event-card-top">
        <div className="event-date-badge">
          <span className="event-day">{day}</span>
          <span className="event-month">{month}</span>
          <span className="event-year">{year}</span>
        </div>
        <span className="event-location">
          <span className="event-location-icon">📍</span> {location}
        </span>
      </div>

      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        <p className="event-description">{description}</p>

        <div className="event-actions">
          {registrationLink && (
            <a href={registrationLink} className="btn-register" target="_blank" rel="noopener noreferrer">
              Register
            </a>
          )}
          <button
            className="btn-details"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Close" : "Details"}
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
              <p>{fullDetails || "No additional details available."}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
