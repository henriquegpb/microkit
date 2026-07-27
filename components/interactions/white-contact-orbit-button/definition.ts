import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "white-contact-orbit-button",
  name: "White Contact Orbit Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A white Get in touch pill whose arrow settles into a black circular control on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
