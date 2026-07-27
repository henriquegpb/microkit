import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "spotlight-indicator",
  name: "Spotlight Indicator",
  category: "Navigation",
  framework: "React",
  type: "Click",
  description: "A glowing rail that slides to the active item in a vertical nav — the same indicator powering this site's sidebar.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
