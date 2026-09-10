export const componentCode = `"use client";

import "./styles.css";

import { useEffect, useState } from "react";

type PurchaseState = "idle" | "processing" | "success";

const labels: Record<PurchaseState, string> = {
  idle: "Complete Purchase",
  processing: "Processing Payment",
  success: "Payment Secured",
};

const schedule: Record<Exclude<PurchaseState, "idle">, { next: PurchaseState; delay: number }> = {
  processing: { next: "success", delay: 3000 },
  success: { next: "idle", delay: 2000 },
};

const pixelDelays = Array.from({ length: 16 }, (_, index) =>
  Math.hypot(Math.floor(index / 4) - 1.5, (index % 4) - 1.5) * 0.12,
);

export function SecurePurchaseButton() {
  const [state, setState] = useState<PurchaseState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const { next, delay } = schedule[state];
    const timeout = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(timeout);
  }, [state]);

  const handleClick = () => {
    if (state !== "idle") return;
    setState("processing");
  };

  return (
    <button
      type="button"
      className="secure-purchase-button"
      data-state={state}
      aria-busy={state === "processing"}
      onClick={handleClick}
    >
      <span className="secure-purchase-button__glyph" aria-hidden="true">
        <span className="secure-purchase-button__loader">
          {pixelDelays.map((delay, index) => (
            <span
              key={index}
              className="secure-purchase-button__pixel"
              style={{ animationDelay: \`\${delay}s\` }}
            />
          ))}
        </span>
        <svg className="secure-purchase-button__shield" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.54 4.11984L13.04 2.05984C12.47 1.84984 11.54 1.84984 10.97 2.05984L5.47005 4.11984C4.41005 4.51984 3.55005 5.75984 3.55005 6.88984V14.9898C3.55005 15.7998 4.08005 16.8698 4.73005 17.3498L10.23 21.4598C11.2 22.1898 12.79 22.1898 13.76 21.4598L19.26 17.3498C19.91 16.8598 20.4401 15.7998 20.4401 14.9898V6.88984C20.4501 5.75984 19.59 4.51984 18.54 4.11984ZM15.48 9.71984L11.18 14.0198C11.03 14.1698 10.84 14.2398 10.65 14.2398C10.46 14.2398 10.27 14.1698 10.12 14.0198L8.52005 12.3998C8.23005 12.1098 8.23005 11.6298 8.52005 11.3398C8.81005 11.0498 9.29005 11.0498 9.58005 11.3398L10.66 12.4198L14.43 8.64984C14.72 8.35984 15.2 8.35984 15.49 8.64984C15.78 8.93984 15.78 9.42984 15.48 9.71984Z" />
        </svg>
      </span>
      <span className="secure-purchase-button__label" aria-live="polite">
        <span key={state} className="secure-purchase-button__label-text">
          {labels[state]}
        </span>
      </span>
    </button>
  );
}

/* styles.css */
.secure-purchase-button,
.secure-purchase-button * {
  box-sizing: border-box;
}

.secure-purchase-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  width: fit-content;
  height: 48px;
  align-items: center;
  justify-content: center;
  border: 1px solid #2b2f36;
  border-radius: 999px;
  background: #121418;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .04),
    0 10px 24px rgba(0, 0, 0, .35);
  padding: 0 24px;
  color: #f2f4f6;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -.02em;
  line-height: 1;
  cursor: pointer;
  interpolate-size: allow-keywords;
  transition: width .45s cubic-bezier(.16, 1, .3, 1), background-color .2s ease;
}

.secure-purchase-button[data-state="idle"]:hover {
  background: #1b1e23;
}

.secure-purchase-button[data-state="processing"],
.secure-purchase-button[data-state="success"] {
  cursor: default;
}

.secure-purchase-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}

.secure-purchase-button__glyph {
  position: relative;
  width: 0;
  height: 20px;
  flex-shrink: 0;
  transition: width .45s cubic-bezier(.16, 1, .3, 1);
}

.secure-purchase-button[data-state="processing"] .secure-purchase-button__glyph,
.secure-purchase-button[data-state="success"] .secure-purchase-button__glyph {
  width: 28px;
}

.secure-purchase-button__loader,
.secure-purchase-button__shield {
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  opacity: 0;
  transition: opacity .2s ease, transform .2s ease;
}

.secure-purchase-button__loader {
  display: grid;
  grid-template-columns: repeat(4, 2px);
  grid-auto-rows: 2px;
  gap: 2px;
  place-content: center;
  transform: scale(.6) rotate(-45deg);
}

.secure-purchase-button__shield {
  transform: scale(.6) translateY(2px);
}

.secure-purchase-button[data-state="processing"] .secure-purchase-button__loader {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.secure-purchase-button[data-state="success"] .secure-purchase-button__shield {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.secure-purchase-button__pixel {
  width: 2px;
  height: 2px;
  background: #fff;
  opacity: .5;
  transform: scale(.7);
}

.secure-purchase-button[data-state="processing"] .secure-purchase-button__pixel {
  animation: secure-purchase-pulse .9s ease-in-out infinite;
}

.secure-purchase-button__label {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}

.secure-purchase-button__label-text {
  display: inline-block;
  animation: secure-purchase-label-in .32s cubic-bezier(.16, 1, .3, 1) both;
}

@keyframes secure-purchase-pulse {
  0%, 100% {
    opacity: .5;
    transform: scale(.7);
    box-shadow: 0 0 0 rgba(255, 255, 255, 0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 24px rgba(255, 255, 255, .8);
  }
}

@keyframes secure-purchase-label-in {
  from {
    opacity: 0;
    transform: translateY(6px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .secure-purchase-button,
  .secure-purchase-button__glyph,
  .secure-purchase-button__loader,
  .secure-purchase-button__shield {
    transition: none;
  }

  .secure-purchase-button[data-state="processing"] .secure-purchase-button__pixel,
  .secure-purchase-button__label-text {
    animation: none;
  }
}`;

