"use client";

import "./styles.css";

// Non-breaking padding so the wipe bar has room to rest inside the word.
const LABEL = "\u00A0MicroKit\u00A0";

export function OutlineWipeButton() {
  return (
    <button type="button" className="outline-wipe-button" aria-label="MicroKit">
      <span className="outline-wipe-button__base" aria-hidden="true">{LABEL}</span>
      <span className="outline-wipe-button__hover" aria-hidden="true">{LABEL}</span>
      <span className="outline-wipe-button__edge" aria-hidden="true" />
    </button>
  );
}
