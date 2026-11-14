import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "glide-pill-tabs",
  name: "Glide Pill Tabs",
  category: "Navigation",
  framework: "React",
  type: "Click",
  description:
    "A pill of filter tabs where the selection slides from option to option and a softer hover highlight glides behind them; when the options overflow, the row scrolls sideways to keep the chosen one in view.",
  new: true,
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
