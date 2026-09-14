"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

/*
 * The glyph the button leads with. Nothing here is Apple-specific beyond the
 * path — swap in any 1:1 mark and the interaction is unchanged, which is the
 * point of the component. See `styles.css` for why it is nudged up 2px.
 */
function AppleMark() {
  return (
    <svg className="icon-swap-icon" width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M13.5621 5.45739C13.4857 5.50195 11.6671 6.44248 11.6671 8.52785C11.7528 10.9061 13.9621 11.7401 14 11.7401C13.9621 11.7847 13.6665 12.8763 12.7907 14.0205C12.0956 15.0062 11.3242 16 10.1528 16C9.0385 16 8.6385 15.3431 7.35278 15.3431C5.97203 15.3431 5.58135 16 4.5242 16C3.35277 16 2.52419 14.953 1.79127 13.9766C.839096 12.6986.0297778 10.6931.00120634 8.76747C-.0180484 7.74707.19189 6.74403.72481 5.89206C1.47699 4.70265 2.81985 3.89524 4.28631 3.86862C5.40992 3.83331 6.40992 4.58747 7.09563 4.58747C7.75278 4.58747 8.98135 3.86862 10.3714 3.86862C10.9714 3.86919 12.5714 4.03762 13.5621 5.45739ZM7.0006 3.66488C6.8006 2.73303 7.35278 1.80119 7.86706 1.20677C8.52421.487918 9.5621 0 10.4571 0C10.5143.931848 10.1522 1.84575 9.50496 2.51136C8.92421 3.23021 7.92421 3.77138 7.0006 3.66488Z" fill="currentColor" />
    </svg>
  );
}

export function IconSwapButton() {
  return (
    <button type="button" className="icon-swap-button">
      <span className="icon-swap-content">
        <AppleMark />
        <span className="icon-swap-label">Download for iOS</span>
        <span className="icon-swap-arrow" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}
