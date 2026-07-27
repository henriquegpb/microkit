"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ProjectsArrowButton() {
  return (
    <button type="button" className="projects-arrow-button">
      <span>Projects</span>
      <span className="projects-arrow-icon" aria-hidden="true">
        <ArrowRight className="projects-arrow projects-arrow-current" size={18} strokeWidth={2.4} />
        <ArrowRight className="projects-arrow projects-arrow-incoming" size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}
