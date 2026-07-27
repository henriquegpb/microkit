import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "subscribe-shine-button",
  name: "Subscribe Shine Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A dark subscribe pill with a rotating highlight that traces its edge on hover.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
