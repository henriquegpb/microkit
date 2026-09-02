import type { Metadata } from "next";
import { StructuredData } from "../../components/structured-data";
import { ComponentsIndexPage } from "../page";
import { componentsIndexSchema } from "../schema";
import {
  COMPONENTS_INDEX_DESCRIPTION,
  COMPONENTS_INDEX_TITLE,
  OPEN_GRAPH_IMAGE,
  SITE_NAME,
  TWITTER_IMAGE,
} from "../site-metadata";

/**
 * The index sits at `/components`, the parent of the routes it links to, so a
 * crawler walking the path finds a page rather than a 404.
 */
export const metadata: Metadata = {
  title: COMPONENTS_INDEX_TITLE,
  description: COMPONENTS_INDEX_DESCRIPTION,
  alternates: { canonical: "/components" },
  openGraph: {
    type: "website",
    url: "/components",
    title: `${COMPONENTS_INDEX_TITLE} | ${SITE_NAME}`,
    description: COMPONENTS_INDEX_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPONENTS_INDEX_TITLE} | ${SITE_NAME}`,
    description: COMPONENTS_INDEX_DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
};

export default function ComponentsRoute() {
  return (
    <>
      <StructuredData schema={componentsIndexSchema} />
      <ComponentsIndexPage />
    </>
  );
}
