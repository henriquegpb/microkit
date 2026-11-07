export const componentCode = `"use client";

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
    <span ref={ref} className={\`count-up \${className}\`}>
      <span className="count-up__value">{\`\${prefix}\${formatter.format(value)}\${suffix}\`}</span>
      <span className="count-up__ticker" aria-hidden="true">
        {\`\${prefix}\${formatter.format(display)}\${suffix}\`}
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

/* styles.css */
.count-up {
  display: inline-grid;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* The settled value sizes the box and is what screen readers and copy-paste get, but it is never painted. */
.count-up__value {
  grid-area: 1 / 1;
  color: transparent;
}

/* Right-aligned over the settled value, each digit climbs in the column it will finish in. */
.count-up__ticker {
  grid-area: 1 / 1;
  justify-self: end;
  pointer-events: none;
  user-select: none;
}

.count-up-stat {
  display: grid;
  justify-items: center;
  gap: 14px;
  margin: 0;
  color: light-dark(#14181e, #f2f4f6);
  text-align: center;
}

.count-up-stat__number {
  font-size: 64px;
  font-weight: 600;
  letter-spacing: -.045em;
  line-height: 1;
}

.count-up-stat__caption {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: light-dark(#5d6673, #8d939d);
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
}

.count-up-stat__delta {
  border-radius: 999px;
  background: light-dark(#ffedd5, rgba(249, 115, 22, .14));
  padding: 5px 8px;
  color: light-dark(#c2410c, #fb923c);
  font-size: 12px;
  font-weight: 600;
}

@media (prefers-reduced-motion: reduce) {
  .count-up__value {
    color: inherit;
  }

  .count-up__ticker {
    visibility: hidden;
  }
}`;

export const tailwindCode = `"use client";

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
    <span ref={ref} className={\`inline-grid whitespace-nowrap tabular-nums \${className}\`}>
      {/* The settled value sizes the box and is what screen readers and copy-paste get, but it is never painted. */}
      <span className="text-transparent [grid-area:1/1] motion-reduce:text-inherit">
        {\`\${prefix}\${formatter.format(value)}\${suffix}\`}
      </span>
      {/* Right-aligned over the settled value, each digit climbs in the column it will finish in. */}
      <span
        className="pointer-events-none select-none justify-self-end [grid-area:1/1] motion-reduce:invisible"
        aria-hidden="true"
      >
        {\`\${prefix}\${formatter.format(display)}\${suffix}\`}
      </span>
    </span>
  );
}

export function CountUpStat() {
  return (
    <figure className="m-0 grid justify-items-center gap-[14px] text-center text-[light-dark(#14181e,#f2f4f6)]">
      <CountUpNumber value={48290} className="text-[64px] font-semibold leading-none tracking-[-.045em]" />
      <figcaption className="inline-flex items-center gap-[10px] text-[14px] font-medium leading-none text-[light-dark(#5d6673,#8d939d)]">
        Monthly active users
        <CountUpNumber
          value={12.4}
          decimals={1}
          prefix="+"
          suffix="%"
          className="rounded-full bg-[light-dark(#ffedd5,rgba(249,115,22,.14))] px-[8px] py-[5px] text-[12px] font-semibold text-[light-dark(#c2410c,#fb923c)]"
        />
      </figcaption>
    </figure>
  );
}`;
