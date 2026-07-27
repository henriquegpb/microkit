"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ContactRevealButton() {
  return (
    <button type="button" className="contact-reveal">
      <span className="contact-reveal-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span>Get in touch</span>
    </button>
  );
}
