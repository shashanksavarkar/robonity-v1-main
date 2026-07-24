'use client';

import React from "react";
import { motion } from "framer-motion";
import EventItem from "../../components/EventItem";

const getAcademicYear = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  if (month >= 5) {
    return `${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    return `${year - 1}-${year.toString().slice(-2)}`;
  }
};

export default function EventsClient({ events }) {
  const groupedEvents = events.reduce((acc, event) => {
    const year = event.academicYear || getAcademicYear(event.date);
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedEvents).sort((a, b) => b.localeCompare(a));

  return (
    <div className="pt-[90px] pb-[100px] px-5 min-h-screen w-full max-w-[1200px] mx-auto text-slate-200 flex flex-col items-center relative max-[768px]:pt-[100px] max-[768px]:pb-[50px] max-[768px]:px-[15px]">
      <motion.div
        className="text-center mb-2.5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[3.5rem] max-[768px]:text-[2.2rem] font-black mb-2.5 uppercase tracking-[2px] bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent relative z-2">EVENTS</h1>
        <p className="font-mono text-base text-[#00c6ff] mb-[60px] text-center max-w-[600px] opacity-80 tracking-wide">
          Workshops, competitions, and operations.
        </p>
      </motion.div>

      <div className="w-full flex flex-col gap-10">
        {sortedYears.map((year) => (
          <div key={year}>
            <motion.h2
              className="font-bold text-[1.4rem] text-[#00c6ff] mb-5 pb-2.5 border-b border-[rgba(0,198,255,0.2)] w-full uppercase tracking-[2px] before:content-['►'] before:mr-[15px] before:text-white before:text-base before:align-middle"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Academic Year {year}
            </motion.h2>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6 w-full max-[768px]:grid-cols-1">
              {groupedEvents[year].map((event) => (
                <EventItem
                  key={event.id}
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
          <p className="text-[#9fb0c5] text-center mt-10">
            No missions found in the archives.
          </p>
        )}
      </div>
    </div>
  );
}
