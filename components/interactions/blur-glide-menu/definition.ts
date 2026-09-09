import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "blur-glide-menu",
  name: "Blur Glide Menu",
  category: "Navigation",
  framework: "React",
  type: "Click",
  description:
    "A nested menu whose steps blur before they glide aside, while the surface animates to the height of the step arriving.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
