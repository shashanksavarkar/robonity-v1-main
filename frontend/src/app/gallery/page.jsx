import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Gallery",
  description: "Photos from Robonity workshops, inductions, and RoboSoccer events.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Robonity",
    description: "Photos from Robonity workshops, inductions, and RoboSoccer events.",
    url: "/gallery",
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function getGallery() {
  try {
    const res = await fetch(`${API_URL}/api/gallery`, { cache: "no-store" });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch gallery", error);
    return [];
  }
}

export default async function GalleryPage() {
  const gallery = await getGallery();
  return <GalleryClient gallery={gallery} />;
}
