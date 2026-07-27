import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "layered-gradient-button",
  name: "Layered Gradient Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A dimensional pill with gradient text and subtly shifting layered surfaces.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
