"use client";

import "./styles.css";

import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", `${position}%`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--glow-x", "50%");
  };

  return (
    <button type="button" className="whats-new-button" onPointerMove={updateGlow} onPointerLeave={resetGlow}>
      <span className="whats-new-content">
        <ArrowRight size={16} strokeWidth={2.5} />
        {"What's new"}
      </span>
      <span className="whats-new-glow whats-new-glow-orange" aria-hidden="true" />
      <span className="whats-new-glow whats-new-glow-blue" aria-hidden="true" />
    </button>
  );
}
