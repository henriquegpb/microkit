import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "gradient-underline-button",
  name: "Gradient Underline Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A label that scales up as a warm gradient underline grows across it.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
