export const componentCode = `export function GradientUnderlineButton() {
  return (
    <button type="button" className="gradient-underline-button">
      <span className="gradient-underline-button-label">HOVER ME</span>
      <span className="gradient-underline-button-line" aria-hidden="true" />
    </button>
  );
}

/* gradient-underline-button.css */
.gradient-underline-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 8px 24px;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.gradient-underline-button-label {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  transition: transform .5s ease;
}
.gradient-underline-button-line {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(351deg, transparent 20%, #f97316 50%, transparent 85%);
  transition: width 1s cubic-bezier(.165, .84, .44, 1);
}
.gradient-underline-button:hover .gradient-underline-button-label,
.gradient-underline-button:focus-visible .gradient-underline-button-label {
  transform: scale(1.2);
}
.gradient-underline-button:hover .gradient-underline-button-line,
.gradient-underline-button:focus-visible .gradient-underline-button-line {
  width: 100%;
}
.gradient-underline-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}`;

export const tailwindCode = `export function GradientUnderlineButton() {
  return (
    <button
      type="button"
      className="group relative inline-flex cursor-pointer appearance-none flex-col items-center justify-center overflow-hidden border-0 bg-transparent px-6 py-2 text-center text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10 text-base font-medium transition-transform duration-500 group-hover:scale-[1.2] group-focus-visible:scale-[1.2]">HOVER ME</span>
      <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-[linear-gradient(351deg,transparent_20%,#f97316_50%,transparent_85%)] transition-[width] duration-1000 ease-[cubic-bezier(.165,.84,.44,1)] group-hover:w-full group-focus-visible:w-full" aria-hidden="true" />
    </button>
  );
}`;
