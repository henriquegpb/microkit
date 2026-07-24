"use client";

import { useParams } from "next/navigation";
import { interactions } from "../../../content/interactions/catalog";
import { ComponentDetailPage } from "../../page";

export default function ComponentRoute() {
  const { id } = useParams<{ id: string }>();
  const item = interactions.find(interaction => interaction.id === id);

  if (!item) return <main className="not-found"><h1>Component not found</h1><a href="/">Back to all components</a></main>;
  return <ComponentDetailPage item={item} />;
}
