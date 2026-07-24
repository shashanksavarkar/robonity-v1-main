import EventsClient from "./EventsClient";
import { eventsData } from "../../data/events";

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

export default function EventsPage() {
  return <EventsClient events={eventsData} />;
}
