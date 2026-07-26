import type { MetadataRoute } from "next";
import { interactions } from "../content/interactions/catalog";
import { SITE_URL } from "./site-metadata";

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

  const componentRoutes: MetadataRoute.Sitemap = interactions.map(({ id }) => ({
    url: `${SITE_URL}/components/${id}`,
    lastModified: updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...componentRoutes];
}
