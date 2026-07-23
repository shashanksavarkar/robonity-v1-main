import NewsletterClient from "./NewsletterClient";

export const metadata = {
  title: "Newsletter",
  description: "Sign up for the Robonity newsletter to get the latest news, project highlights, and tutorials.",
  alternates: { canonical: "/newsletter" },
  openGraph: {
    title: "Newsletter | Robonity",
    description: "Sign up for the Robonity newsletter to get the latest news, project highlights, and tutorials.",
    url: "/newsletter",
  },
};

export default function NewsletterPage() {
  return <NewsletterClient />;
}
