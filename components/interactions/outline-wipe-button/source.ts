export const componentCode = `import "./styles.css";

// Non-breaking padding so the wipe bar has room to rest inside the word.
const LABEL = "\\u00A0MicroKit\\u00A0";

export function OutlineWipeButton() {
  return (
    <button type="button" className="outline-wipe-button" aria-label="MicroKit">
      <span className="outline-wipe-button__base" aria-hidden="true">{LABEL}</span>
      <span className="outline-wipe-button__hover" aria-hidden="true">{LABEL}</span>
      <span className="outline-wipe-button__edge" aria-hidden="true" />
    </button>
  );
}

/* styles.css */
.outline-wipe-button,
.outline-wipe-button * {
  box-sizing: border-box;
}

.outline-wipe-button {
  --wipe-accent: #f97316;
  --wipe-bar: 6px;
  --wipe-stroke: rgba(255, 255, 255, .6);
  --wipe-ease: .85s cubic-bezier(.16, 1, .3, 1);
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  margin: 0;
  border: 0;
  background: transparent;
  padding: 0;
  color: transparent;
  font-family: Arial, Helvetica, sans-serif;
  font-size: clamp(26px, 6vw, 34px);
  font-weight: 400;
  letter-spacing: 3px;
  line-height: 1.1;
  text-transform: none;
  cursor: pointer;
  -webkit-text-stroke: .7px var(--wipe-stroke);
}

.outline-wipe-button__base {
  display: block;
  line-height: 1.1;
  white-space: nowrap;
}

.outline-wipe-button__hover {
  position: absolute;
  inset: 0;
  width: 0;
  overflow: hidden;
  color: var(--wipe-accent);
  line-height: 1.1;
  white-space: nowrap;
  transition: width var(--wipe-ease), filter .4s ease;
  -webkit-text-stroke: .7px var(--wipe-accent);
}

.outline-wipe-button__edge {
  position: absolute;
  top: 6%;
  bottom: 6%;
  left: 0;
  width: 0;
  pointer-events: none;
  transition: width var(--wipe-ease);
}

.outline-wipe-button__edge::after {
  content: "";
  position: absolute;
  top: 0;
  right: calc(var(--wipe-bar) * -1);
  bottom: 0;
  width: var(--wipe-bar);
  border-radius: 999px;
  background: var(--wipe-accent);
  box-shadow: 0 0 16px rgba(249, 115, 22, .55);
}

.outline-wipe-button:hover .outline-wipe-button__hover,
.outline-wipe-button:focus-visible .outline-wipe-button__hover {
  width: 100%;
  filter: drop-shadow(0 0 18px rgba(249, 115, 22, .55));
}

.outline-wipe-button:hover .outline-wipe-button__edge,
.outline-wipe-button:focus-visible .outline-wipe-button__edge {
  width: calc(100% - var(--wipe-bar));
}

.outline-wipe-button:focus-visible {
  outline: 2px solid var(--wipe-accent);
  outline-offset: 8px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .outline-wipe-button__hover,
  .outline-wipe-button__edge {
    transition: none;
  }
}`;

export const tailwindCode = `// Non-breaking padding so the wipe bar has room to rest inside the word.
const LABEL = "\\u00A0MicroKit\\u00A0";

export function OutlineWipeButton() {
  return (
    <button type="button" aria-label="MicroKit" className="group relative inline-flex cursor-pointer appearance-none items-center border-0 bg-transparent p-0 font-[Arial,Helvetica,sans-serif] text-[clamp(26px,6vw,34px)] font-normal leading-[1.1] tracking-[3px] text-transparent [-webkit-text-stroke:.7px_rgba(255,255,255,.6)] focus-visible:rounded-[4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#f97316]">
      <span aria-hidden="true" className="block whitespace-nowrap leading-[1.1]">{LABEL}</span>
      <span aria-hidden="true" className="absolute inset-0 w-0 overflow-hidden whitespace-nowrap leading-[1.1] text-[#f97316] [-webkit-text-stroke:.7px_#f97316] [transition:width_.85s_cubic-bezier(.16,1,.3,1),filter_.4s_ease] group-hover:w-full group-hover:[filter:drop-shadow(0_0_18px_rgba(249,115,22,.55))] group-focus-visible:w-full group-focus-visible:[filter:drop-shadow(0_0_18px_rgba(249,115,22,.55))] motion-reduce:transition-none">{LABEL}</span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-[6%] left-0 w-0 [transition:width_.85s_cubic-bezier(.16,1,.3,1)] after:absolute after:inset-y-0 after:right-[-6px] after:w-[6px] after:rounded-full after:bg-[#f97316] after:shadow-[0_0_16px_rgba(249,115,22,.55)] after:content-[''] group-hover:w-[calc(100%_-_6px)] group-focus-visible:w-[calc(100%_-_6px)] motion-reduce:transition-none" />
    </button>
  );
}`;
