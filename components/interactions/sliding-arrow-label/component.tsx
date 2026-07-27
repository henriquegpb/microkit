"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function SlidingArrowLabel() {
  return <button type="button" className="sliding-arrow-label"><span className="sliding-arrow-label-copy">Create a blog</span><span className="sliding-arrow-label-icon" aria-hidden="true"><ArrowRight size={16} strokeWidth={2.4} /></span></button>;
}
