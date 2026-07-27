import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "orange-circle-fill-button",
  name: "Orange Circle Fill Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An orange outlined pill that fills from a growing circle.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
