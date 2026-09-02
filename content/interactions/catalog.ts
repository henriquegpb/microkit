import { interactionDefinitions } from "@/components/interactions/definitions";
import type { Interaction } from "./types";

export type { Interaction } from "./types";
export { interactionDefinitions as interactions } from "@/components/interactions/definitions";

export const categories = ["All", "Inputs", "Navigation"];

/**
 * The catalog grouped by category, in the order the catalog introduces each
 * one.
 *
 * Derived rather than written down: the `/components` index renders these
 * groups and its CollectionPage schema numbers them, so a hand-maintained list
 * would be a second place for the forty-third interaction to be forgotten.
 */
export const componentsByCategory: { category: string; items: Interaction[] }[] =
  [...new Set(interactionDefinitions.map((item) => item.category))].map(
    (category) => ({
      category,
      items: interactionDefinitions.filter((item) => item.category === category),
    }),
  );
