export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://robonity-v1-main.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/forum", "/roboshare"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
