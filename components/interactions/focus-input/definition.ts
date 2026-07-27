import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "focus-input",
  name: "Focus Field",
  category: "Inputs",
  framework: "CSS",
  type: "Focus",
  description: "An input with a clean animated focus treatment.",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
