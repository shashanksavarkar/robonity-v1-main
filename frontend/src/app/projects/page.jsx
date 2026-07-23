import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects",
  description: "Explore robotics projects built by the Robonity community.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Robonity",
    description: "Explore robotics projects built by the Robonity community.",
    url: "/projects",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/api/projects`, { cache: "no-store" });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
