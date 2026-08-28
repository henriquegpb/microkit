import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "cursor-edge-glow-button",
  name: "Cursor Edge Glow Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description: "A spring-tracked pill light with mirrored edge glows that crossfade as the pointer changes sides.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
