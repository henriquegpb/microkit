import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "yellow-fill-preview-button",
  name: "Yellow Fill Preview Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An outlined Preview in browser button that fills with yellow from the left.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
