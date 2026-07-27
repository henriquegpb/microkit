import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "glow-arrow-button",
  name: "Glow Arrow Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A bright CTA with a soft glow and a moving arrow on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
