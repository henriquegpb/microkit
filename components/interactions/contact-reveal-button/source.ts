export const componentCode = `import { ArrowRight } from "lucide-react";

export function ContactRevealButton() {
  return (
    <button type="button" className="contact-reveal">
      <span className="contact-reveal-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span>Get in touch</span>
    </button>
  );
}

/* contact-reveal-button.css */
.contact-reveal {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  width: 145px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  padding: 0 15px 0 0;
  background: transparent;
  color: #f0f0f0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: color .28s ease;
}
.contact-reveal::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 36px;
  border-radius: inherit;
  background: #f0f0f0;
  transition: width .32s cubic-bezier(.4, 0, .2, 1);
}
.contact-reveal-icon,
.contact-reveal > span:last-child { position: relative; z-index: 1; }
.contact-reveal-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  color: #111;
  transition: background-color .2s ease .12s;
}
.contact-reveal:hover::before,
.contact-reveal:focus-visible::before { width: 100%; }
.contact-reveal:hover .contact-reveal-icon,
.contact-reveal:focus-visible .contact-reveal-icon { background: #f97316; }
.contact-reveal:hover,
.contact-reveal:focus-visible { color: #111; }
.contact-reveal:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function ContactRevealButton() {
  return (
    <button className="group relative inline-flex h-9 w-[145px] items-center gap-[10px] overflow-hidden rounded-full border-0 bg-transparent py-0 pr-[15px] text-[13px] font-medium leading-none text-[#f0f0f0] transition-colors duration-[280ms] hover:text-[#111] focus-visible:text-[#111]">
      <span className="absolute inset-y-0 left-0 w-9 rounded-full bg-[#f0f0f0] transition-[width] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-full group-focus-visible:w-full" />
      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-[#111] transition-colors delay-[120ms] duration-200 group-hover:bg-[#f97316] group-focus-visible:bg-[#f97316]">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span className="relative z-10">Get in touch</span>
    </button>
  );
}`;
