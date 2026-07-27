"use client";

import "./styles.css";

import { useEffect, useRef, useState } from "react";
import { Clock, Heart, Layers } from "lucide-react";

const items = [
  { label: "All components", Icon: Layers },
  { label: "Recently viewed", Icon: Clock },
  { label: "Favorites", Icon: Heart },
];

export function SpotlightIndicator() {
  const navRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const animatedRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    const button = buttonRefs.current[active];
    const nav = navRef.current;
    if (!bar || !button || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    bar.style.transition = animatedRef.current
      ? "top .3s cubic-bezier(.4, 0, .2, 1), height .3s cubic-bezier(.4, 0, .2, 1)"
      : "none";
    bar.style.top = `${buttonRect.top - navRect.top + 4}px`;
    bar.style.height = `${buttonRect.height - 8}px`;
    const frame = requestAnimationFrame(() => { animatedRef.current = true; });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div className="spot-nav" ref={navRef}>
      <span className="spot-bar" ref={barRef} aria-hidden="true" />
      {items.map(({ label, Icon }, index) => (
        <button
          type="button"
          key={label}
          ref={(element) => { buttonRefs.current[index] = element; }}
          className={`spot-item ${active === index ? "active" : ""}`}
          aria-pressed={active === index}
          onClick={() => setActive(index)}
        >
          <span className="spot-item-icon"><Icon size={15} /></span>
          {label}
        </button>
      ))}
    </div>
  );
}
