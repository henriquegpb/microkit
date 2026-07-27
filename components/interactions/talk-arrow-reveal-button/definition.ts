import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "talk-arrow-reveal-button",
  name: "Talk Arrow Reveal Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An outlined Talk to us pill that fills with orange and reveals a long arrow.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
