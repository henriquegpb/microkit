/**
 * The interaction registry powers the gallery and playground.
 *
 * Add a new interaction here first. Keep preview implementations in the UI
 * layer until they are mature enough to graduate to a standalone component.
 */
export type Interaction = {
  id: string;
  name: string;
  category: string;
  framework: "React" | "CSS";
  type: string;
  description: string;
  new?: boolean;
  dependency?: string;
  code: string;
};

export const interactions: Interaction[] = [
  { id: "magnetic-button", name: "Magnetic Button", category: "Buttons", framework: "React", type: "Hover", description: "A button that gently follows the cursor.", new: true, code: "<MagneticButton strength={0.24}>\n  Get started\n</MagneticButton>" },
  { id: "press-button", name: "Press Feedback", category: "Buttons", framework: "CSS", type: "Click", description: "Tactile, springy feedback for primary actions.", code: ".button:active { transform: scale(.96); }" },
  { id: "tilt-card", name: "Tilt Card", category: "Cards", framework: "React", type: "Hover", description: "A card that responds to pointer position.", code: "<TiltCard maxTilt={8}>\n  <CardContent />\n</TiltCard>" },
  { id: "focus-input", name: "Focus Field", category: "Inputs", framework: "CSS", type: "Focus", description: "An input with a clean animated focus treatment.", code: "input:focus {\n  border-color: #F97316;\n  box-shadow: 0 0 0 3px #f9731622;\n}" },
  { id: "nav-indicator", name: "Nav Indicator", category: "Navigation", framework: "React", type: "Click", description: "Animated active state for compact navigation.", code: "<NavIndicator items={['Overview', 'Activity', 'Settings']} />" },
  { id: "dots-loader", name: "Dots Loader", category: "Loading", framework: "CSS", type: "Loop", description: "Three staggered dots for quick loading states.", code: "<DotsLoader size={6} delay={120} />" },
  { id: "shine-border", name: "Shine Border", category: "Hover effects", framework: "CSS", type: "Hover", description: "A low-key sweep of light across an outline.", code: "<ShineBorder duration={1.6}>\n  <Card />\n</ShineBorder>" },
  { id: "switch-toggle", name: "Spring Toggle", category: "Toggles", framework: "React", type: "Click", description: "A responsive toggle with a light spring transition.", new: true, code: "<SpringToggle checked={enabled} onChange={setEnabled} />" },
  { id: "context-menu", name: "Context Menu", category: "Menus", framework: "React", type: "Click", description: "A compact context menu with keyboard support.", code: "<ContextMenu items={actions}>\n  <FileRow />\n</ContextMenu>" },
  { id: "smart-tooltip", name: "Smart Tooltip", category: "Tooltips", framework: "React", type: "Hover", description: "A helpful tooltip with a short entry delay.", code: "<Tooltip label=\"Copy to clipboard\">\n  <CopyButton />\n</Tooltip>" },
  { id: "split-text", name: "Split Text", category: "Text effects", framework: "CSS", type: "Enter", description: "A staggered reveal for short interface copy.", code: "<SplitText delay={45}>Ship with confidence</SplitText>" },
  { id: "swipe-row", name: "Swipe Row", category: "Mobile gestures", framework: "React", type: "Drag", description: "A touch-first action row with swipe affordance.", dependency: "motion", code: "<SwipeRow actions={['Archive', 'Delete']}>\n  <Message />\n</SwipeRow>" },
];

export const categories = [
  "All", "Buttons", "Cards", "Inputs", "Navigation", "Loading", "Hover effects",
  "Click feedback", "Toggles", "Menus", "Tooltips", "Text effects", "Page transitions", "Mobile gestures",
];
