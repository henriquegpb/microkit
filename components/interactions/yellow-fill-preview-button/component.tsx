"use client";

import "./styles.css";

export function YellowFillPreviewButton() {
  return (
    <button type="button" className="yellow-fill-preview-button">
      <span className="yellow-fill-preview-button-label">Preview in browser</span>
      <span className="yellow-fill-preview-button-fill" aria-hidden="true" />
    </button>
  );
}
