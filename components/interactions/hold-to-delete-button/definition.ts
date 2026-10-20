import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "hold-to-delete-button",
  name: "Hold to Delete Button",
  category: "Click feedback",
  framework: "React",
  type: "Click",
  description:
    "A delete button that only fires when held: an orange bar fills linearly from left to right as a matching glow builds behind it, snapping back if you let go early and landing on a check with a pulse once it completes.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
