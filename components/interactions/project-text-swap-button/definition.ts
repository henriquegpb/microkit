import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "project-text-swap-button",
  name: "Project Text Swap Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An outlined pill whose duplicated label swaps vertically on hover.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
