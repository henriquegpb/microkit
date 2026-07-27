import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "view-more-text-swap",
  name: "View More Text Swap",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A borderless View More label that swaps vertically on hover.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
