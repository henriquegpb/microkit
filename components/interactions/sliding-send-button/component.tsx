"use client";

import "./styles.css";

export function SlidingSendButton() {
  return (
    <button type="button" className="sliding-send-button">
      <span className="sliding-send-button__content">
        <span className="sliding-send-button__label">Share it now</span>
        <span className="sliding-send-button__icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none">
            <path d="M28.14 4.94 19.6 27.72c-.4 1.06-1.87 1.1-2.33.06l-4.04-9.05-9.03-4.02c-1.04-.46-1-1.93.06-2.33L27.04 3.86c.74-.28 1.38.34 1.1 1.08Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="m13.02 18.63 5.75-5.75" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </button>
  );
}
