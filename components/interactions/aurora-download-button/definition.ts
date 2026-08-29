import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "aurora-download-button",
  name: "Aurora Download Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A layered blue download button with a luminous rim, directional shadow, and blended hover bloom.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
