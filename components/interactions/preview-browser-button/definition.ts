import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "preview-browser-button",
  name: "Preview in Browser Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An outlined pill button with a diagonal arrow that slides through on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
