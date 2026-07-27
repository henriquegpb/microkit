import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "read-more-swap",
  name: "Read More Swap",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A text link whose arrow swaps from the right side to an orange leading arrow on hover.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
