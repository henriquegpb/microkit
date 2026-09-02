import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "outline-wipe-button",
  name: "Outline Wipe Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "Hollow stroked lettering that fills with orange behind a rounded bar sweeping left to right.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
