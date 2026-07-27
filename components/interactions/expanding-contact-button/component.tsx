"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button type="button" className="contact-pill">
      <span className="contact-pill-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span>Get in touch</span>
    </button>
  );
}
