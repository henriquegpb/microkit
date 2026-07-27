"use client";

import "./styles.css";

export function GradientUnderlineButton() {
  return (
    <button type="button" className="gradient-underline-button">
      <span className="gradient-underline-button-label">HOVER ME</span>
      <span className="gradient-underline-button-line" aria-hidden="true" />
    </button>
  );
}
