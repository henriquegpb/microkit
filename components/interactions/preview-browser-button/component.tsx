"use client";

import "./styles.css";

import { ArrowRight } from "lucide-react";

export function PreviewInBrowserButton() {
  return (
    <button type="button" className="preview-browser-button">
      <span>Preview in browser</span>
      <span className="preview-browser-icon" aria-hidden="true">
        <ArrowRight className="preview-browser-arrow preview-browser-arrow-current" size={17} strokeWidth={2.4} />
        <ArrowRight className="preview-browser-arrow preview-browser-arrow-incoming" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}
