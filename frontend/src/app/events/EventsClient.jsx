'use client';

import React from "react";
import { motion } from "framer-motion";
import EventItem from "../../components/EventItem";
import "../../styles/Events.css";

const getAcademicYear = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  if (month >= 5) {
    return `${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    return `${year - 1}-${year.toString().slice(-2)}`;
  }
};

export default function EventsClient({ events }) {
  const groupedEvents = events.reduce((acc, event) => {
    const year = event.academicYear || getAcademicYear(event.date);
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedEvents).sort((a, b) => b.localeCompare(a));

  return (
    <div className="events-page">
      <motion.div
        className="page-header-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">EVENTS</h1>
        <p className="page-subtitle">
          Workshops, competitions, and operations.
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
