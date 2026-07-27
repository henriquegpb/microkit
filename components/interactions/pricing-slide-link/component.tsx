"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function PricingSlideLink() {
  return (
    <button type="button" className="pricing-slide">
      <span className="pricing-slide-icon" aria-hidden="true">
        <ArrowRight size={23} strokeWidth={2.25} />
      </span>
      <span className="pricing-slide-label">Pricing</span>
    </button>
  );
}
