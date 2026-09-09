import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "next-dot-fill-button",
  name: "Next Dot Fill Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A bordered pill whose leading dot expands into a solid fill while the label swaps for an arrow cue.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
