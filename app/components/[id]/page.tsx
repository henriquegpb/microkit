import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { interactions } from "../../../content/interactions/catalog";
import { ComponentDetailPage } from "../../page";
import {
  OPEN_GRAPH_IMAGE,
  SITE_NAME,
  TWITTER_IMAGE,
} from "../../site-metadata";

type ComponentRouteProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return interactions.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: ComponentRouteProps): Promise<Metadata> {
  const { id } = await params;
  const item = interactions.find((interaction) => interaction.id === id);

  if (!item) {
    return {
      title: "Component not found",
      robots: { index: false, follow: false },
    };
  }

  const title = item.name;
  const description = `${item.description} Copy the JavaScript, TypeScript, CSS, or Tailwind implementation from MicroKit UI.`;
  const canonical = `/components/${item.id}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
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
}

export default async function ComponentRoute({
  params,
}: ComponentRouteProps) {
  const { id } = await params;
  const item = interactions.find((interaction) => interaction.id === id);

  if (!item) notFound();

  return <ComponentDetailPage item={item} />;
}
