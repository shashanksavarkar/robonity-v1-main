import React, { useState } from "react";

function EventItem({ date, title, location, description, fullDetails }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parsing "YYYY-MM-DD" or similar string to get Day/Month
  const eventDate = new Date(date);
  const month = eventDate
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const day = eventDate.getDate();

  return (
    <div
      className={`event-card ${isExpanded ? "expanded" : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="event-date">
        <span className="event-month">{month}</span>
        <span className="event-day">{day}</span>
      </div>

      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        <div className="event-venue">
          <i className="fas fa-map-marker-alt"></i> {location}
        </div>
        <p className="event-description">{description}</p>

        <div className="event-extra">
          <p>{fullDetails}</p>
          <div className="event-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Registering for " + title);
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
