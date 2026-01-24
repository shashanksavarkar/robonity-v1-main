import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventItem from "../components/EventItem";
import SkeletonCard from "../components/SkeletonCard";
import { getEvents } from "../api/eventApi";
import "../styles/Events.css";

export default function Events() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const getFilteredEvents = () => {
    const now = new Date();
    // Reset time components for clearer date comparison
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return eventData.filter(event => {
      const eventDate = new Date(event.date);
      const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

      if (activeTab === "upcoming") {
        return eventDay > today;
      } else if (activeTab === "previous") {
        return eventDay < today;
      } else if (activeTab === "ongoing") {
        return eventDay.getTime() === today.getTime();
      }
      return false;
    }).sort((a, b) => {
      // Sort upcoming ascending (nearest first), previous descending (recent first)
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return activeTab === "previous" ? dateB - dateA : dateA - dateB;
    });
  };

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

      <div className="tabs-container">
        {["upcoming", "ongoing", "previous"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                className="tab-highlight"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="event-list">
        {loading ? (
          <><SkeletonCard /><SkeletonCard /><SkeletonCard /></>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="event-section"
            >
              {getFilteredEvents().length === 0 ? (
                <p style={{ color: "#9fb0c5", textAlign: "center", marginTop: "40px" }}>
                  No {activeTab} missions found.
                </p>
              ) : (
                getFilteredEvents().map(event => (
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
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
