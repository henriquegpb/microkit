import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "floating-newsletter-button",
  name: "Floating Newsletter Button",
  category: "Navigation",
  framework: "CSS",
  type: "Hover",
  description: "A compact newsletter button that scales and lifts into a soft white glow on hover.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
