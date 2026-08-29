export const componentCode = `import "./aurora-download-button.css";

export function AuroraDownloadButton() {
  return (
    <button type="button" className="aurora-download-button">
      <span className="aurora-download-button__rim" aria-hidden="true">
        <span className="aurora-download-button__rim-highlight" />
      </span>
      <span className="aurora-download-button__hover-bloom" aria-hidden="true" />
      <svg className="aurora-download-button__icon" width="20" height="20" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.7-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.6-91.9zM261.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="aurora-download-button__label">Get for Mac</span>
    </button>
  );
}

/* aurora-download-button.css */
.aurora-download-button,
.aurora-download-button * {
  box-sizing: border-box;
}

.aurora-download-button {
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  border: 0;
  border-radius: 10px;
  background:
    radial-gradient(101.79% 101.79% at 65.61% 81.79%, rgba(255, 255, 255, .6) 0, rgba(255, 255, 255, 0) 100%),
    radial-gradient(114.65% 114.65% at 9.73% 17.27%, rgb(30, 130, 224) 0, rgb(28, 56, 234) 100%);
  background-blend-mode: overlay, normal;
  box-shadow:
    rgba(0, 0, 0, .28) 0 10px 18px,
    rgba(191, 229, 251, .4) -3px -3px 4px inset,
    rgba(19, 26, 228, .1) 4px 4px 4px inset;
  padding: 10px 20px;
  color: #fff;
  font-family: var(--font-geist-sans, Geist), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.13px;
  cursor: pointer;
  transition: transform .16s ease-out;
}

.aurora-download-button__hover-bloom {
  position: absolute;
  z-index: 0;
  inset: 1px;
  border-radius: inherit;
  background: radial-gradient(101.79% 101.79% at 65.61% 81.79%, rgba(255, 255, 255, .6) 0, rgba(255, 255, 255, 0) 100%);
  mix-blend-mode: overlay;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease-in-out;
}

.aurora-download-button__rim {
  position: absolute;
  z-index: 20;
  inset: 0;
  filter: blur(1px);
  pointer-events: none;
}

.aurora-download-button__rim-highlight {
  position: absolute;
  top: -1px;
  left: -1px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(176.87deg, rgba(255, 255, 255, .5) 8.56%, rgba(255, 255, 255, 0) 85.04%);
  padding: 3px;
  opacity: .45;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.aurora-download-button__icon,
.aurora-download-button__label {
  position: relative;
  z-index: 1;
}

.aurora-download-button__icon {
  flex: 0 0 auto;
}

@media (min-width: 768px) {
  .aurora-download-button,
  .aurora-download-button__rim-highlight {
    border-radius: 12px;
  }
}

@media (hover: hover) {
  .aurora-download-button:hover {
    transform: scale(1.03);
  }

  .aurora-download-button:hover .aurora-download-button__hover-bloom {
    opacity: .4;
  }
}

.aurora-download-button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
  transform: scale(1.03);
}

.aurora-download-button:focus-visible .aurora-download-button__hover-bloom {
  opacity: .4;
}

.aurora-download-button:active {
  transform: scale(.97);
}

@media (prefers-reduced-motion: reduce) {
  .aurora-download-button,
  .aurora-download-button__hover-bloom {
    transition-duration: .01ms;
  }
}`;

export const tailwindCode = `export function AuroraDownloadButton() {
  return (
    <button
      type="button"
      className="group relative flex w-fit cursor-pointer items-center gap-1.5 overflow-hidden rounded-[10px] border-0 px-5 py-2.5 text-base font-medium leading-none tracking-[-.13px] text-white shadow-[rgba(0,0,0,.28)_0_10px_18px,rgba(191,229,251,.4)_-3px_-3px_4px_inset,rgba(19,26,228,.1)_4px_4px_4px_inset] transition-transform duration-[160ms] ease-out [background:radial-gradient(101.79%_101.79%_at_65.61%_81.79%,rgba(255,255,255,.6)_0,rgba(255,255,255,0)_100%),radial-gradient(114.65%_114.65%_at_9.73%_17.27%,rgb(30,130,224)_0,rgb(28,56,234)_100%)] [background-blend-mode:overlay,normal] [font-family:var(--font-geist-sans,Geist),-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] hover:scale-[1.03] focus-visible:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-[.97] motion-reduce:duration-[.01ms] md:rounded-xl"
    >
      <span className="pointer-events-none absolute inset-0 z-20 blur-[1px]" aria-hidden="true">
        <span className="absolute left-[-1px] top-[-1px] h-full w-full rounded-[10px] bg-[linear-gradient(176.87deg,rgba(255,255,255,.5)_8.56%,rgba(255,255,255,0)_85.04%)] p-[3px] opacity-[.45] [-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] [mask-composite:exclude] md:rounded-xl" />
      </span>
      <span className="pointer-events-none absolute inset-px z-0 rounded-[inherit] bg-[radial-gradient(101.79%_101.79%_at_65.61%_81.79%,rgba(255,255,255,.6)_0,rgba(255,255,255,0)_100%)] opacity-0 mix-blend-overlay transition-opacity duration-300 ease-in-out group-hover:opacity-40 group-focus-visible:opacity-40 motion-reduce:duration-[.01ms]" aria-hidden="true" />
      <svg className="relative z-[1] size-5 shrink-0" width="20" height="20" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.7-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.6-91.9zM261.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="relative z-[1]">Get for Mac</span>
    </button>
  );
}`;
