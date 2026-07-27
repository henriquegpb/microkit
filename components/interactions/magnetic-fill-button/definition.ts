import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "magnetic-fill-button",
  name: "Magnetic Fill Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "A magnetic pill button with a bottom-to-top background fill.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
