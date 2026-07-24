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
  { id: "focus-input", name: "Focus Field", category: "Inputs", framework: "CSS", type: "Focus", description: "An input with a clean animated focus treatment.", code: `export function FocusField() {
  return (
    <label className="demo-input">
      <span>Project name</span>
      <input placeholder="e.g. microkit-web" />
    </label>
  );
}

/* focus-field.css */
.demo-input { width: 210px; display: block; }
.demo-input span {
  display: block;
  margin: 0 0 7px;
  color: #9298a1;
  font: 10px ui-monospace, SFMono-Regular, Menlo, monospace;
}
.demo-input input {
  width: 100%;
  border: 1px solid #363a42;
  border-radius: 5px;
  background: #15171b;
  padding: 8px;
  color: #e8ebee;
  font-size: 11px;
  outline: 0;
}
.demo-input input:focus {
  border-color: #f97316;
  box-shadow: 0 0 0 3px #f9731625;
}` },
  { id: "expanding-contact-button", name: "Expanding Contact Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A pill-shaped call-to-action with an expanding background and arrow icon, adapted from the supplied Webflow export.", new: true, code: `import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button className="contact-pill">
      <span className="contact-pill-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span>Get in touch</span>
    </button>
  );
}

/* expanding-contact-button.css */
.contact-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 36px;
  gap: 0;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  padding: 0;
  background: transparent;
  color: #f0f0f0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: width .32s cubic-bezier(.4, 0, .2, 1), background-color .32s cubic-bezier(.4, 0, .2, 1), color .28s ease;
}
.contact-pill::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f97316;
}
.contact-pill-icon,
.contact-pill > span:last-child { position: relative; z-index: 1; }
.contact-pill-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  color: #111;
}
.contact-pill > span:last-child {
  position: absolute;
  left: 47px;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity .18s ease .1s, transform .24s ease .06s;
}
.contact-pill:hover,
.contact-pill:focus-visible { width: 145px; background: #f4f4f5; color: #111; outline: 0; }
.contact-pill:hover > span:last-child,
.contact-pill:focus-visible > span:last-child { opacity: 1; transform: translateX(0); }` },
  { id: "contact-reveal-button", name: "Contact Reveal Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A circular arrow and label that resolve into a polished contact pill on hover.", new: true, code: `import { ArrowRight } from "lucide-react";

export function ContactRevealButton() {
  return (
    <button className="contact-reveal">
      <span className="contact-reveal-icon" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span>Get in touch</span>
    </button>
  );
}

/* contact-reveal-button.css */
.contact-reveal {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-sizing: border-box;
  width: 145px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  padding: 0 15px 0 0;
  background: transparent;
  color: #f0f0f0;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  transition: color .28s ease;
}
.contact-reveal::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 36px;
  border-radius: inherit;
  background: #f0f0f0;
  transition: width .32s cubic-bezier(.4, 0, .2, 1);
}
.contact-reveal-icon,
.contact-reveal > span:last-child { position: relative; z-index: 1; }
.contact-reveal-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: none;
  border-radius: 50%;
  color: #111;
  transition: background-color .2s ease .12s;
}
.contact-reveal:hover::before,
.contact-reveal:focus-visible::before { width: 100%; }
.contact-reveal:hover .contact-reveal-icon,
.contact-reveal:focus-visible .contact-reveal-icon { background: #f97316; }
.contact-reveal:hover,
.contact-reveal:focus-visible { color: #111; outline: 0; }` },
  { id: "subscribe-shine-button", name: "Subscribe Shine Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A dark subscribe pill with a rotating highlight that traces its edge on hover.", new: true, code: `export function SubscribeShineButton() {
  return (
    <button className="subscribe-shine">
      <span className="subscribe-shine-gradient" aria-hidden="true" />
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
  transition: transform 1s linear;
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
.subscribe-shine:hover .subscribe-shine-gradient,
.subscribe-shine:focus-visible .subscribe-shine-gradient {
  transform: rotate(360deg);
  transition-duration: 3s;
}
.subscribe-shine:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }` },
  { id: "next-reveal-button", name: "Next Reveal Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined arrow control that expands into a bright Next button on hover.", new: true, code: `import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button className="next-reveal">
      <span className="next-reveal-label">Next</span>
      <ArrowRight className="next-reveal-arrow" size={27} strokeWidth={1.7} />
    </button>
  );
}

/* next-reveal-button.css */
.next-reveal {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  width: 110px;
  height: 42px;
  overflow: hidden;
  border: 1px solid #f0f0f033;
  border-radius: 999px;
  background: #171717;
  color: #f0f0f0;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color .3s cubic-bezier(.16, 1, .3, 1), border-color .3s cubic-bezier(.16, 1, .3, 1), color .3s cubic-bezier(.16, 1, .3, 1);
}
.next-reveal-label {
  position: absolute;
  left: 21px;
  font-size: 16px;
  font-weight: 400;
  opacity: 0;
  transform: translateY(160%);
  transition: opacity .3s cubic-bezier(.16, 1, .3, 1), transform .3s cubic-bezier(.16, 1, .3, 1);
}
.next-reveal-arrow { position: relative; z-index: 1; flex: none; }
.next-reveal:hover,
.next-reveal:focus-visible {
  border-color: transparent;
  background: #f97316;
  color: #171d1a;
  outline: 0;
}
.next-reveal:hover .next-reveal-label,
.next-reveal:focus-visible .next-reveal-label { opacity: 1; transform: translateY(0); }` },
  { id: "spotlight-indicator", name: "Spotlight Indicator", category: "Navigation", framework: "React", type: "Click", description: "A glowing rail that slides to the active item in a vertical nav — the same indicator powering this site's sidebar.", new: true, code: `import { useEffect, useRef, useState } from "react";
import { Clock, Heart, Layers } from "lucide-react";

const items = [
  { label: "All components", Icon: Layers },
  { label: "Recently viewed", Icon: Clock },
  { label: "Favorites", Icon: Heart },
];

export function SpotlightIndicator() {
  const navRef = useRef(null);
  const barRef = useRef(null);
  const buttonRefs = useRef([]);
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
          key={label}
          ref={(element) => { buttonRefs.current[index] = element; }}
          className={\`spot-item \${active === index ? "active" : ""}\`}
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
.spot-item:hover { background: #17191d; color: #e4e6e9; }
.spot-item.active { color: #f6f7f8; }
.spot-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  opacity: .4;
  transition: opacity .3s cubic-bezier(.4, 0, .2, 1), color .3s;
}
.spot-item.active .spot-item-icon { opacity: 1; color: #f97316; }` },
];

export const categories = ["All", "Inputs", "Navigation"];
