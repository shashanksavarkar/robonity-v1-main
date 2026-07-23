import EventsClient from "./EventsClient";

export const metadata = {
  title: "Events",
  description: "Workshops, hackathons, and competitions hosted by the Robonity community.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: "Events | Robonity",
    description: "Workshops, hackathons, and competitions hosted by the Robonity community.",
    url: "/events",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function getEvents() {
  try {
    const res = await fetch(`${API_URL}/api/events`, { cache: "no-store" });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  return <EventsClient events={events} />;
}
