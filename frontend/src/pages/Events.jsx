import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventItem from "../components/EventItem";
import SkeletonCard from "../components/SkeletonCard";
import { getEvents } from "../api/eventApi"; // Restored API
import "../styles/Events.css";

export default function Events() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents()
      .then(res => {
        // Sort by date if needed, assuming backend returns unsorted
        const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEventData(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events", err);
        setError("Failed to retrieve mission data. Connection Interrupted.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="events-page">
      <motion.h1
        className="page-title glitch-effect"
        data-text="EVENTS"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        EVENTS
      </motion.h1>
      <motion.p
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Check out our calendar for workshops, competitions, and meetups.
      </motion.p>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <motion.div
        className="event-list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
      >
        {loading ? (
          // Show 3 Skeletons while loading
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : eventData.length === 0 && !error ? (
          <p style={{ color: "#9fb0c5", textAlign: "center" }}>No active missions found.</p>
        ) : (
          eventData.map(event => (
            <motion.div
              key={event._id}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
              }}
            >
              <EventItem
                date={event.date}
                title={event.title}
                location={event.location}
                description={event.description}
                fullDetails={event.fullDetails}
                registrationLink={event.registrationLink}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
