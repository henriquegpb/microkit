import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { interactions } from "../../../content/interactions/catalog";
import { StructuredData } from "../../../components/structured-data";
import { ComponentDetailPage } from "../../page";
import { componentSchema } from "../../schema";
import {
  componentDescription,
  componentTitle,
  SITE_NAME,
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

  const title = componentTitle(item);
  const description = componentDescription(item);
  const canonical = `/components/${item.id}`;

  return {
    /*
     * `absolute` drops the "| MicroKit UI" the root template appends. With it,
     * 22 of the 44 titles on this site ran past the ~60 characters a result
     * shows; without it the longest component title is 54. On a long-tail page
     * the brand is the half worth losing — the words somebody typed are the
     * ones that have to survive the truncation.
     */
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      // No `images` here on purpose. The colocated opengraph-image.tsx renders
      // this component's own card, and an explicit list would override it and
      // put the generic site picture back on all forty-two pages.
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}

export default async function ComponentRoute({
  params,
}: ComponentRouteProps) {
  const { id } = await params;
  const item = interactions.find((interaction) => interaction.id === id);

  if (!item) notFound();

  return (
    <>
      <StructuredData schema={componentSchema(item)} />
      <ComponentDetailPage item={item} />
    </>
  );
}
