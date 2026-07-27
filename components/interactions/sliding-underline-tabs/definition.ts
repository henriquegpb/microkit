import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "sliding-underline-tabs",
  name: "Sliding Underline Tabs",
  category: "Navigation",
  framework: "React",
  type: "Click",
  description: "A compact tab switcher with an orange underline that glides between labels.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
