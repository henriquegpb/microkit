export const componentCode = `import { useEffect, useRef, useState } from "react";
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
    bar.style.top = \`\${buttonRect.top - navRect.top + 4}px\`;
    bar.style.height = \`\${buttonRect.height - 8}px\`;
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
          className={\`spot-item \${active === index ? "active" : ""}\`}
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

/* spotlight-indicator.css */
.spot-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 210px;
  padding: 6px;
  border: 1px solid #2f333a;
  border-radius: 8px;
  background: #101216;
}
.spot-bar {
  position: absolute;
  top: 0;
  left: 4px;
  width: 2px;
  height: 0;
  border-radius: 2px;
  background: #f97316;
  box-shadow: 2px 0 5px rgba(249, 115, 22, .8), 4px 0 11px rgba(249, 115, 22, .45);
  pointer-events: none;
}
.spot-item {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  padding: 8px 12px;
  color: #a9afb8;
  font-size: 12px;
  text-align: left;
  transition: color .3s cubic-bezier(.4, 0, .2, 1), background .3s cubic-bezier(.4, 0, .2, 1);
}
.spot-item:hover,
.spot-item:focus-visible { background: #17191d; color: #e4e6e9; }
.spot-item:focus-visible { outline: 2px solid #f97316; outline-offset: -2px; }
.spot-item.active { color: #f6f7f8; }
.spot-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  opacity: .4;
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1), color .3s;
}
.spot-item.active .spot-item-icon { opacity: 1; color: #f97316; }`;

export const tailwindCode = `import { useEffect, useRef, useState } from "react";
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
    bar.style.top = \`\${buttonRect.top - navRect.top + 4}px\`;
    bar.style.height = \`\${buttonRect.height - 8}px\`;
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
          className={\`flex items-center gap-2.5 rounded-md bg-transparent px-3 py-2 text-left text-xs transition-colors duration-300 hover:bg-[#17191d] hover:text-[#e4e6e9] \${active === index ? "text-[#f6f7f8]" : "text-[#a9afb8]"}\`}
          onClick={() => setActive(index)}
        >
          <Icon className={active === index ? "text-[#f97316]" : "opacity-40"} size={15} />
          {label}
        </button>
      ))}
    </div>
  );
}`;
