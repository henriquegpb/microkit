import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "preview-hover-toolbar",
  name: "Preview Hover Toolbar",
  category: "Navigation",
  framework: "React",
  type: "Hover",
  description:
    "A thin empty pill that grows wider and taller off its fixed bottom edge when the surrounding preview is hovered, scaling its actions in one after another with a label above each.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
