import React, { useEffect, useState } from "react";
import EventItem from "../components/EventItem";
import { getEvents } from "../api/eventApi";
import "../styles/Events.css";

function Events() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEventData(res.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
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
      <h1 className="page-header">Events</h1>
      <p className="page-subtitle">
        Check out our calendar for workshops, competitions, and meetups.
      </p>

      <div className="event-list">
        {eventData.length === 0 ? (
          <p style={{ color: "#9fb0c5" }}>No upcoming events scheduled.</p>
        ) : (
          eventData
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
            .map((event) => (
              <EventItem
                key={event._id}
                date={event.date}
                title={event.title}
                location={event.location}
                description={event.description}
                fullDetails={event.fullDetails}
              />
            ))
        )}
      </div>
    </div>
  );
}

export default Events;
