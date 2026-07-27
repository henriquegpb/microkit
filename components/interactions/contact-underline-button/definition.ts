import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "contact-underline-button",
  name: "Contact Underline Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "A compact contact action whose icon turns orange while an underline draws beneath the label.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
