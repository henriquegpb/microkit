"use client";

import "./styles.css";

import { useEffect, useRef, useState } from "react";

export function CountUpNumber({
  value = 48290,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  className = "",
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(0);
  const [display, setDisplay] = useState(0);
  const [inView, setInView] = useState(false);
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // The first report arrives on observe and says "intersecting" for a sliver,
    // so the ratio is what decides the number has actually been seen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5) return;
        observer.disconnect();
        setInView(true);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    // Counting from what is on screen lets a new value pick up mid-count instead of restarting at zero.
    const from = shown.current;
    const length = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;
    const start = performance.now();
    let frame = 0;

    const step = () => {
      const progress = length > 0 ? Math.min(1, (performance.now() - start) / length) : 1;
      // Expo-out covers most of the distance at once and spends the rest settling the last digits.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      shown.current = from + (value - from) * eased;
      setDisplay(shown.current);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={`count-up ${className}`}>
      <span className="count-up__value">{`${prefix}${formatter.format(value)}${suffix}`}</span>
      <span className="count-up__ticker" aria-hidden="true">
        {`${prefix}${formatter.format(display)}${suffix}`}
      </span>
    </span>
  );
}

export function CountUpStat() {
  return (
    <figure className="count-up-stat">
      <CountUpNumber value={48290} className="count-up-stat__number" />
      <figcaption className="count-up-stat__caption">
        Monthly active users
        <CountUpNumber value={12.4} decimals={1} prefix="+" suffix="%" className="count-up-stat__delta" />
      </figcaption>
    </figure>
  );
}
