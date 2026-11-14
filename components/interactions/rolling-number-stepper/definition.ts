import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "rolling-number-stepper",
  name: "Rolling Number Stepper",
  category: "Inputs",
  framework: "React",
  type: "Click",
  description:
    "A minus and plus stepper where only the digits that change roll, up on the way up and down on the way down, and a digit that appears or disappears opens or closes its column; holding a button keeps stepping.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
