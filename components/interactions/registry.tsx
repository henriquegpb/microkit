"use client";

import type { ComponentType } from "react";
import { FocusField } from "./focus-input/component";
import { ExpandingContactButton } from "./expanding-contact-button/component";
import { ContactRevealButton } from "./contact-reveal-button/component";
import { SubscribeShineButton } from "./subscribe-shine-button/component";
import { NextRevealButton } from "./next-reveal-button/component";
import { PricingSlideLink } from "./pricing-slide-link/component";
import { SpotlightIndicator } from "./spotlight-indicator/component";
import { ReadMoreSwap } from "./read-more-swap/component";
import { ProjectsArrowButton } from "./projects-arrow-button/component";
import { WhatsNewGlowButton } from "./whats-new-glow-button/component";
import { PreviewInBrowserButton } from "./preview-browser-button/component";
import { DownloadIOSButton } from "./download-ios-button/component";
import { MagneticFillButton } from "./magnetic-fill-button/component";
import { ProjectTextSwapButton } from "./project-text-swap-button/component";
import { ViewMoreTextSwap } from "./view-more-text-swap/component";
import { GradientUnderlineButton } from "./gradient-underline-button/component";
import { YellowFillPreviewButton } from "./yellow-fill-preview-button/component";
import { CircleSurfaceButton } from "./circle-surface-button/component";
import { InsetCircleButton } from "./inset-circle-button/component";
import { SlidingArrowLabel } from "./sliding-arrow-label/component";
import { OrangeCircleFillButton } from "./orange-circle-fill-button/component";
import { LayeredGradientButton } from "./layered-gradient-button/component";
import { GlowArrowButton } from "./glow-arrow-button/component";
import { TalkArrowRevealButton } from "./talk-arrow-reveal-button/component";
import { SeeMoreSwapButton } from "./see-more-swap-button/component";
import { NeonInvertButton } from "./neon-invert-button/component";
import { ContactUnderlineButton } from "./contact-underline-button/component";

const interactionComponents: Record<string, ComponentType> = {
  "focus-input": FocusField,
  "expanding-contact-button": ExpandingContactButton,
  "contact-reveal-button": ContactRevealButton,
  "subscribe-shine-button": SubscribeShineButton,
  "next-reveal-button": NextRevealButton,
  "pricing-slide-link": PricingSlideLink,
  "spotlight-indicator": SpotlightIndicator,
  "read-more-swap": ReadMoreSwap,
  "projects-arrow-button": ProjectsArrowButton,
  "whats-new-glow-button": WhatsNewGlowButton,
  "preview-browser-button": PreviewInBrowserButton,
  "download-ios-button": DownloadIOSButton,
  "magnetic-fill-button": MagneticFillButton,
  "project-text-swap-button": ProjectTextSwapButton,
  "view-more-text-swap": ViewMoreTextSwap,
  "gradient-underline-button": GradientUnderlineButton,
  "yellow-fill-preview-button": YellowFillPreviewButton,
  "circle-surface-button": CircleSurfaceButton,
  "inset-circle-button": InsetCircleButton,
  "sliding-arrow-label": SlidingArrowLabel,
  "orange-circle-fill-button": OrangeCircleFillButton,
  "layered-gradient-button": LayeredGradientButton,
  "glow-arrow-button": GlowArrowButton,
  "talk-arrow-reveal-button": TalkArrowRevealButton,
  "see-more-swap-button": SeeMoreSwapButton,
  "neon-invert-button": NeonInvertButton,
  "contact-underline-button": ContactUnderlineButton,
};

export function InteractionPreview({ id }: { id: string }) {
  const Component = interactionComponents[id];
  return Component ? <Component /> : null;
}
