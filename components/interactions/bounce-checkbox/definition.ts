import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "bounce-checkbox",
  name: "Bounce Checkbox",
  category: "Inputs",
  framework: "React",
  type: "Click",
  description:
    "A checkbox whose fill springs out past the box with a little swell, draws its tick, then strikes the label through and dims it.",
  new: true,
  dependency: "motion",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
