"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function GlowArrowButton() {
  return <button type="button" className="glow-arrow-button"><span>Get Started</span><ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} /></button>;
}
