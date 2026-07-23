import ResourcesClient from "./ResourcesClient";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function getResources() {
  try {
    const res = await fetch(`${API_URL}/api/resources`, { cache: "no-store" });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch resources", error);
    return [];
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();
  return <ResourcesClient resources={resources} />;
}
