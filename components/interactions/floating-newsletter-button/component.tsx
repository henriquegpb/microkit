import "./styles.css";

export function FloatingNewsletterButton() {
  return (
    <button type="button" className="floating-newsletter-button">
      <span className="floating-newsletter-button__content">
        <span>Newsletter</span>
        <svg className="floating-newsletter-button__arrow" viewBox="0 0 20 32" fill="none" aria-hidden="true">
          <path d="M3 3 16 16 3 29" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
