import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "hover-glide-cards",
  name: "Hover Glide Cards",
  category: "Navigation",
  framework: "React",
  type: "Hover",
  description:
    "One highlight glides from card to card under the pointer, seen only through the cards themselves, so it drains out of one and fills the next.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
