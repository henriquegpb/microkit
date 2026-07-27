"use client";

import "./styles.css";

export function SubscribeShineButton() {
  return (
    <button type="button" className="subscribe-shine">
      <span className="subscribe-shine-gradient" aria-hidden="true" />
      <span className="subscribe-shine-inner">Subscribe</span>
    </button>
  );
}
