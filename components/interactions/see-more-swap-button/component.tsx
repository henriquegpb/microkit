"use client";

import "./styles.css";

import { ArrowDown } from "lucide-react";

export function SeeMoreSwapButton() {
  return (
    <button type="button" className="see-more-swap-button">
      <span className="see-more-swap-content">
        <span className="see-more-swap-icon see-more-swap-icon-left" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
        <span className="see-more-swap-label">See more</span>
        <span className="see-more-swap-icon see-more-swap-icon-right" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}
