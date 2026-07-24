/**
 * The interaction registry powers the gallery and playground.
 *
 * Add a new interaction here first. Keep preview implementations in the UI
 * layer until they are mature enough to graduate to a standalone component.
 */
export type Interaction = {
  id: string;
  name: string;
  category: string;
  framework: "React" | "CSS";
  type: string;
  description: string;
  new?: boolean;
  dependency?: string;
  code: string;
};

export const interactions: Interaction[] = [
  { id: "focus-input", name: "Focus Field", category: "Inputs", framework: "CSS", type: "Focus", description: "An input with a clean animated focus treatment.", code: "input:focus {\n  border-color: #F97316;\n  box-shadow: 0 0 0 3px #f9731622;\n}" },
  { id: "expanding-contact-button", name: "Expanding Contact Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A pill-shaped call-to-action with an expanding background and arrow icon, adapted from the supplied Webflow export.", new: true, code: `<button class="contact-pill">
  <span class="contact-pill__icon" aria-hidden="true">→</span>
  <span>Get in touch</span>
</button>

<style>
  .contact-pill {
    --ink: #f0f0f0;
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    overflow: hidden;
    border: 0;
    border-radius: 999px;
    padding: 0 .9rem 0 0;
    background: transparent;
    color: var(--ink);
    font: 500 1rem/1 system-ui, sans-serif;
  }

  .contact-pill::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 2.8rem;
    border-radius: inherit;
    background: var(--ink);
    transition: width .32s ease;
  }

  .contact-pill:hover::before { width: 100%; }
  .contact-pill:hover { color: #111; }
  .contact-pill__icon,
  .contact-pill > span:last-child { position: relative; z-index: 1; }
  .contact-pill__icon {
    display: grid;
    place-items: center;
    width: 2.8rem;
    height: 2.8rem;
    color: #111;
    font-size: 1.1rem;
  }
</style>` },
  { id: "spotlight-indicator", name: "Spotlight Indicator", category: "Navigation", framework: "React", type: "Click", description: "A glowing rail that slides to the active item in a vertical nav — the same indicator powering this site's sidebar.", new: true, code: `function SpotlightNav({ items }: { items: string[] }) {
  const [active, setActive] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);

  // Measure the active button and move the rail to match it.
  useEffect(() => {
    const bar = barRef.current;
    const btn = btns.current[active];
    const nav = navRef.current;
    if (!bar || !btn || !nav) return;
    const n = nav.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    bar.style.top = \`\${b.top - n.top + 4}px\`;
    bar.style.height = \`\${b.height - 8}px\`;
  }, [active]);

  return (
    <nav ref={navRef} className="spot-nav">
      <span ref={barRef} className="spot-bar" aria-hidden />
      {items.map((label, i) => (
        <button
          key={label}
          ref={(el) => { btns.current[i] = el; }}
          className={i === active ? "spot-item active" : "spot-item"}
          onClick={() => setActive(i)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

/* spotlight-indicator.css */
.spot-nav { position: relative; display: flex; flex-direction: column; gap: 2px; padding: 6px; }
.spot-bar {
  position: absolute; left: 4px; width: 2px; border-radius: 2px; background: #f97316;
  box-shadow: 2px 0 5px rgba(249, 115, 22, .8), 4px 0 11px rgba(249, 115, 22, .45);
  transition: top .3s cubic-bezier(.4, 0, .2, 1), height .3s cubic-bezier(.4, 0, .2, 1);
}
.spot-item {
  border: 0; background: transparent; color: #a9afb8; text-align: left;
  padding: 8px 12px; border-radius: 6px; transition: color .3s, background .3s;
}
.spot-item:hover { background: rgba(255, 255, 255, .03); }
.spot-item.active { color: #f6f7f8; }` },
];

export const categories = ["All", "Inputs", "Navigation"];
