import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import EventItem from "../components/EventItem";
import { getEvents } from "../api/eventApi";
import "../styles/Events.css";

export default function Events() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(res => setEventData(res.data.sort((a, b) => new Date(a.date) - new Date(b.date))))
      .catch(error => console.error("Failed to fetch events", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="events-page">
        <h1 className="page-header">Events</h1>
        <p className="page-subtitle">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="events-page">
      <motion.h1
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Events
      </motion.h1>
      <motion.p
        className="page-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Check out our calendar for workshops, competitions, and meetups.
      </motion.p>
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
        {eventData.length === 0 ? (
          <p style={{ color: "#9fb0c5" }}>No events available.</p>
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
