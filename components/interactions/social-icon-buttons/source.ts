export const componentCode = `import { ArrowRight } from "lucide-react";

const socials = [
  { label: "LinkedIn", href: "#", brand: "#0a66c2", icon: "linkedin" },
  { label: "GitHub", href: "#", brand: "#f0f0f0", icon: "github" },
  { label: "Instagram", href: "#", brand: "#e4405f", icon: "instagram" },
];

function SocialIcon({ name }) { /* render your inline LinkedIn, GitHub, or Instagram SVG here */ }

export function SocialIconButtons() {
  return <div className="social-icon-buttons">{socials.map((social) => <a className="social-icon-button" href={social.href} key={social.label} aria-label={social.label} style={{ "--social-brand": social.brand }}><span className="social-icon-button-swap"><SocialIcon name={social.icon} /></span><span className="social-icon-button-swap social-icon-button-arrow"><ArrowRight size={15} strokeWidth={1.9} /></span></a>)}</div>;
}

/* social-icon-buttons.css */
.social-icon-buttons { display: flex; align-items: center; gap: 8px; }
.social-icon-button { position: relative; display: grid; width: 36px; height: 36px; place-items: center; overflow: hidden; border: 1px solid #2b2b34; border-radius: 50%; background: #101015; color: #e8e8ec; text-decoration: none; transition: border-color .2s ease, box-shadow .2s ease; }
.social-icon-button-swap { display: grid; place-items: center; transition: transform .32s cubic-bezier(.22, 1, .36, 1); }
.social-icon-button-swap svg { width: 16px; height: 16px; }
.social-icon-button-arrow { position: absolute; transform: translateY(260%); }
.social-icon-button:hover .social-icon-button-swap:not(.social-icon-button-arrow), .social-icon-button:focus-visible .social-icon-button-swap:not(.social-icon-button-arrow) { transform: translateY(-260%); }
.social-icon-button:hover .social-icon-button-arrow, .social-icon-button:focus-visible .social-icon-button-arrow { transform: translateY(0); color: var(--social-brand); }
.social-icon-button:hover, .social-icon-button:focus-visible { border-color: var(--social-brand); outline: none; box-shadow: 0 0 18px color-mix(in srgb, var(--social-brand) 55%, transparent); }
.social-icon-button:focus-visible { outline: 2px solid var(--social-brand); outline-offset: 4px; }`;

export const tailwindCode = `import { ArrowRight } from "lucide-react";

export function SocialIconButtons() {
  return <div className="flex items-center gap-2">{socials.map((social) => <a className="group relative grid size-9 place-items-center overflow-hidden rounded-full border border-[#2b2b34] bg-[#101015] text-[#e8e8ec] no-underline transition-[border-color,box-shadow] duration-200 hover:border-[var(--social-brand)] hover:shadow-[0_0_18px_color-mix(in_srgb,var(--social-brand)_55%,transparent)] focus-visible:border-[var(--social-brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--social-brand)]" href={social.href} key={social.label} style={{ "--social-brand": social.brand }}><span className="grid place-items-center transition-transform duration-[320ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-[260%] group-focus-visible:-translate-y-[260%]"><SocialIcon name={social.icon} /></span><span className="absolute grid translate-y-[260%] place-items-center text-[var(--social-brand)] transition-transform duration-[320ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"><ArrowRight size={15} strokeWidth={1.9} /></span></a>)}</div>;
}`;
