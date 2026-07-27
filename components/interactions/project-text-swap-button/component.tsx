"use client";

import "./styles.css";

export function ProjectTextSwapButton() {
  return (
    <button type="button" className="project-text-swap-button">
      <span className="project-text-swap-label project-text-swap-label-current">
        Start a Project
      </span>
      <span
        className="project-text-swap-label project-text-swap-label-incoming"
        aria-hidden="true"
      >
        Start a Project
      </span>
    </button>
  );
}
