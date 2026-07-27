import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "expanding-contact-button",
  name: "Expanding Contact Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "A pill-shaped call-to-action with an expanding background and arrow icon, adapted from the supplied Webflow export.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
