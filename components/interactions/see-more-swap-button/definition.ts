import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "see-more-swap-button",
  name: "See More Swap Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A pill button whose arrow circle swaps sides while its surface changes color.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
