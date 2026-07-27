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
  { id: "expanding-contact-button", name: "Expanding Contact Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A pill-shaped call-to-action with an expanding background and arrow icon, adapted from the supplied Webflow export.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button type="button" className="contact-pill">
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
.contact-pill:focus-visible { width: 145px; background: #f4f4f5; color: #111; }
.contact-pill:hover > span:last-child,
.contact-pill:focus-visible > span:last-child { opacity: 1; transform: translateX(0); }
.contact-pill:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "contact-reveal-button", name: "Contact Reveal Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A circular arrow and label that resolve into a polished contact pill on hover.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function ContactRevealButton() {
  return (
    <button type="button" className="contact-reveal">
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
.contact-reveal:focus-visible { color: #111; }
.contact-reveal:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "subscribe-shine-button", name: "Subscribe Shine Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A dark subscribe pill with a rotating highlight that traces its edge on hover.", new: true, code: `export function SubscribeShineButton() {
  return (
    <button type="button" className="subscribe-shine">
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
  { id: "next-reveal-button", name: "Next Reveal Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined arrow control that expands into a bright Next button on hover.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button type="button" className="next-reveal">
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
}
.next-reveal:hover .next-reveal-label,
.next-reveal:focus-visible .next-reveal-label { opacity: 1; transform: translateY(0); }
.next-reveal:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "pricing-slide-link", name: "Pricing Slide Link", category: "Click feedback", framework: "CSS", type: "Hover", description: "A text link whose arrow slides in from the left as the label settles into place.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function PricingSlideLink() {
  return (
    <button type="button" className="pricing-slide">
      <span className="pricing-slide-icon" aria-hidden="true">
        <ArrowRight size={23} strokeWidth={2.25} />
      </span>
      <span className="pricing-slide-label">Pricing</span>
    </button>
  );
}

/* pricing-slide-link.css */
.pricing-slide {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0;
  color: #f0f0f0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.pricing-slide-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  transform: translateX(-150%);
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.pricing-slide-label {
  transform: translateX(-16px);
  transition: transform .5s cubic-bezier(.16, 1, .3, 1);
}
.pricing-slide:hover .pricing-slide-icon,
.pricing-slide:focus-visible .pricing-slide-icon { transform: translateX(0); }
.pricing-slide:hover .pricing-slide-label,
.pricing-slide:focus-visible .pricing-slide-label { transform: translateX(0); }
.pricing-slide:focus-visible { outline: 2px solid #f97316; outline-offset: 5px; }` },
  { id: "spotlight-indicator", name: "Spotlight Indicator", category: "Navigation", framework: "React", type: "Click", description: "A glowing rail that slides to the active item in a vertical nav — the same indicator powering this site's sidebar.", new: true, dependency: "lucide-react", code: `import { useEffect, useRef, useState } from "react";
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
.spot-item.active .spot-item-icon { opacity: 1; color: #f97316; }` },
  { id: "read-more-swap", name: "Read More Swap", category: "Click feedback", framework: "CSS", type: "Hover", description: "A text link whose arrow swaps from the right side to an orange leading arrow on hover.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function ReadMoreSwap() {
  return (
    <button type="button" className="read-more-swap">
      <ArrowRight className="read-more-arrow read-more-arrow-left" size={25} strokeWidth={2.5} />
      <span>Read more</span>
      <ArrowRight className="read-more-arrow read-more-arrow-right" size={25} strokeWidth={2.5} />
    </button>
  );
}

/* read-more-swap.css */
.read-more-swap { display: inline-flex; align-items: center; gap: 12px; height: 48px; border: 0; overflow: hidden; background: transparent; color: #f0f0f0; font-size: 16px; font-weight: 500; }
.read-more-arrow { flex: 0 0 25px; width: 25px; transition: flex-basis .24s ease, width .24s ease, opacity .2s ease, transform .24s ease; }
.read-more-arrow-left { flex-basis: 0; width: 0; color: #f97316; opacity: 0; transform: translateX(-12px); }
.read-more-swap:hover .read-more-arrow-left, .read-more-swap:focus-visible .read-more-arrow-left { flex-basis: 25px; width: 25px; opacity: 1; transform: translateX(0); }
.read-more-swap:hover .read-more-arrow-right, .read-more-swap:focus-visible .read-more-arrow-right { flex-basis: 0; width: 0; opacity: 0; transform: translateX(12px); }
.read-more-swap:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "projects-arrow-button", name: "Projects Arrow Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A Projects label paired with an outlined circular arrow that slides through itself on hover.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function ProjectsArrowButton() {
  return (
    <button type="button" className="projects-arrow-button">
      <span>Projects</span>
      <span className="projects-arrow-icon" aria-hidden="true">
        <ArrowRight className="projects-arrow projects-arrow-current" size={18} strokeWidth={2.4} />
        <ArrowRight className="projects-arrow projects-arrow-incoming" size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}

/* projects-arrow-button.css */
.projects-arrow-button { display: inline-flex; align-items: center; gap: 9px; border: 0; background: transparent; color: #f0f0f0; font-size: 16px; font-weight: 500; letter-spacing: .5px; }
.projects-arrow-icon { position: relative; display: grid; width: 32px; height: 32px; place-items: center; overflow: hidden; border: 1px solid currentColor; border-radius: 999px; }
.projects-arrow { position: absolute; transition: transform .48s cubic-bezier(.16, 1, .3, 1); }
.projects-arrow-incoming { transform: translateX(-25px); }
.projects-arrow-button:hover .projects-arrow-current, .projects-arrow-button:focus-visible .projects-arrow-current { transform: translateX(25px); }
.projects-arrow-button:hover .projects-arrow-incoming, .projects-arrow-button:focus-visible .projects-arrow-incoming { transform: translateX(0); }
.projects-arrow-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "whats-new-glow-button", name: "What's New Glow Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A dark, fully rounded button whose orange and blue glows follow the cursor.", new: true, dependency: "lucide-react", code: `import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", \`\${position}%\`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--glow-x", "50%");
  };

  return (
    <button type="button" className="whats-new-button" onPointerMove={updateGlow} onPointerLeave={resetGlow}>
      <span className="whats-new-content">
        <ArrowRight size={16} strokeWidth={2.5} />
        What's new
      </span>
      <span className="whats-new-glow whats-new-glow-orange" aria-hidden="true" />
      <span className="whats-new-glow whats-new-glow-blue" aria-hidden="true" />
    </button>
  );
}

/* whats-new-glow-button.css */
.whats-new-button { --glow-x: 50%; position: relative; display: inline-flex; align-items: center; justify-content: center; min-height: 42px; overflow: hidden; border: 1px solid #36383d; border-radius: 999px; background: #0e0e10; padding: 0 18px; color: #f0f0f0; font-size: 16px; font-weight: 500; }
.whats-new-content { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 9px; }
.whats-new-glow { position: absolute; bottom: -108%; width: 112%; height: 180%; border-radius: 999px; filter: blur(23px); opacity: .28; transition: left .22s cubic-bezier(.16, 1, .3, 1), transform .45s cubic-bezier(.16, 1, .3, 1), opacity .3s ease; }
.whats-new-glow-orange { left: calc(var(--glow-x) - 78%); background: linear-gradient(145deg, #ffbe91, #f97316 43%, #7a2808); }
.whats-new-glow-blue { left: calc(var(--glow-x) - 30%); background: linear-gradient(145deg, #77e1e6, #2187d7 45%, #192b8a); }
.whats-new-button:hover .whats-new-glow, .whats-new-button:focus-visible .whats-new-glow { transform: translateY(-19px); opacity: 1; }
.whats-new-button:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }` },
  { id: "preview-browser-button", name: "Preview in Browser Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined pill button with a diagonal arrow that slides through on hover.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function PreviewInBrowserButton() {
  return (
    <button type="button" className="preview-browser-button">
      <span>Preview in browser</span>
      <span className="preview-browser-icon" aria-hidden="true">
        <ArrowRight className="preview-browser-arrow preview-browser-arrow-current" size={17} strokeWidth={2.4} />
        <ArrowRight className="preview-browser-arrow preview-browser-arrow-incoming" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}

/* preview-browser-button.css */
.preview-browser-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #f0f0f0;
  border-radius: 999px;
  background: transparent;
  padding: 12px 24px;
  color: #f0f0f0;
  font-size: 16px;
  font-weight: 500;
}
.preview-browser-icon {
  position: relative;
  display: grid;
  width: 17px;
  height: 20px;
  place-items: center;
  overflow: hidden;
}
.preview-browser-arrow {
  position: absolute;
  transform: rotate(-45deg);
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}
.preview-browser-arrow-incoming {
  transform: translate(-16px, 12px) rotate(-45deg);
}
.preview-browser-button:hover .preview-browser-arrow-current,
.preview-browser-button:focus-visible .preview-browser-arrow-current {
  transform: translate(16px, -12px) rotate(-45deg);
}
.preview-browser-button:hover .preview-browser-arrow-incoming,
.preview-browser-button:focus-visible .preview-browser-arrow-incoming {
  transform: translate(0, 0) rotate(-45deg);
}
.preview-browser-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 3px;
}` },
  { id: "download-ios-button", name: "Download for iOS Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined iOS download button whose arrow reveals without changing its width.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

function AppleMark() {
  return (
    <svg className="download-ios-apple" width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M13.5621 5.45739C13.4857 5.50195 11.6671 6.44248 11.6671 8.52785C11.7528 10.9061 13.9621 11.7401 14 11.7401C13.9621 11.7847 13.6665 12.8763 12.7907 14.0205C12.0956 15.0062 11.3242 16 10.1528 16C9.0385 16 8.6385 15.3431 7.35278 15.3431C5.97203 15.3431 5.58135 16 4.5242 16C3.35277 16 2.52419 14.953 1.79127 13.9766C.839096 12.6986.0297778 10.6931.00120634 8.76747C-.0180484 7.74707.19189 6.74403.72481 5.89206C1.47699 4.70265 2.81985 3.89524 4.28631 3.86862C5.40992 3.83331 6.40992 4.58747 7.09563 4.58747C7.75278 4.58747 8.98135 3.86862 10.3714 3.86862C10.9714 3.86919 12.5714 4.03762 13.5621 5.45739ZM7.0006 3.66488C6.8006 2.73303 7.35278 1.80119 7.86706 1.20677C8.52421.487918 9.5621 0 10.4571 0C10.5143.931848 10.1522 1.84575 9.50496 2.51136C8.92421 3.23021 7.92421 3.77138 7.0006 3.66488Z" fill="currentColor" />
    </svg>
  );
}

export function DownloadIOSButton() {
  return (
    <button type="button" className="download-ios-button">
      <span className="download-ios-content">
        <AppleMark />
        <span className="download-ios-label">Download for iOS</span>
        <span className="download-ios-arrow" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}

/* download-ios-button.css */
.download-ios-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 228px;
  min-height: 56px;
  overflow: hidden;
  border: 1px solid #ffffff14;
  border-radius: 12px;
  background: transparent;
  padding: 8px 16px;
  color: #f0f0f0;
}
.download-ios-content {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.download-ios-apple {
  width: 24px;
  height: 24px;
  flex: none;
  color: #f0f0f0;
  transition: width .52s cubic-bezier(.16, 1, .3, 1), margin .52s cubic-bezier(.16, 1, .3, 1), opacity .24s ease, transform .52s cubic-bezier(.16, 1, .3, 1);
}
.download-ios-label {
  position: relative;
  z-index: 1;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
}
.download-ios-arrow {
  display: grid;
  width: 0;
  height: 24px;
  margin-left: -8px;
  overflow: hidden;
  place-items: center;
  opacity: 0;
  transform: translateX(18px);
  transition: width .52s cubic-bezier(.16, 1, .3, 1), margin .52s cubic-bezier(.16, 1, .3, 1), opacity .24s ease, transform .52s cubic-bezier(.16, 1, .3, 1);
}
.download-ios-button:hover .download-ios-apple,
.download-ios-button:focus-visible .download-ios-apple {
  width: 0;
  margin-right: -8px;
  opacity: 0;
  transform: translateX(-18px);
}
.download-ios-button:hover .download-ios-arrow,
.download-ios-button:focus-visible .download-ios-arrow {
  width: 24px;
  margin-left: 0;
  opacity: 1;
  transform: translateX(0);
}
.download-ios-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 3px;
}` },
  { id: "magnetic-fill-button", name: "Magnetic Fill Button", category: "Click feedback", framework: "React", type: "Hover", description: "A magnetic pill button with a bottom-to-top background fill.", new: true, code: `import type { PointerEvent as ReactPointerEvent } from "react";

export function MagneticFillButton() {
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * .14;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * .22;
    event.currentTarget.style.setProperty("--magnetic-x", \`\${x}px\`);
    event.currentTarget.style.setProperty("--magnetic-y", \`\${y}px\`);
  };
  const reset = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <button type="button" className="magnetic-fill-button" onPointerMove={move} onPointerLeave={reset}>
      <span className="magnetic-fill-label">Start a project</span>
      <span className="magnetic-fill-background" aria-hidden="true" />
    </button>
  );
}

/* magnetic-fill-button.css */
.magnetic-fill-button {
  --magnetic-x: 0px;
  --magnetic-y: 0px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 100px;
  background: transparent;
  padding: 12px 32px;
  color: #f0f0f0;
  transform: translate(var(--magnetic-x), var(--magnetic-y));
  transition: transform .22s cubic-bezier(.16, 1, .3, 1), color .28s ease;
}
.magnetic-fill-label {
  position: relative;
  z-index: 1;
  color: inherit;
  font-size: 16px;
  font-weight: 500;
}
.magnetic-fill-background {
  position: absolute;
  inset: auto 0 0;
  height: 0;
  background: #f97316;
  transition: height .38s cubic-bezier(.16, 1, .3, 1);
}
.magnetic-fill-button:hover,
.magnetic-fill-button:focus-visible {
  color: #111;
}
.magnetic-fill-button:hover .magnetic-fill-background,
.magnetic-fill-button:focus-visible .magnetic-fill-background {
  height: 100%;
}
.magnetic-fill-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "project-text-swap-button", name: "Project Text Swap Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined pill whose duplicated label swaps vertically on hover.", new: true, code: `export function ProjectTextSwapButton() {
  return (
    <button type="button" className="project-text-swap-button">
      <span className="project-text-swap-label project-text-swap-label-current">
        Start a Project
      </span>
      <span
        className="project-text-swap-label project-text-swap-label-incoming"
        aria-hidden="true"
      >
        Start a Project
      </span>
    </button>
  );
}

/* project-text-swap-button.css */
.project-text-swap-button {
  box-sizing: border-box;
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 176px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 999px;
  background: transparent;
  padding: 12px 32px;
  color: #f0f0f0;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.project-text-swap-label {
  z-index: 1;
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  transition: transform .36s cubic-bezier(.16, 1, .3, 1), opacity .22s ease;
}
.project-text-swap-label-current {
  position: relative;
}
.project-text-swap-label-incoming {
  position: absolute;
  opacity: 0;
  transform: translateY(160%);
}
.project-text-swap-button:hover .project-text-swap-label-current,
.project-text-swap-button:focus-visible .project-text-swap-label-current {
  opacity: 0;
  transform: translateY(-160%);
}
.project-text-swap-button:hover .project-text-swap-label-incoming,
.project-text-swap-button:focus-visible .project-text-swap-label-incoming {
  opacity: 1;
  transform: translateY(0);
}
.project-text-swap-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "view-more-text-swap", name: "View More Text Swap", category: "Click feedback", framework: "CSS", type: "Hover", description: "A borderless View More label that swaps vertically on hover.", new: true, code: `export function ViewMoreTextSwap() {
  return (
    <button type="button" className="view-more-text-swap">
      <span className="view-more-text-swap-label view-more-text-swap-label-current">
        View More
      </span>
      <span
        className="view-more-text-swap-label view-more-text-swap-label-incoming"
        aria-hidden="true"
      >
        View More
      </span>
    </button>
  );
}

/* view-more-text-swap.css */
.view-more-text-swap {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.view-more-text-swap-label {
  z-index: 1;
  display: flex;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  transition: transform .36s cubic-bezier(.16, 1, .3, 1), opacity .22s ease;
}
.view-more-text-swap-label-current {
  position: relative;
}
.view-more-text-swap-label-incoming {
  position: absolute;
  opacity: 0;
  transform: translateY(160%);
}
.view-more-text-swap:hover .view-more-text-swap-label-current,
.view-more-text-swap:focus-visible .view-more-text-swap-label-current {
  opacity: 0;
  transform: translateY(-160%);
}
.view-more-text-swap:hover .view-more-text-swap-label-incoming,
.view-more-text-swap:focus-visible .view-more-text-swap-label-incoming {
  opacity: 1;
  transform: translateY(0);
}
.view-more-text-swap:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "gradient-underline-button", name: "Gradient Underline Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A label that scales up as a warm gradient underline grows across it.", new: true, code: `export function GradientUnderlineButton() {
  return (
    <button type="button" className="gradient-underline-button">
      <span className="gradient-underline-button-label">HOVER ME</span>
      <span className="gradient-underline-button-line" aria-hidden="true" />
    </button>
  );
}

/* gradient-underline-button.css */
.gradient-underline-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 8px 24px;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.gradient-underline-button-label {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  transition: transform .5s ease;
}
.gradient-underline-button-line {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(351deg, transparent 20%, #f97316 52%, transparent 85%);
  transition: width 1s cubic-bezier(.165, .84, .44, 1);
}
.gradient-underline-button:hover .gradient-underline-button-label,
.gradient-underline-button:focus-visible .gradient-underline-button-label {
  transform: scale(1.2);
}
.gradient-underline-button:hover .gradient-underline-button-line,
.gradient-underline-button:focus-visible .gradient-underline-button-line {
  width: 100%;
}
.gradient-underline-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "yellow-fill-preview-button", name: "Yellow Fill Preview Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined Preview in browser button that fills with yellow from the left.", new: true, code: `export function YellowFillPreviewButton() {
  return (
    <button type="button" className="yellow-fill-preview-button">
      <span className="yellow-fill-preview-button-label">Preview in browser</span>
      <span className="yellow-fill-preview-button-fill" aria-hidden="true" />
    </button>
  );
}

/* yellow-fill-preview-button.css */
.yellow-fill-preview-button {
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  border-radius: 999px;
  background: transparent;
  padding: 12px 24px;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
.yellow-fill-preview-button-label {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  transition: color .3s ease;
}
.yellow-fill-preview-button-fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0;
  background: #f97316;
  transition: width .5s cubic-bezier(.16, 1, .3, 1);
}
.yellow-fill-preview-button:hover .yellow-fill-preview-button-label,
.yellow-fill-preview-button:focus-visible .yellow-fill-preview-button-label {
  color: #111;
}
.yellow-fill-preview-button:hover .yellow-fill-preview-button-fill,
.yellow-fill-preview-button:focus-visible .yellow-fill-preview-button-fill {
  width: 100%;
}
.yellow-fill-preview-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "circle-surface-button", name: "Circle Surface Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A circular CTA whose dark surface expands into an orange fill.", new: true, code: `export function CircleSurfaceButton() {
  return <button type="button" className="circle-surface-button"><span>CLICK HERE</span><span aria-hidden="true" /></button>;
}

/* circle-surface-button.css */
.circle-surface-button { position: relative; display: grid; width: 128px; height: 128px; place-items: center; overflow: hidden; border: 1px solid #f0f0f0; border-radius: 50%; background: transparent; color: #f0f0f0; cursor: pointer; }
.circle-surface-button > span:first-child { position: relative; z-index: 1; font-size: 13px; transition: color .3s ease; }
.circle-surface-button > span:last-child { position: absolute; inset: 0; border-radius: inherit; background: #323232; transition: transform .5s cubic-bezier(.16, 1, .3, 1), background-color .5s ease; }
.circle-surface-button:hover > span:first-child, .circle-surface-button:focus-visible > span:first-child { color: #111; }
.circle-surface-button:hover > span:last-child, .circle-surface-button:focus-visible > span:last-child { background: #f97316; transform: scale(1.1); }
.circle-surface-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "inset-circle-button", name: "Inset Circle Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A circular project CTA that reveals its dark base as the inset surface collapses.", new: true, code: `export function InsetCircleButton() {
  return <button type="button" className="inset-circle-button"><span>View Project</span><span aria-hidden="true" /></button>;
}

/* inset-circle-button.css */
.inset-circle-button { position: relative; display: grid; width: 128px; height: 128px; place-items: center; overflow: hidden; border: 1px solid #f0f0f0; border-radius: 50%; background: #1f1f1f; color: #111; cursor: pointer; }
.inset-circle-button > span:first-child { position: relative; z-index: 1; font-size: 13px; font-weight: 700; transition: color .42s ease; }
.inset-circle-button > span:last-child { position: absolute; inset: 4px; border-radius: 50%; background: #f0f0f0; clip-path: circle(75% at 50% 50%); will-change: clip-path; transition: clip-path .52s cubic-bezier(.16, 1, .3, 1); }
.inset-circle-button:hover > span:first-child, .inset-circle-button:focus-visible > span:first-child { color: #f0f0f0; }
.inset-circle-button:hover > span:last-child, .inset-circle-button:focus-visible > span:last-child { clip-path: circle(0% at 50% 50%); }
.inset-circle-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "sliding-arrow-label", name: "Sliding Arrow Label", category: "Click feedback", framework: "CSS", type: "Hover", description: "A text label that gets a bright surface while an arrow slides in beside it.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function SlidingArrowLabel() {
  return <button type="button" className="sliding-arrow-label"><span className="sliding-arrow-label-copy">Create a blog</span><span className="sliding-arrow-label-icon" aria-hidden="true"><ArrowRight size={16} strokeWidth={2.4} /></span></button>;
}

/* sliding-arrow-label.css */
.sliding-arrow-label { position: relative; display: inline-flex; align-items: center; overflow: hidden; border: 0; background: transparent; padding-right: 24px; color: #f0f0f0; cursor: pointer; }
.sliding-arrow-label-copy { border-radius: 8px; padding: 4px 12px; font-size: 16px; font-weight: 500; transition: background-color .3s ease, color .3s ease; }
.sliding-arrow-label-icon { position: absolute; right: 0; display: flex; width: 16px; opacity: 0; transform: translateX(-10px); transition: opacity .2s ease, transform .35s cubic-bezier(.16, 1, .3, 1); }
.sliding-arrow-label:hover .sliding-arrow-label-copy, .sliding-arrow-label:focus-visible .sliding-arrow-label-copy { background: #f97316; color: #111; }
.sliding-arrow-label:hover .sliding-arrow-label-icon, .sliding-arrow-label:focus-visible .sliding-arrow-label-icon { opacity: 1; transform: translateX(0); }
.sliding-arrow-label:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "orange-circle-fill-button", name: "Orange Circle Fill Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An orange outlined pill that fills from a growing circle.", new: true, code: `export function OrangeCircleFillButton() {
  return <button type="button" className="orange-circle-fill-button"><span>View all projects</span><span aria-hidden="true" /></button>;
}

/* orange-circle-fill-button.css */
.orange-circle-fill-button { position: relative; display: inline-flex; align-items: center; justify-content: center; overflow: hidden; border: 1px solid #f97316; border-radius: 999px; background: #f973162b; padding: 16px 24px; color: #f97316; cursor: pointer; transition: transform .5s cubic-bezier(.16, 1, .3, 1); }
.orange-circle-fill-button > span:first-child { position: relative; z-index: 1; font-size: 18px; font-weight: 500; transition: color .3s ease; }
.orange-circle-fill-button > span:last-child { position: absolute; width: 240px; height: 240px; border-radius: 50%; background: #f97316; transform: scale(0); transition: transform .5s cubic-bezier(.16, 1, .3, 1); }
.orange-circle-fill-button:hover, .orange-circle-fill-button:focus-visible { transform: scale(1.06); }
.orange-circle-fill-button:hover > span:first-child, .orange-circle-fill-button:focus-visible > span:first-child { color: #111; }
.orange-circle-fill-button:hover > span:last-child, .orange-circle-fill-button:focus-visible > span:last-child { transform: scale(1); }
.orange-circle-fill-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "layered-gradient-button", name: "Layered Gradient Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A dimensional pill with gradient text and subtly shifting layered surfaces.", new: true, code: `export function LayeredGradientButton() {
  return <button type="button" className="layered-gradient-button"><span>View all projects</span><span className="layered-gradient-button-surface" aria-hidden="true" /><span className="layered-gradient-button-haze" aria-hidden="true" /></button>;
}

/* layered-gradient-button.css */
.layered-gradient-button { position: relative; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 999px; background: transparent; padding: 16px 24px; cursor: pointer; }
.layered-gradient-button > span:first-child { position: relative; z-index: 2; background: linear-gradient(to right, #f0f0f0, #464646 48%, #f0f0f0); background-clip: text; color: transparent; font-size: 18px; font-weight: 500; transition: transform .3s ease; }
.layered-gradient-button-surface { position: absolute; z-index: 1; inset: 0; border: 1px solid #f0f0f033; border-radius: inherit; background: radial-gradient(circle at 50% 100%, #111, #252525); transition: transform .3s ease; }
.layered-gradient-button-haze { position: absolute; z-index: 0; top: 4px; width: 104%; height: 98%; border-radius: inherit; background: #f0f0f080; opacity: 0; transform: scale(.8); transition: opacity .6s ease, transform .3s ease; }
.layered-gradient-button:hover > span:first-child, .layered-gradient-button:focus-visible > span:first-child { transform: scale(1.05); }
.layered-gradient-button:hover .layered-gradient-button-surface, .layered-gradient-button:focus-visible .layered-gradient-button-surface { transform: scale(1.05); }
.layered-gradient-button:hover .layered-gradient-button-haze, .layered-gradient-button:focus-visible .layered-gradient-button-haze { opacity: 1; transform: translateY(1px) scale(.98); }
.layered-gradient-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "glow-arrow-button", name: "Glow Arrow Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A bright CTA with a soft glow and a moving arrow on hover.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function GlowArrowButton() {
  return <button type="button" className="glow-arrow-button"><span>Get Started</span><ArrowRight aria-hidden="true" size={16} strokeWidth={2.3} /></button>;
}

/* glow-arrow-button.css */
.glow-arrow-button { display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 999px; background: #f0f0f0; padding: 16px 32px; color: #111; font-size: 16px; font-weight: 500; cursor: pointer; transition: box-shadow .3s ease; }
.glow-arrow-button svg { transition: transform .3s ease; }
.glow-arrow-button:hover, .glow-arrow-button:focus-visible { box-shadow: 0 3px 20px #f0f0f080; }
.glow-arrow-button:hover svg, .glow-arrow-button:focus-visible svg { transform: translateX(4px); }
.glow-arrow-button:focus-visible { outline: 2px solid #f97316; outline-offset: 4px; }` },
  { id: "talk-arrow-reveal-button", name: "Talk Arrow Reveal Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "An outlined Talk to us pill that fills with orange and reveals a long arrow.", new: true, code: `function LongArrowMark() {
  return (
    <svg viewBox="0 0 120 55" fill="none" aria-hidden="true">
      <path d="M95.2389 0.989578C93.8845 -0.376811 91.7407 -0.321332 90.4505 1.11345C89.1602 2.54775 89.2126 4.81806 90.5674 6.18445L95.2389 0.989578ZM114.277 30.0975C115.631 31.4638 117.775 31.4084 119.066 29.9736C120.356 28.5393 120.303 26.269 118.949 24.9026L114.277 30.0975ZM118.949 30.0975C120.303 28.7311 120.356 26.4608 119.066 25.0265C117.775 23.5917 115.631 23.5362 114.277 24.9026L118.949 30.0975ZM90.5674 48.8156C89.2126 50.1818 89.1602 52.4522 90.4505 53.8868C91.7407 55.3213 93.8845 55.3767 95.2389 54.0105L90.5674 48.8156ZM116.613 31.087C118.483 31.087 120 29.481 120 27.5C120 25.5191 118.483 23.9131 116.613 23.9131L116.613 31.087ZM3.38709 25.894C1.51647 25.894 -1.20206e-06 27.5 -1.11547e-06 29.481C-1.02888e-06 31.4619 1.51647 33.0679 3.38709 33.0679L3.38709 25.894ZM90.5674 6.18445L114.277 30.0975L118.949 24.9026L95.2389 0.989578L90.5674 6.18445ZM114.277 24.9026L90.5674 48.8156L95.2389 54.0105L118.949 30.0975L114.277 24.9026ZM116.613 23.9131L3.38709 25.894L3.38709 33.0679L116.613 31.087L116.613 23.9131Z" fill="currentColor" />
    </svg>
  );
}

export function TalkArrowRevealButton() {
  return (
    <button type="button" className="talk-arrow-reveal-button">
      <span className="talk-arrow-reveal-label">Talk to us</span>
      <span className="talk-arrow-reveal-icon">
        <LongArrowMark />
      </span>
    </button>
  );
}

/* talk-arrow-reveal-button.css */
.talk-arrow-reveal-button {
  box-sizing: border-box;
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  min-height: 48px;
  overflow: hidden;
  border: 1px solid #f0f0f033;
  border-radius: 999px;
  background: transparent;
  padding: 8px 24px;
  color: #f0f0f0;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color .24s ease, color .24s ease;
}
.talk-arrow-reveal-label {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  transition: transform .38s cubic-bezier(.16, 1, .3, 1), opacity .18s ease;
}
.talk-arrow-reveal-icon {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111;
  transform: translateX(-80px);
  transition: transform .38s cubic-bezier(.16, 1, .3, 1);
}
.talk-arrow-reveal-icon svg {
  display: block;
  width: 48px;
  height: auto;
}
.talk-arrow-reveal-button:hover,
.talk-arrow-reveal-button:focus-visible {
  background: #f97316;
  color: #111;
}
.talk-arrow-reveal-button:hover .talk-arrow-reveal-label,
.talk-arrow-reveal-button:focus-visible .talk-arrow-reveal-label {
  opacity: 0;
  transform: translateX(128px);
}
.talk-arrow-reveal-button:hover .talk-arrow-reveal-icon,
.talk-arrow-reveal-button:focus-visible .talk-arrow-reveal-icon {
  transform: translateX(0);
}
.talk-arrow-reveal-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "see-more-swap-button", name: "See More Swap Button", category: "Click feedback", framework: "CSS", type: "Hover", description: "A pill button whose arrow circle swaps sides while its surface changes color.", new: true, dependency: "lucide-react", code: `import { ArrowDown } from "lucide-react";

export function SeeMoreSwapButton() {
  return (
    <button type="button" className="see-more-swap-button">
      <span className="see-more-swap-content">
        <span className="see-more-swap-icon see-more-swap-icon-left" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
        <span className="see-more-swap-label">See more</span>
        <span className="see-more-swap-icon see-more-swap-icon-right" aria-hidden="true">
          <ArrowDown size={20} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}

/* see-more-swap-button.css */
.see-more-swap-button {
  box-sizing: border-box;
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 196px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: #f0f0f0;
  padding: 12px 16px;
  color: #101016;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  transition: background-color .42s cubic-bezier(.16, 1, .3, 1), color .42s cubic-bezier(.16, 1, .3, 1);
}
.see-more-swap-content {
  position: relative;
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.see-more-swap-label {
  position: relative;
  z-index: 1;
  white-space: nowrap;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  transform: translateX(16px);
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}
.see-more-swap-icon {
  position: absolute;
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 50%;
  transition: transform .42s cubic-bezier(.16, 1, .3, 1);
}
.see-more-swap-icon-left {
  left: 0;
  background: #101016;
  color: #fff;
}
.see-more-swap-icon-right {
  right: 0;
  background: #fff;
  color: #101016;
  transform: translateX(64px);
}
.see-more-swap-button:hover,
.see-more-swap-button:focus-visible {
  background: #22222d;
  color: #f0f0f0;
}
.see-more-swap-button:hover .see-more-swap-icon-left,
.see-more-swap-button:focus-visible .see-more-swap-icon-left {
  transform: translateX(-64px);
}
.see-more-swap-button:hover .see-more-swap-icon-right,
.see-more-swap-button:focus-visible .see-more-swap-icon-right {
  transform: translateX(0);
}
.see-more-swap-button:hover .see-more-swap-label,
.see-more-swap-button:focus-visible .see-more-swap-label {
  transform: translateX(-16px);
}
.see-more-swap-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
  { id: "contact-underline-button", name: "Contact Underline Button", category: "Click feedback", framework: "React", type: "Hover", description: "A compact contact action whose icon turns orange while an underline draws beneath the label.", new: true, dependency: "lucide-react", code: `import { ArrowRight } from "lucide-react";

export function ContactUnderlineButton() {
  return (
    <button type="button" className="contact-underline-button">
      <span className="contact-underline-icon" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={2.5} />
      </span>
      <span className="contact-underline-copy">
        <span>Get in touch</span>
        <span className="contact-underline-line" />
      </span>
    </button>
  );
}

/* contact-underline-button.css */
.contact-underline-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  overflow: hidden;
  border: 0;
  background: transparent;
  padding: 0 16px 0 0;
  color: #f0f0f0;
  font: inherit;
  cursor: pointer;
}
.contact-underline-icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 32px;
  height: 32px;
  flex: none;
  place-items: center;
  border-radius: 8px;
  background: #f0f0f0;
  color: #000;
  transition: background-color .45s cubic-bezier(.16, 1, .3, 1);
}
.contact-underline-icon svg {
  transition: transform .45s cubic-bezier(.16, 1, .3, 1);
}
.contact-underline-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 4px;
  padding: 8px 0;
}
.contact-underline-copy > span:first-child {
  position: relative;
  z-index: 1;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
}
.contact-underline-line {
  width: 100%;
  height: 1px;
  background: #f0f0f0;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform .45s cubic-bezier(.16, 1, .3, 1);
}
.contact-underline-button:hover .contact-underline-icon,
.contact-underline-button:focus-visible .contact-underline-icon {
  background: #f97316;
}
.contact-underline-button:hover .contact-underline-icon svg,
.contact-underline-button:focus-visible .contact-underline-icon svg {
  transform: scale(1.35);
}
.contact-underline-button:hover .contact-underline-line,
.contact-underline-button:focus-visible .contact-underline-line {
  transform: scaleX(1);
}
.contact-underline-button:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 4px;
}` },
];

export const categories = ["All", "Inputs", "Navigation"];
