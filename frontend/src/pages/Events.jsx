import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventItem from "../components/EventItem";
import SkeletonCard from "../components/SkeletonCard";
import { getEvents } from "../api/eventApi";
import "../styles/Events.css";

export default function Events() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await getEvents();
        setEventData(data);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
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

      {error && <div className="error-message">{error}</div>}

      <div className="event-list">
        {loading ? (
          <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
        ) : eventData.length === 0 && !error ? (
          <p style={{ color: "#9fb0c5", textAlign: "center" }}>No active missions found.</p>
        ) : (
          eventData.map(event => (
            <div key={event._id}>
              <EventItem
                date={event.date}
                title={event.title}
                location={event.location}
                description={event.description}
                fullDetails={event.fullDetails}
                registrationLink={event.registrationLink}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
