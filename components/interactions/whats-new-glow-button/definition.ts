import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "whats-new-glow-button",
  name: "What's New Glow Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A dark, fully rounded button whose orange and blue glows follow the cursor.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
