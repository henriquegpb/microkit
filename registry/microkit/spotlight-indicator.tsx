"use client";

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
    const nav = navRef.current;
    const bar = barRef.current;
    const button = buttonRefs.current[active];
    if (!nav || !bar || !button) return;
    const navRect = nav.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    bar.style.top = `${buttonRect.top - navRect.top + 4}px`;
    bar.style.height = `${buttonRect.height - 8}px`;
    const frame = requestAnimationFrame(() => { animatedRef.current = true; });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div ref={navRef} className="relative flex w-[210px] flex-col gap-0.5 rounded-lg border border-[#2f333a] bg-[#101216] p-1.5">
      <span ref={barRef} className="pointer-events-none absolute left-1 w-0.5 rounded-sm bg-[#f97316] shadow-[2px_0_5px_rgba(249,115,22,.8),4px_0_11px_rgba(249,115,22,.45)] transition-[top,height] duration-300 ease-[cubic-bezier(.4,0,.2,1)]" />
      {items.map(({ label, Icon }, index) => (
        <button
          key={label}
          ref={(element) => { buttonRefs.current[index] = element; }}
          className={`flex items-center gap-2.5 rounded-md bg-transparent px-3 py-2 text-left text-xs transition-colors duration-300 hover:bg-[#17191d] hover:text-[#e4e6e9] ${active === index ? "text-[#f6f7f8]" : "text-[#a9afb8]"}`}
          onClick={() => setActive(index)}
        >
          <Icon className={active === index ? "text-[#f97316]" : "opacity-40"} size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}
