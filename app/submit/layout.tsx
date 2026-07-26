import type { Metadata } from "next";
import {
  OPEN_GRAPH_IMAGE,
  SITE_NAME,
  TWITTER_IMAGE,
} from "../site-metadata";

const title = "Submit a component";
const description =
  "Submit a microinteraction to MicroKit UI with its implementation code and an optional screenshot.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/submit" },
  openGraph: {
    type: "website",
    url: "/submit",
    title: `${title} | ${SITE_NAME}`,
    description,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description,
    images: [TWITTER_IMAGE],
  },
};

export default function SubmitLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
