import type { MetadataRoute } from "next";
import { interactions } from "../content/interactions/catalog";
import { FRAMEWORK_ROUTES, SITE_URL } from "./site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      // The index changes whenever a component is added, which is also the
      // only thing that changes the component list below it.
      url: `${SITE_URL}/components`,
      lastModified: updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/submit`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/sponsors`,
      lastModified: updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const frameworkRoutes: MetadataRoute.Sitemap = FRAMEWORK_ROUTES.map(
    (route) => ({
      url: `${SITE_URL}/components/${route}`,
      lastModified: updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  const componentRoutes: MetadataRoute.Sitemap = interactions.map(({ id }) => ({
    url: `${SITE_URL}/components/${id}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...frameworkRoutes, ...componentRoutes];
}
