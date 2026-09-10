import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "secure-purchase-button",
  name: "Secure Purchase Button",
  category: "Click feedback",
  framework: "React",
  type: "Click",
  description:
    "A purchase button that opens room for a pixel-wave loader, swaps it for a shield once the payment clears, then resets itself.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
