import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "download-ios-button",
  name: "Download for iOS Button",
  category: "Click feedback",
  framework: "CSS",
  type: "Hover",
  description: "An outlined iOS download button whose arrow reveals without changing its width.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
