import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "count-up-number",
  name: "Count Up Number",
  category: "Data display",
  framework: "React",
  type: "Scroll",
  description:
    "A stat that counts up from zero the first time it scrolls into view, easing out so the last digits settle slowly; it is sized to the finished number, so nothing around it shifts while it climbs.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
