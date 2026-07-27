"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ContactUnderlineButton() {
  return (
    <button type="button" className="contact-underline-button">
      <span className="contact-underline-icon" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={2.5} />
      </span>
      <span className="contact-underline-copy">
        <span>Get in touch</span>
        <span className="contact-underline-line" />
      </span>
    </button>
  );
}
