import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "sliding-content-tabs",
  name: "Sliding Content Tabs",
  category: "Navigation",
  framework: "React",
  type: "Click",
  description: "A compact tab switcher with a sliding active surface and content transition.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
