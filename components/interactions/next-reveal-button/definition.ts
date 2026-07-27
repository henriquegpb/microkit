import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "next-reveal-button",
  name: "Next Reveal Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An outlined arrow control that expands into a bright Next button on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
