import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "sliding-send-button",
  name: "Sliding Send Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A bordered share pill whose label glides right as an orange send icon enters from the left.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
