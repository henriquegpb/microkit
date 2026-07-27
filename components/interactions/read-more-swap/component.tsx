"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ReadMoreSwap() {
  return (
    <button type="button" className="read-more-swap">
      <ArrowRight className="read-more-arrow read-more-arrow-left" size={25} strokeWidth={2.5} />
      <span>Read more</span>
      <ArrowRight className="read-more-arrow read-more-arrow-right" size={25} strokeWidth={2.5} />
    </button>
  );
}
