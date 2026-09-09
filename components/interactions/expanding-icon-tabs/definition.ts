import type { Interaction } from "@/content/interactions/types";
import { componentCode, tailwindCode } from "./source";

export const definition = {
  id: "expanding-icon-tabs",
  name: "Expanding Icon Tabs",
  category: "Navigation",
  framework: "React",
  type: "Click",
  description:
    "An icon bar where the chosen tab widens to reveal its label and the rest of the row slides over to make room.",
  new: true,
  dependency: "lucide-react",
  code: componentCode,
  tailwindCode,
} satisfies Interaction;
