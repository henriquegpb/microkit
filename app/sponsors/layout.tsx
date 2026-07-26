import type { Metadata } from "next";
import {
  OPEN_GRAPH_IMAGE,
  SITE_NAME,
  TWITTER_IMAGE,
} from "../site-metadata";

const title = "Sponsors";
const description =
  "Support MicroKit UI and help keep copy-paste microinteractions available to developers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/sponsors" },
  openGraph: {
    type: "website",
    url: "/sponsors",
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

export default function SponsorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
