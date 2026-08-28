export const componentCode = `"use client";

import { useEffect, useRef } from "react";

export function SubscribeShineButton() {
  const gradientRef = useRef<HTMLSpanElement>(null);
  const spinAnimationRef = useRef<Animation | null>(null);
  const settleAnimationRef = useRef<Animation | null>(null);

  const startSpinning = () => {
    const gradient = gradientRef.current;
    if (!gradient || spinAnimationRef.current) return;
    settleAnimationRef.current?.cancel();
    settleAnimationRef.current = null;
    spinAnimationRef.current = gradient.animate([{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }], { duration: 3000, easing: "linear", iterations: Infinity });
  };

  const settleAtStart = () => {
    const gradient = gradientRef.current;
    if (!gradient) return;
    const spin = spinAnimationRef.current;
    if (!spin) return;
    const currentTime = typeof spin.currentTime === "number" ? spin.currentTime : 0;
    const angle = ((currentTime % 3000) / 3000) * 360;
    spin.cancel();
    spinAnimationRef.current = null;
    settleAnimationRef.current?.cancel();
    const settle = gradient.animate([{ transform: \`rotate(\${angle}deg)\` }, { transform: "rotate(0deg)" }], { duration: Math.max((angle / 360) * 3000, 16), easing: "linear", fill: "forwards" });
    settleAnimationRef.current = settle;
    void settle.finished.then(() => { if (settleAnimationRef.current === settle) { settle.cancel(); settleAnimationRef.current = null; } }, () => {});
  };

  useEffect(() => () => { spinAnimationRef.current?.cancel(); settleAnimationRef.current?.cancel(); }, []);

  return (
    <button type="button" className="subscribe-shine" onMouseEnter={startSpinning} onMouseLeave={settleAtStart} onFocus={startSpinning} onBlur={settleAtStart}>
      <span ref={gradientRef} className="subscribe-shine-gradient" aria-hidden="true" />
      <span className="subscribe-shine-inner">Subscribe</span>
    </button>
  );
}

/* subscribe-shine-button.css */
.subscribe-shine {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 60px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.subscribe-shine-gradient {
  width: 230px;
  height: 250px;
  flex: none;
  background: linear-gradient(121deg, #1b1b1b 38%, #f0f0f0 50%, #1b1b1b 61%);
}
.subscribe-shine-inner {
  position: absolute;
  inset: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #0b0b11;
  color: #f0f0f0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}
.subscribe-shine:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }
`;

export const tailwindCode = `export function SubscribeShineButton() {
  return (
    <button className="group relative flex h-[60px] w-[200px] items-center justify-center overflow-hidden rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f97316]">
      <span className="h-[250px] w-[230px] shrink-0 bg-[linear-gradient(121deg,#1b1b1b_38%,#f0f0f0_50%,#1b1b1b_61%)]" />
      <span className="absolute inset-px flex items-center justify-center rounded-full bg-[#0b0b11] text-[13px] font-bold leading-none text-[#f0f0f0] uppercase">
        Subscribe
      </span>
    </button>
  );
}

`;
