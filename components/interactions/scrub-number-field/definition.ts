import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "scrub-number-field",
  name: "Scrub Number Field",
  category: "Inputs",
  framework: "React",
  type: "Drag",
  description: "A number field you drag to scrub and click to type, with a ruler that tracks the gesture.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
