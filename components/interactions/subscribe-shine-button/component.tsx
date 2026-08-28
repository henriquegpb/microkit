"use client";

import { useEffect, useRef } from "react";

import "./styles.css";

export function SubscribeShineButton() {
  const gradientRef = useRef<HTMLSpanElement>(null);
  const spinAnimationRef = useRef<Animation | null>(null);
  const settleAnimationRef = useRef<Animation | null>(null);

  const startSpinning = () => {
    const gradient = gradientRef.current;
    if (!gradient || spinAnimationRef.current) return;

    settleAnimationRef.current?.cancel();
    settleAnimationRef.current = null;
    spinAnimationRef.current = gradient.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      { duration: 3000, easing: "linear", iterations: Infinity },
    );
  };

  const settleAtStart = () => {
    const gradient = gradientRef.current;
    if (!gradient) return;

    const spin = spinAnimationRef.current;
    if (!spin) return;

    const currentTime = typeof spin.currentTime === "number" ? spin.currentTime : 0;
    const currentAngle = ((currentTime % 3000) / 3000) * 360;
    spin.cancel();
    spinAnimationRef.current = null;

    settleAnimationRef.current?.cancel();
    const settle = gradient.animate(
      [{ transform: `rotate(${currentAngle}deg)` }, { transform: "rotate(0deg)" }],
      { duration: Math.max((currentAngle / 360) * 3000, 16), easing: "linear", fill: "forwards" },
    );
    settleAnimationRef.current = settle;
    void settle.finished.then(() => {
      if (settleAnimationRef.current === settle) {
        settle.cancel();
        settleAnimationRef.current = null;
      }
    }, () => {});
  };

  useEffect(() => () => {
    spinAnimationRef.current?.cancel();
    settleAnimationRef.current?.cancel();
  }, []);

  return (
    <button type="button" className="subscribe-shine" onMouseEnter={startSpinning} onMouseLeave={settleAtStart} onFocus={startSpinning} onBlur={settleAtStart}>
      <span ref={gradientRef} className="subscribe-shine-gradient" aria-hidden="true" />
      <span className="subscribe-shine-inner">Subscribe</span>
    </button>
  );
}
