export const componentCode = `import "./floating-newsletter-button.css";

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

/* floating-newsletter-button.css */
.floating-newsletter-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 9999px;
  background: #0d0f12;
  padding: 18px 34px;
  color: #f5f5f7;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -.3px;
  cursor: pointer;
  transition:
    box-shadow 420ms cubic-bezier(.22, 1, .36, 1);
}

.floating-newsletter-button__content {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: transform 420ms cubic-bezier(.22, 1, .36, 1);
}

.floating-newsletter-button__arrow {
  width: 14px;
  height: 22px;
  flex: none;
}

.floating-newsletter-button:hover,
.floating-newsletter-button:focus-visible {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, .05),
    0 0 26px rgba(255, 255, 255, .13),
    0 22px 34px rgba(0, 0, 0, .32);
}

.floating-newsletter-button:hover .floating-newsletter-button__content,
.floating-newsletter-button:focus-visible .floating-newsletter-button__content {
  transform: scale(1.04);
}

.floating-newsletter-button:active .floating-newsletter-button__content {
  transform: scale(1.01);
}

.floating-newsletter-button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, .85);
  outline-offset: 5px;
}

@media (max-width: 420px) {
  .floating-newsletter-button {
    padding: 14px 26px;
    font-size: 15px;
  }

  .floating-newsletter-button__content {
    gap: 8px;
  }

  .floating-newsletter-button__arrow {
    width: 12px;
    height: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-newsletter-button,
  .floating-newsletter-button__content {
    transition-duration: .01ms;
  }
}`;

export const tailwindCode = `export function FloatingNewsletterButton() {
  return (
    <button
      type="button"
      className="group inline-flex cursor-pointer items-center justify-center rounded-full border-0 bg-[#0d0f12] px-[34px] py-[18px] text-[17px] font-normal leading-[1.2] tracking-[-.3px] text-[#f5f5f7] transition-shadow duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,.05),0_0_26px_rgba(255,255,255,.13),0_22px_34px_rgba(0,0,0,.32)] focus-visible:shadow-[0_0_0_1px_rgba(255,255,255,.05),0_0_26px_rgba(255,255,255,.13),0_22px_34px_rgba(0,0,0,.32)] focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-white/85 motion-reduce:duration-[.01ms] max-[420px]:px-[26px] max-[420px]:py-[14px] max-[420px]:text-[15px]"
    >
      <span className="inline-flex items-center gap-2.5 transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04] group-active:scale-[1.01] motion-reduce:duration-[.01ms] max-[420px]:gap-2">
        <span>Newsletter</span>
        <svg className="h-[22px] w-[14px] flex-none max-[420px]:h-5 max-[420px]:w-3" viewBox="0 0 20 32" fill="none" aria-hidden="true">
          <path d="M3 3 16 16 3 29" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}`;
