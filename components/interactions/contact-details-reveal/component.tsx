"use client";

import "./styles.css";

export function ContactDetailsReveal() {
  return (
    <button type="button" className="contact-details-reveal">
      <span className="contact-details-reveal__dot" aria-hidden="true" />
      <span className="contact-details-reveal__content">
        <span className="contact-details-reveal__title">Contact us</span>
        <span className="contact-details-reveal__detail">hello@contactus.com</span>
      </span>
    </button>
  );
}
