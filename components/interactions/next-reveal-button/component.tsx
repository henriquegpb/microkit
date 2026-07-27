"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button type="button" className="next-reveal">
      <span className="next-reveal-label">Next</span>
      <ArrowRight className="next-reveal-arrow" size={27} strokeWidth={1.7} />
    </button>
  );
}
