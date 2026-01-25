import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventItem from "../components/EventItem";
import { getEvents } from "../api/eventApi";
import { useDecipher } from "../hooks/useDecipher";
import "../styles/Events.css";

export default function Events() {
  const titleText = useDecipher("EVENTS");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Group events by academic year
  // Assuming the DB has a 'date' field, we can derive the academic year or use an explicit field if available
  // The original static data had an 'academicYear' field. Let's see if we can preserve that logic.
  // If the DB schema doesn't have 'academicYear', we might need to calculate it or rely on what's there.
  // The seed data in previous steps showed 'date' but didn't show 'academicYear' in the 'eventsData' array in seed.js EXCEPT for the comments.
  // Wait, let me check seed.js again to be sure about the schema.
  // Checking Step 16: eventsData in seed.js DOES NOT have 'academicYear' property.
  // It only has date, title, location, description, fullDetails, registrationLink, flagship.
  // However, the static file eventsData.js DID have 'academicYear'.
  // I should probably calculate the academic year from the date to maintain the grouping.
  
  const getAcademicYear = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    // Assuming academic year starts in July/August. 
    // If month >= 6 (July), it's Year-(Year+1). Else (Year-1)-Year.
    // Let's stick to a simple year based grouping or try to replicate the existing logic.
    // The previous static data explicitely set it. 
    // Let's deduce it: if month is June(5) or later, it belongs to the current year's start.
    if (month >= 5) {
        return `${year}-${(year + 1).toString().slice(-2)}`;
    } else {
        return `${year - 1}-${year.toString().slice(-2)}`;
    }
  };

  const groupedEvents = events.reduce((acc, event) => {
    // Use existing academicYear if present (in case backend adds it later), else calculate it
    const year = event.academicYear || getAcademicYear(event.date);
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  // Sort years descending (newest first)
  const sortedYears = Object.keys(groupedEvents).sort((a, b) => b.localeCompare(a));

  if (loading) {
    return (
      <div className="events-page loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div className="loader">Loading missions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-page error-container" style={{ textAlign: 'center', marginTop: '50px', color: '#ff6b6b' }}>
        <p>{error}</p>
      </div>
    );
  }

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
