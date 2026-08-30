import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "contact-details-reveal",
  name: "Contact Details Reveal",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A compact white contact label that shifts upward to reveal muted contact details with an orange accent.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
