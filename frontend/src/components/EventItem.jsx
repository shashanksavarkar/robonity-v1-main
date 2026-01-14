import React, { useState } from "react";


function EventItem({ date, title, location, description, fullDetails }) {
    const [expanded, setExpanded] = useState(false);
    const [month, day] = date.split(" ");

    return (
        <div className={`event-card ${expanded ? "expanded" : ""}`}>
            {/* DATE STRIP */}
            <div className="event-date">
                <span className="event-month">{month}</span>
                <span className="event-day">{day}</span>
            </div>

            {/* EVENT CONTENT */}
            <div className="event-content">
                <h3 className="event-title">{title}</h3>
                <div className="event-venue">{location}</div>

                <p className="event-description">{description}</p>

                {/* EXPANDABLE CONTENT */}
                <div className="event-extra">
                    <p>{fullDetails}</p>
                </div>

                {/* CTA */}
                <div className="event-actions">
                    <button onClick={() => setExpanded(!expanded)}>
                        {expanded ? "Hide Details" : "View Details"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventItem;
