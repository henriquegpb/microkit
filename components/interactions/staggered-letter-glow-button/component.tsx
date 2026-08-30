"use client";

import "./styles.css";

import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterGlowButton() {
  return (
    <button type="button" className="staggered-letter-glow-button" aria-label={LABEL}>
      <span className="staggered-letter-glow-button__label" aria-hidden="true">
        {LABEL.split("").map((letter, index) => (
          <span
            className="staggered-letter-glow-button__letter"
            style={{ "--letter-delay": `${index * 34}ms` } as CSSProperties}
            key={`${letter}-${index}`}
          >
            <span className="staggered-letter-glow-button__current">{letter}</span>
            <span className="staggered-letter-glow-button__incoming">{letter}</span>
          </span>
        ))}
      </span>
    </button>
  );
}
