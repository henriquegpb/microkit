export const componentCode = `import "./styles.css";

import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterTextSwap() {
  return (
    <button type="button" className="staggered-letter-text-swap" aria-label={LABEL}>
      <span className="staggered-letter-text-swap__label" aria-hidden="true">
        {LABEL.split("").map((letter, index) => (
          <span
            className="staggered-letter-text-swap__letter"
            style={{ "--letter-delay": \`\${index * 34}ms\` } as CSSProperties}
            key={\`\${letter}-\${index}\`}
          >
            <span className="staggered-letter-text-swap__current">{letter}</span>
            <span className="staggered-letter-text-swap__incoming">{letter}</span>
          </span>
        ))}
      </span>
    </button>
  );
}

/* styles.css */
.staggered-letter-text-swap,
.staggered-letter-text-swap * {
  box-sizing: border-box;
}

.staggered-letter-text-swap {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 0;
  color: #f7f7fa;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}

.staggered-letter-text-swap__label {
  display: inline-flex;
  align-items: center;
}

.staggered-letter-text-swap__letter {
  --letter-delay: 0ms;
  position: relative;
  display: inline-grid;
  height: 18px;
  overflow: hidden;
  place-items: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -.35px;
  line-height: 18px;
}

.staggered-letter-text-swap__current,
.staggered-letter-text-swap__incoming {
  grid-area: 1 / 1;
  transition: transform .45s cubic-bezier(.16, 1, .3, 1);
  transition-delay: var(--letter-delay);
}

.staggered-letter-text-swap__incoming {
  transform: translateY(125%);
}

.staggered-letter-text-swap:hover .staggered-letter-text-swap__current,
.staggered-letter-text-swap:focus-visible .staggered-letter-text-swap__current {
  transform: translateY(-125%);
}

.staggered-letter-text-swap:hover .staggered-letter-text-swap__incoming,
.staggered-letter-text-swap:focus-visible .staggered-letter-text-swap__incoming {
  transform: translateY(0);
}

.staggered-letter-text-swap:focus-visible {
  border-radius: 3px;
  outline: 2px solid #f97316;
  outline-offset: 5px;
}

@media (prefers-reduced-motion: reduce) {
  .staggered-letter-text-swap__current,
  .staggered-letter-text-swap__incoming {
    transition: none;
  }
}`;

export const tailwindCode = `import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterTextSwap() {
  return (
    <button type="button" aria-label={LABEL} className="group inline-flex cursor-pointer appearance-none items-center justify-center border-0 bg-transparent p-0 font-[Arial,Helvetica,sans-serif] text-[#f7f7fa] focus-visible:rounded-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316]">
      <span className="inline-flex items-center" aria-hidden="true">
        {LABEL.split("").map((letter, index) => (
          <span key={\`\${letter}-\${index}\`} style={{ "--letter-delay": \`\${index * 34}ms\` } as CSSProperties} className="relative inline-grid h-[18px] place-items-center overflow-hidden text-[16px] font-semibold leading-[18px] tracking-[-.35px]">
            <span className="col-start-1 row-start-1 [transition:transform_.45s_cubic-bezier(.16,1,.3,1)] [transition-delay:var(--letter-delay)] group-hover:-translate-y-[125%] group-focus-visible:-translate-y-[125%] motion-reduce:transition-none">{letter}</span>
            <span className="col-start-1 row-start-1 translate-y-[125%] [transition:transform_.45s_cubic-bezier(.16,1,.3,1)] [transition-delay:var(--letter-delay)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">{letter}</span>
          </span>
        ))}
      </span>
    </button>
  );
}`;
