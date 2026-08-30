import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "staggered-letter-text-swap",
  name: "Staggered Letter Text Swap",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "A surface-free text interaction with a staggered per-letter upward replacement.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
