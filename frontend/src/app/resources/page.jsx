import ResourcesClient from "./ResourcesClient";
import { resourcesData } from "../../data/resources";

export const metadata = {
  title: "Resources",
  description: "A curated archive of tutorials, datasheets, and learning materials for robotics.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources | Robonity",
    description: "A curated archive of tutorials, datasheets, and learning materials for robotics.",
    url: "/resources",
  },
};

export default function ResourcesPage() {
  return <ResourcesClient resources={resourcesData} />;
}
