"use client";

import "./styles.css";

export function ViewMoreTextSwap() {
  return (
    <button type="button" className="view-more-text-swap">
      <span className="view-more-text-swap-label view-more-text-swap-label-current">
        View More
      </span>
      <span
        className="view-more-text-swap-label view-more-text-swap-label-incoming"
        aria-hidden="true"
      >
        View More
      </span>
    </button>
  );
}
