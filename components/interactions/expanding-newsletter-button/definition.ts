import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "expanding-newsletter-button",
  name: "Expanding Newsletter Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An orange newsletter pill with a growing dark circle and an arrow that slides in from the left.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
