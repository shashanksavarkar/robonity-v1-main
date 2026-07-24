import GalleryClient from "./GalleryClient";
import { galleryData } from "../../data/gallery";

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

export default function GalleryPage() {
  return <GalleryClient gallery={galleryData} />;
}
