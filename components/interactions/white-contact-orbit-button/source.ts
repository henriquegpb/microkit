export const componentCode = `import { ArrowRight } from "lucide-react";

export function WhiteContactOrbitButton() {
  return (
    <button type="button" className="white-contact-orbit-button">
      <span className="white-contact-orbit-button-label">Get in touch</span>
      <span className="white-contact-orbit-button-icon" aria-hidden="true">
        <ArrowRight size={21} strokeWidth={2.6} />
      </span>
    </button>
  );
}

/* white-contact-orbit-button.css */
.white-contact-orbit-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 50px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: #fff;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.white-contact-orbit-button-label {
  position: relative;
  z-index: 1;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.03em;
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.white-contact-orbit-button-icon {
  position: absolute;
  right: 8px;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: #111;
  transition: background-color .4s ease, color .4s ease;
}
.white-contact-orbit-button-icon svg { transition: transform .5s cubic-bezier(.16, 1, .3, 1); }
.white-contact-orbit-button:hover .white-contact-orbit-button-icon,
.white-contact-orbit-button:focus-visible .white-contact-orbit-button-icon { background: #111; color: #fff; }
.white-contact-orbit-button:hover .white-contact-orbit-button-icon svg,
.white-contact-orbit-button:focus-visible .white-contact-orbit-button-icon svg { transform: rotate(-45deg); }
.white-contact-orbit-button:focus-visible { outline: 2px solid #fff; outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function WhiteContactOrbitButton() {
  return (
    <button type="button" className="group relative inline-flex h-[50px] w-[160px] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border-0 bg-white p-0 font-[Arial,Helvetica,sans-serif] text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
      <span className="relative z-10 mr-5 text-base font-normal leading-none tracking-[-.03em]">Get in touch</span>
      <span className="absolute right-2 grid size-[34px] place-items-center rounded-full text-[#111] transition-colors duration-[400ms] group-hover:bg-[#111] group-hover:text-white group-focus-visible:bg-[#111] group-focus-visible:text-white">
        <ArrowRight className="transition-transform duration-[500ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-rotate-45 group-focus-visible:-rotate-45" size={21} strokeWidth={2.6} />
      </span>
    </button>
  );
}`;
