import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "fuse-undo-button",
  name: "Fuse Undo Button",
  category: "Click feedback",
  framework: "React",
  type: "Hover",
  description:
    "An archive button that turns into Undo and lights an orange fuse around its outline; the fuse holds still while you hover it, so the chance to undo only runs out once you look away.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
