import HomeClient from "./HomeClient";

export const metadata = {
  title: { absolute: "Robonity | Robotics & Engg. Domain" },
  description:
    "Robonity is the premier community for robotics creators, engineers, and hobbyists. Share projects, collaborate on forums, and join events.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Robonity | Robotics Community",
    description: "Join the future of robotics. Build, share, and learn with Robonity.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
