import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "progress-ring-check",
  name: "Progress Ring Check",
  category: "Click feedback",
  framework: "React",
  type: "Click",
  description:
    "A task status icon whose dashed ring closes into a spinning arc, fills to its progress, then draws a check or a cross and strikes the label through.",
  new: true,
  dependency: "motion",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