export const tailwindCode = `"use client";

import { useEffect, useState } from "react";

type PurchaseState = "idle" | "processing" | "success";

const labels: Record<PurchaseState, string> = {
  idle: "Complete Purchase",
  processing: "Processing Payment",
  success: "Payment Secured",
};

const schedule: Record<Exclude<PurchaseState, "idle">, { next: PurchaseState; delay: number }> = {
  processing: { next: "success", delay: 3000 },
  success: { next: "idle", delay: 2000 },
};

const pixelDelays = Array.from({ length: 16 }, (_, index) =>
  Math.hypot(Math.floor(index / 4) - 1.5, (index % 4) - 1.5) * 0.12,
);

const purchaseKeyframes = \`
@keyframes secure-purchase-pulse {
  0%, 100% { opacity: .5; transform: scale(.7); box-shadow: 0 0 0 rgba(255, 255, 255, 0); }
  50% { opacity: 1; transform: scale(1); box-shadow: 0 0 24px rgba(255, 255, 255, .8); }
}
@keyframes secure-purchase-label-in {
  from { opacity: 0; transform: translateY(6px); filter: blur(2px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}\`;

export function SecurePurchaseButton() {
  const [state, setState] = useState<PurchaseState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const { next, delay } = schedule[state];
    const timeout = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(timeout);
  }, [state]);

  const handleClick = () => {
    if (state !== "idle") return;
    setState("processing");
  };

  return (
    <>
      <style>{purchaseKeyframes}</style>
      <button
        type="button"
        className="group relative inline-flex h-[48px] w-fit cursor-pointer appearance-none items-center justify-center rounded-full border border-[#2b2f36] bg-[#121418] px-[24px] font-[Arial,Helvetica,sans-serif] text-base font-medium leading-none tracking-[-.02em] text-[#f2f4f6] shadow-[inset_0_1px_0_rgba(255,255,255,.04),0_10px_24px_rgba(0,0,0,.35)] [interpolate-size:allow-keywords] [transition:width_.45s_cubic-bezier(.16,1,.3,1),background-color_.2s_ease] hover:data-[state=idle]:bg-[#1b1e23] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316] data-[state=processing]:cursor-default data-[state=success]:cursor-default motion-reduce:transition-none"
        data-state={state}
        aria-busy={state === "processing"}
        onClick={handleClick}
      >
        <span
          className="relative h-[20px] w-0 shrink-0 transition-[width] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] group-data-[state=processing]:w-[28px] group-data-[state=success]:w-[28px] motion-reduce:transition-none"
          aria-hidden="true"
        >
          <span className="absolute left-0 top-0 grid size-[20px] auto-rows-[2px] grid-cols-[repeat(4,2px)] place-content-center gap-[2px] opacity-0 [transform:scale(.6)_rotate(-45deg)] [transition:opacity_.2s_ease,transform_.2s_ease] group-data-[state=processing]:opacity-100 group-data-[state=processing]:[transform:scale(1)_rotate(0deg)] motion-reduce:transition-none">
            {pixelDelays.map((delay, index) => (
              <span
                key={index}
                className="size-[2px] bg-white opacity-50 [transform:scale(.7)] group-data-[state=processing]:[animation:secure-purchase-pulse_.9s_ease-in-out_infinite] motion-reduce:group-data-[state=processing]:animate-none"
                style={{ animationDelay: \`\${delay}s\` }}
              />
            ))}
          </span>
          <svg
            className="absolute left-0 top-0 size-[20px] opacity-0 [transform:scale(.6)_translateY(2px)] [transition:opacity_.2s_ease,transform_.2s_ease] group-data-[state=success]:opacity-100 group-data-[state=success]:[transform:scale(1)_translateY(0)] motion-reduce:transition-none"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.54 4.11984L13.04 2.05984C12.47 1.84984 11.54 1.84984 10.97 2.05984L5.47005 4.11984C4.41005 4.51984 3.55005 5.75984 3.55005 6.88984V14.9898C3.55005 15.7998 4.08005 16.8698 4.73005 17.3498L10.23 21.4598C11.2 22.1898 12.79 22.1898 13.76 21.4598L19.26 17.3498C19.91 16.8598 20.4401 15.7998 20.4401 14.9898V6.88984C20.4501 5.75984 19.59 4.51984 18.54 4.11984ZM15.48 9.71984L11.18 14.0198C11.03 14.1698 10.84 14.2398 10.65 14.2398C10.46 14.2398 10.27 14.1698 10.12 14.0198L8.52005 12.3998C8.23005 12.1098 8.23005 11.6298 8.52005 11.3398C8.81005 11.0498 9.29005 11.0498 9.58005 11.3398L10.66 12.4198L14.43 8.64984C14.72 8.35984 15.2 8.35984 15.49 8.64984C15.78 8.93984 15.78 9.42984 15.48 9.71984Z" />
          </svg>
        </span>
        <span className="relative inline-block whitespace-nowrap" aria-live="polite">
          <span
            key={state}
            className="inline-block [animation:secure-purchase-label-in_.32s_cubic-bezier(.16,1,.3,1)_both] motion-reduce:animate-none"
          >
            {labels[state]}
          </span>
        </span>
      </button>
    </>
  );
}`;
