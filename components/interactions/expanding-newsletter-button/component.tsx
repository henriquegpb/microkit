import "./styles.css";

import { ArrowRight } from "lucide-react";

export function ExpandingNewsletterButton() {
  return (
    <button type="button" className="expanding-newsletter-button">
      <span className="expanding-newsletter-button__circle" aria-hidden="true">
        <ArrowRight size={15} strokeWidth={2.5} />
      </span>
      <span className="expanding-newsletter-button__label">Newsletter</span>
    </button>
  );
}
