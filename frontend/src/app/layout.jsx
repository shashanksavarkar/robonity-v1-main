import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://robonity-v1-main.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Robonity | Robotics & Engg. Domain",
    template: "%s | Robonity",
  },
  description:
    "Robonity is the premier community for robotics creators, engineers, and hobbyists. Share projects, collaborate on forums, and join events.",
  keywords: ["Robotics", "Engineering", "Community", "Projects", "Forum", "Hackathons", "Tech"],
  manifest: "/manifest.json",
  openGraph: {
    siteName: "Robonity",
    title: "Robonity | Robotics Community",
    description: "Join the future of robotics. Build, share, and learn with Robonity.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/RED_Logo.jpg", width: 1200, height: 1200, alt: "Robonity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robonity | Robotics Community",
    description: "Join the future of robotics. Build, share, and learn with Robonity.",
    images: ["/RED_Logo.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport = {
  themeColor: "#1f2937",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Robonity",
      "url": SITE_URL,
      "logo": `${SITE_URL}/icon.svg`,
      "sameAs": [
        "https://github.com/technocratsgsv",
        "https://www.linkedin.com/company/technocrats-gsv/",
        "https://www.instagram.com/technocrats.gsv/",
      ],
    },
    {
      "@type": "WebSite",
      "name": "Robonity",
      "url": SITE_URL,
      "description":
        "Robonity is the premier community for robotics creators, engineers, and hobbyists. Share projects, collaborate on forums, and join events.",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
