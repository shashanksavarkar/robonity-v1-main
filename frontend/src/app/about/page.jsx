import AboutClient from "./AboutClient";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function getAboutItems() {
  try {
    const res = await fetch(`${API_URL}/api/about/items`, { cache: "no-store" });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error("Error fetching about items:", error);
    return [];
  }
}

async function getDevelopers() {
  try {
    const res = await fetch(`${API_URL}/api/about/devs`, { cache: "no-store" });
    if (!res.ok) throw new Error("Request failed");
    return { data: await res.json(), error: null };
  } catch (error) {
    console.error("Error fetching developers:", error);
    return { data: [], error: "Failed to load developers." };
  }
}

export default async function AboutPage() {
  const [aboutItems, developersResult] = await Promise.all([getAboutItems(), getDevelopers()]);

  return (
    <AboutClient
      aboutItems={aboutItems}
      developers={developersResult.data}
      developersError={developersResult.error}
    />
  );
}
