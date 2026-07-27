import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "neon-invert-button",
  name: "Neon Invert Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A bold orange CTA that inverts into a dark, softly glowing surface on hover.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
