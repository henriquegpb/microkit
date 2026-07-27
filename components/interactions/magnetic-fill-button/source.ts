export const componentCode = `import type { PointerEvent as ReactPointerEvent } from "react";

export function MagneticFillButton() {
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * .14;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * .22;
    event.currentTarget.style.setProperty("--magnetic-x", \`\${x}px\`);
    event.currentTarget.style.setProperty("--magnetic-y", \`\${y}px\`);
  };
  const reset = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <button type="button" className="magnetic-fill-button" onPointerMove={move} onPointerLeave={reset}>
      <span className="magnetic-fill-label">Start a project</span>
      <span className="magnetic-fill-background" aria-hidden="true" />
    </button>
  );
}

/* magnetic-fill-button.css */
.magnetic-fill-button {
  --magnetic-x: 0px;
  --magnetic-y: 0px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 100px;
  background: transparent;
  padding: 12px 32px;
  color: #f0f0f0;
  transform: translate(var(--magnetic-x), var(--magnetic-y));
  transition: transform .22s cubic-bezier(.16, 1, .3, 1), color .28s ease;
}
.magnetic-fill-label {
  position: relative;
  z-index: 1;
  color: inherit;
  font-size: 16px;
  font-weight: 500;
}
.magnetic-fill-background {
  position: absolute;
  inset: auto 0 0;
  height: 0;
  background: #f97316;
  transition: height .38s cubic-bezier(.16, 1, .3, 1);
}
.magnetic-fill-button:hover,
.magnetic-fill-button:focus-visible {
  color: #111;
}
.magnetic-fill-button:hover .magnetic-fill-background,
.magnetic-fill-button:focus-visible .magnetic-fill-background {
  height: 100%;
}
.magnetic-fill-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `import type { PointerEvent as ReactPointerEvent } from "react";

export function MagneticFillButton() {
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * .14;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * .22;
    event.currentTarget.style.setProperty("--magnetic-x", \`\${x}px\`);
    event.currentTarget.style.setProperty("--magnetic-y", \`\${y}px\`);
  };
  const reset = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <button
      onPointerMove={move}
      onPointerLeave={reset}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-[100px] border border-[#f0f0f0] bg-transparent px-8 py-3 text-base font-medium text-[#f0f0f0] [transform:translate(var(--magnetic-x,0px),var(--magnetic-y,0px))] transition-[transform,color] duration-[220ms] ease-[cubic-bezier(.16,1,.3,1)] hover:text-[#111] focus-visible:text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10">Start a project</span>
      <span className="absolute inset-x-0 bottom-0 h-0 bg-[#f97316] transition-[height] duration-[380ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-full group-focus-visible:h-full" aria-hidden="true" />
    </button>
  );
}`;
