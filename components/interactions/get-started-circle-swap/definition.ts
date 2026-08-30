import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "get-started-circle-swap",
  name: "Get Started Circle Swap",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A bordered CTA whose orange circle exits right as a directional arrow slides into place.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
