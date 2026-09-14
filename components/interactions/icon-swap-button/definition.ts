import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "icon-swap-button",
  name: "Icon Swap Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A leading icon slides out as an arrow opens in to take its place, trading without changing the button's width.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
