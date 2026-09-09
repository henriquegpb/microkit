"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function NextDotFillButton() {
  return (
    <button type="button" className="next-dot-fill-button">
      <span className="next-dot-fill-button__fill" aria-hidden="true" />
      <span className="next-dot-fill-button__label">Next</span>
      <span className="next-dot-fill-button__reveal" aria-hidden="true">
        Next
        <ArrowRight size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}
