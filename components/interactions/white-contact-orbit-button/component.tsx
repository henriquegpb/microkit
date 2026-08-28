"use client";

import { ArrowRight } from "lucide-react";
import "./styles.css";

export function WhiteContactOrbitButton() {
  return (
    <button type="button" className="white-contact-orbit-button">
      <span className="white-contact-orbit-button-label">Get in touch</span>
      <span className="white-contact-orbit-button-icon" aria-hidden="true">
        <span className="white-contact-orbit-button-icon-surface" />
        <ArrowRight size={21} strokeWidth={2.6} />
      </span>
    </button>
  );
}
