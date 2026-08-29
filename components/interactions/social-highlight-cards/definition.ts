import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "social-highlight-cards",
  name: "Social Highlight Cards",
  category: "Navigation",
  framework: "CSS",
  type: "Hover",
  description: "Social cards with a luminous top rail, a soft brand-colored wash, and matching icons on hover.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
