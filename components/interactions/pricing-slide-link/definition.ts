import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "pricing-slide-link",
  name: "Pricing Slide Link",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A text link whose arrow slides in from the left as the label settles into place.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
