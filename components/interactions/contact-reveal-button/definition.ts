import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "contact-reveal-button",
  name: "Contact Reveal Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A circular arrow and label that resolve into a polished contact pill on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
