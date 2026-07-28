export const componentCode = `import { ArrowRight } from "lucide-react";

export function ContactUnderlineButton() {
  return (
    <button type="button" className="contact-underline-button">
      <span className="contact-underline-icon" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={2.5} />
      </span>
      <span className="contact-underline-copy">
        <span>Get in touch</span>
        <span className="contact-underline-line" />
      </span>
    </button>
  );
}

/* contact-underline-button.css */
.contact-underline-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0 16px 0 0;
  color: #f0f0f0;
  font: inherit;
  cursor: pointer;
}
.contact-underline-icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 32px;
  height: 32px;
  flex: none;
  place-items: center;
  border-radius: 8px;
  background: #f0f0f0;
  color: #000;
  transition: background-color .54s cubic-bezier(.16, 1, .3, 1);
}
.contact-underline-icon svg {
  transition: transform .54s cubic-bezier(.16, 1, .3, 1);
}
.contact-underline-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
}
.contact-underline-copy > span:first-child {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
}
.contact-underline-line {
  width: 100%;
  height: 1px;
  background: #f0f0f0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform .54s cubic-bezier(.16, 1, .3, 1);
}
.contact-underline-button:hover .contact-underline-icon,
.contact-underline-button:focus-visible .contact-underline-icon {
  background: #f97316;
}
.contact-underline-button:hover .contact-underline-icon svg,
.contact-underline-button:focus-visible .contact-underline-icon svg {
  transform: scale(1.35);
}
.contact-underline-button:hover .contact-underline-line,
.contact-underline-button:focus-visible .contact-underline-line {
  transform: scaleX(1);
}
.contact-underline-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function ContactUnderlineButton() {
  return (
    <button type="button" className="group inline-flex cursor-pointer appearance-none items-center justify-start gap-2 overflow-hidden border-0 bg-transparent p-0 pr-4 font-[inherit] text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]">
      <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-lg bg-[#f0f0f0] text-black transition-colors duration-[540ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:bg-[#f97316] group-focus-visible:bg-[#f97316]" aria-hidden="true">
        <ArrowRight className="transition-transform duration-[540ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.35] group-focus-visible:scale-[1.35]" size={16} strokeWidth={2.5} />
      </span>
      <span className="flex flex-col justify-between gap-1 py-2">
        <span className="relative z-10 text-base font-medium leading-none">Get in touch</span>
        <span className="h-px w-full origin-left scale-x-0 bg-[#f0f0f0] transition-transform duration-[540ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
    </button>
  );
}`;
