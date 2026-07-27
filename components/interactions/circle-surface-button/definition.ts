import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "circle-surface-button",
  name: "Circle Surface Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A circular CTA whose dark surface expands into an orange fill.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
