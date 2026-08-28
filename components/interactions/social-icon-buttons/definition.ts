import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "social-icon-buttons",
  name: "Social Icon Buttons",
  category: "Navigation",
  framework: "CSS",
  type: "Hover",
  description: "Circular social links that trade their icon for a brand-colored arrow and glow on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
