import ProjectsClient from "./ProjectsClient";
import { projectsData } from "../../data/projects";

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

export default function ProjectsPage() {
  return <ProjectsClient projects={projectsData} />;
}
