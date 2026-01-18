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

  const DUMMY_EVENTS = [
    {
      _id: "dummy1",
      date: "2026-03-15",
      title: "Robonity Hackathon 2026",
      location: "San Francisco, CA & Online",
      description: "48 hours of non-stop coding, building, and innovating with peers from around the globe.",
      fullDetails: "Join us for the biggest robotics hackathon of the year! Categories include Autonomous Systems, AI Integration, and Sustainable Robotics. Prizes worth $50k.",
      registrationLink: "/register/hackathon"
    },
    {
      _id: "dummy2",
      date: "2026-04-10",
      title: "Workshop: Advanced Drone Flight",
      location: "Virtual",
      description: "Master the art of autonomous drone navigation using ROS2 and PX4.",
      fullDetails: "This hands-on workshop covers sensor fusion, path planning, and obstacle avoidance. Prerequisites: Basic Python and Linux knowledge.",
      registrationLink: "/register/drone-workshop"
    },
    {
      _id: "dummy3",
      date: "2026-05-22",
      title: "Global Tech Summit",
      location: "London, UK",
      description: "Hear from industry pioneers and robotics experts about the future of automation.",
      fullDetails: "Keynote speakers from Boston Dynamics, Tesla, and NASA. Networking sessions included.",
      registrationLink: "/register/tech-summit"
    },
    {
      _id: "dummy4",
      date: "2026-06-18",
      title: "Bot Wars Championship",
      location: "Tokyo, Japan",
      description: "The ultimate combat robotics tournament. Build, fight, and win glory.",
      fullDetails: "Witness 250lb combat robots clash in the arena. Team registration open now.",
      registrationLink: "/register/bot-wars"
    }
  ];

  useEffect(() => {

    setEventData(DUMMY_EVENTS);
    setLoading(false);
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

      <div className="event-list">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
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
