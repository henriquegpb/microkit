export const componentCode = `import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button type="button" className="contact-pill">
      <span className="contact-pill-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span>Get in touch</span>
    </button>
  );
}

/* expanding-contact-button.css */
.contact-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 36px;
  gap: 0;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: transparent;
  color: #f0f0f0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: width .32s cubic-bezier(.4, 0, .2, 1), background-color .32s cubic-bezier(.4, 0, .2, 1), color .28s ease;
}
.contact-pill::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f97316;
}
.contact-pill-icon,
.contact-pill > span:last-child { position: relative; z-index: 1; }
.contact-pill-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: #111;
}
.contact-pill > span:last-child {
  position: absolute;
  left: 47px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity .18s ease .1s, transform .24s ease .06s;
}
.contact-pill:hover,
.contact-pill:focus-visible { width: 145px; background: #f4f4f5; color: #111; }
.contact-pill:hover > span:last-child,
.contact-pill:focus-visible > span:last-child { opacity: 1; transform: translateX(0); }
.contact-pill:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button className="group relative inline-flex h-9 w-9 items-center overflow-hidden rounded-full border-0 bg-transparent p-0 text-[13px] font-medium leading-none text-[#f0f0f0] transition-[width,background-color,color] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)] hover:w-[145px] hover:bg-[#f4f4f5] hover:text-[#111] focus-visible:w-[145px] focus-visible:bg-[#f4f4f5] focus-visible:text-[#111]">
      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-[#f97316] text-[#111]">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span className="absolute left-[47px] whitespace-nowrap opacity-0 -translate-x-[5px] transition-[opacity,transform] duration-[240ms] delay-[60ms] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        Get in touch
      </span>
    </button>
  );
}`;
