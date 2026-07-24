import AboutClient from "./AboutClient";
import { aboutItemsData, developersData } from "../../data/about";

export const metadata = {
  title: "About",
  description: "Robonity is a community-driven platform built for robotics enthusiasts, engineers, and innovators.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Robonity",
    description: "Robonity is a community-driven platform built for robotics enthusiasts, engineers, and innovators.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <AboutClient
      aboutItems={aboutItemsData}
      developers={developersData}
      developersError={null}
    />
  );
}
