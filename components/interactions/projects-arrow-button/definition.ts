import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "projects-arrow-button",
  name: "Projects Arrow Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A Projects label paired with an outlined circular arrow that slides through itself on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
