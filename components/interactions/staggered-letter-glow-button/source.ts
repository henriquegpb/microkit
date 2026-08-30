export const componentCode = `import "./styles.css";

import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterGlowButton() {
  return (
    <button type="button" className="staggered-letter-glow-button" aria-label={LABEL}>
      <span className="staggered-letter-glow-button__label" aria-hidden="true">
        {LABEL.split("").map((letter, index) => (
          <span
            className="staggered-letter-glow-button__letter"
            style={{ "--letter-delay": \`\${index * 34}ms\` } as CSSProperties}
            key={\`\${letter}-\${index}\`}
          >
            <span className="staggered-letter-glow-button__current">{letter}</span>
            <span className="staggered-letter-glow-button__incoming">{letter}</span>
          </span>
        ))}
      </span>
    </button>
  );
}

/* styles.css */
.staggered-letter-glow-button,
.staggered-letter-glow-button * {
  box-sizing: border-box;
}

.staggered-letter-glow-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  width: min(190px, calc(100vw - 40px));
  height: 54px;
  align-items: center;
  justify-content: center;
  border: 1px solid #48484f;
  border-radius: 999px;
  background: #15151b;
  padding: 0;
  color: #fff8f3;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  isolation: isolate;
  transition: background-color .3s ease, border-color .32s ease, box-shadow .4s cubic-bezier(.16, 1, .3, 1);
}

.staggered-letter-glow-button__label {
  display: inline-flex;
  align-items: center;
}

.staggered-letter-glow-button__letter {
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

.staggered-letter-glow-button__current,
.staggered-letter-glow-button__incoming {
  grid-area: 1 / 1;
  transition: transform .45s cubic-bezier(.16, 1, .3, 1);
  transition-delay: var(--letter-delay);
}

.staggered-letter-glow-button__incoming {
  transform: translateY(125%);
}

.staggered-letter-glow-button:hover,
.staggered-letter-glow-button:focus-visible {
  border-color: #f97316;
  background: #18181e;
  box-shadow: inset 28px 0 34px -28px rgba(249, 115, 22, .62), inset -28px 0 34px -28px rgba(249, 115, 22, .62), inset 0 0 18px rgba(249, 115, 22, .08);
}

.staggered-letter-glow-button:hover .staggered-letter-glow-button__current,
.staggered-letter-glow-button:focus-visible .staggered-letter-glow-button__current {
  transform: translateY(-125%);
}

.staggered-letter-glow-button:hover .staggered-letter-glow-button__incoming,
.staggered-letter-glow-button:focus-visible .staggered-letter-glow-button__incoming {
  transform: translateY(0);
}

.staggered-letter-glow-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 5px;
}

@media (prefers-reduced-motion: reduce) {
  .staggered-letter-glow-button,
  .staggered-letter-glow-button__current,
  .staggered-letter-glow-button__incoming {
    transition: none;
  }
}`;

export const tailwindCode = `import type { CSSProperties } from "react";

const LABEL = "MICROKIT";

export function StaggeredLetterGlowButton() {
  return (
    <button type="button" aria-label={LABEL} className="group relative isolate inline-flex h-[54px] w-[min(190px,calc(100vw_-_40px))] cursor-pointer appearance-none items-center justify-center rounded-full border border-[#48484f] bg-[#15151b] p-0 font-[Arial,Helvetica,sans-serif] text-[#fff8f3] [transition:background-color_.3s_ease,border-color_.32s_ease,box-shadow_.4s_cubic-bezier(.16,1,.3,1)] hover:border-[#f97316] hover:bg-[#18181e] hover:shadow-[inset_28px_0_34px_-28px_rgba(249,115,22,.62),inset_-28px_0_34px_-28px_rgba(249,115,22,.62),inset_0_0_18px_rgba(249,115,22,.08)] focus-visible:border-[#f97316] focus-visible:bg-[#18181e] focus-visible:shadow-[inset_28px_0_34px_-28px_rgba(249,115,22,.62),inset_-28px_0_34px_-28px_rgba(249,115,22,.62),inset_0_0_18px_rgba(249,115,22,.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316] motion-reduce:transition-none">
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
