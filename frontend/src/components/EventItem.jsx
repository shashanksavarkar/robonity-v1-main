import React, { useState } from "react";

function EventItem({
  date,
  title,
  location,
  description,
  fullDetails,
  registrationLink,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const eventDate = new Date(date);
  const isValidDate = !isNaN(eventDate.getTime());

  const month = isValidDate
    ? eventDate.toLocaleString("default", { month: "short" }).toUpperCase()
    : "TBA";
  const day = isValidDate ? eventDate.getDate() : "--";

  const handleRegister = (e) => {
    e.stopPropagation();
    if (registrationLink) {
      window.open(registrationLink, "_blank");
    } else {
      alert("Registration for this event is not yet open.");
    }
  };

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
        <div className="event-venue">{location}</div>
        <p className="event-description">{description}</p>

        <div className="event-extra">
          <p>{fullDetails}</p>
          <div className="event-actions">
            <button onClick={handleRegister}>Register Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
