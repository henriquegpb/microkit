"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function GetStartedCircleSwap() {
  return (
    <button type="button" className="get-started-circle-swap">
      <span className="get-started-circle-swap__label">Get started</span>
      <span className="get-started-circle-swap__circle" aria-hidden="true" />
      <span className="get-started-circle-swap__arrow" aria-hidden="true">
        <ArrowRight size={19} strokeWidth={2.4} />
      </span>
    </button>
  );
}
