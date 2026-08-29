import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "cursor-follow-share-button",
  name: "Cursor Follow Share Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "A dark share pill with a glowing send orb that tracks the pointer and a looping upward text swap.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
