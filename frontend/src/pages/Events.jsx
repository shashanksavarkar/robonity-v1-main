import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventItem from "../components/EventItem";
import { eventsData } from "../data/eventsData";
import { useDecipher } from "../hooks/useDecipher";
import "../styles/Events.css";

export default function Events() {
  const [activeTab, setActiveTab] = useState("all");
  const titleText = useDecipher("EVENTS");

  // Group events by academic year
  const groupedEvents = eventsData.reduce((acc, event) => {
    const year = event.academicYear || "Upcoming";
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  // Sort years descending (newest first)
  const sortedYears = Object.keys(groupedEvents).sort((a, b) => b.localeCompare(a));

  return (
    <div className="events-page">
      <motion.div
        className="page-header-container" // Wrapper for potential 3D tilt later
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title glitch-effect" data-text="EVENTS">
          {titleText}
        </h1>
        <p className="page-subtitle">
          Mission Log: Workshops, Competitions, and Operations.
        </p>
      </motion.div>

      <div className="event-list">
        {sortedYears.map((year) => (
          <div key={year} className="academic-year-section">
            <motion.h2
              className="academic-year-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Academic Year {year}
            </motion.h2>

            <div className="year-events-grid">
              {groupedEvents[year].map((event) => (
                <EventItem
                  key={event._id}
                  date={event.date}
                  title={event.title}
                  location={event.location}
                  description={event.description}
                  fullDetails={event.fullDetails}
                  registrationLink={event.registrationLink}
                />
              ))}
            </div>
          </div>
        ))}

        {sortedYears.length === 0 && (
          <p style={{ color: "#9fb0c5", textAlign: "center", marginTop: "40px" }}>
            No missions found in the archives.
          </p>
        )}
      </div>
    </div>
  );
}
