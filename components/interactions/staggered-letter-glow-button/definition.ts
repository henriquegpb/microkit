import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "staggered-letter-glow-button",
  name: "Staggered Letter Glow Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "A dark pill with inward orange edge glows and a staggered per-letter upward text swap.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
