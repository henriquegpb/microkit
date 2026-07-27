import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "sliding-arrow-label",
  name: "Sliding Arrow Label",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A text label that gets a bright surface while an arrow slides in beside it.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
