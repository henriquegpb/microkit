import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "inset-circle-button",
  name: "Inset Circle Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A circular project CTA that reveals its dark base as the inset surface collapses.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
