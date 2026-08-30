"use client";

import "./styles.css";

import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterTextSwap() {
  return (
    <button type="button" className="staggered-letter-text-swap" aria-label={LABEL}>
      <span className="staggered-letter-text-swap__label" aria-hidden="true">
        {LABEL.split("").map((letter, index) => (
          <span
            className="staggered-letter-text-swap__letter"
            style={{ "--letter-delay": `${index * 34}ms` } as CSSProperties}
            key={`${letter}-${index}`}
          >
            <span className="staggered-letter-text-swap__current">{letter}</span>
            <span className="staggered-letter-text-swap__incoming">{letter}</span>
          </span>
        ))}
      </span>
    </button>
  );
}
