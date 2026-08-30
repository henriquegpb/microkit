export const componentCode = `import "./styles.css";

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

/* styles.css */
.sliding-send-button,
.sliding-send-button * {
  box-sizing: border-box;
}

.sliding-send-button {
  appearance: none;
  display: inline-flex;
  width: min(170px, calc(100vw - 40px));
  height: 50px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #48484f;
  border-radius: 999px;
  background: #15151b;
  padding: 0;
  color: #f7f7fa;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: border-color .3s ease, background-color .3s ease;
}

.sliding-send-button__content {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.sliding-send-button__label {
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -.4px;
  line-height: 1;
  transition: transform .45s cubic-bezier(.16, 1, .3, 1);
}

.sliding-send-button__icon {
  position: absolute;
  left: calc(50% - 59px);
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  color: #f97316;
  transform: translateX(-12px) scale(0);
  transition: transform .45s cubic-bezier(.16, 1, .3, 1);
}

.sliding-send-button__icon svg {
  width: 100%;
  height: 100%;
  transform: rotate(-5deg);
}

.sliding-send-button:hover,
.sliding-send-button:focus-visible {
  border-color: #5a5a62;
  background: #18181e;
}

.sliding-send-button:hover .sliding-send-button__label,
.sliding-send-button:focus-visible .sliding-send-button__label {
  transform: translateX(17px);
}

.sliding-send-button:hover .sliding-send-button__icon,
.sliding-send-button:focus-visible .sliding-send-button__icon {
  transform: translateX(0) scale(1);
}

.sliding-send-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 5px;
}

@media (prefers-reduced-motion: reduce) {
  .sliding-send-button,
  .sliding-send-button__label,
  .sliding-send-button__icon {
    transition: none;
  }
}`;

export const tailwindCode = `export function SlidingSendButton() {
  return (
    <button type="button" className="group inline-flex h-[50px] w-[min(170px,calc(100vw-40px))] cursor-pointer appearance-none items-center justify-center overflow-hidden rounded-full border border-[#48484f] bg-[#15151b] p-0 font-[Arial,Helvetica,sans-serif] text-[#f7f7fa] transition-[border-color,background-color] duration-300 hover:border-[#5a5a62] hover:bg-[#18181e] focus-visible:border-[#5a5a62] focus-visible:bg-[#18181e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316] motion-reduce:transition-none">
      <span className="relative flex w-full items-center justify-center">
        <span className="whitespace-nowrap text-[16px] font-normal leading-none tracking-[-.4px] transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[17px] group-focus-visible:translate-x-[17px] motion-reduce:transition-none">Share it now</span>
        <span className="absolute left-[calc(50%-59px)] grid size-5 -translate-x-3 scale-0 place-items-center text-[#f97316] transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:scale-100 group-focus-visible:translate-x-0 group-focus-visible:scale-100 motion-reduce:transition-none" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="none" className="size-full -rotate-[5deg]">
            <path d="M28.14 4.94 19.6 27.72c-.4 1.06-1.87 1.1-2.33.06l-4.04-9.05-9.03-4.02c-1.04-.46-1-1.93.06-2.33L27.04 3.86c.74-.28 1.38.34 1.1 1.08Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="m13.02 18.63 5.75-5.75" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </button>
  );
}`;
