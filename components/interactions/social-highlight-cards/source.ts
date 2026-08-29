export const componentCode = `import "./social-highlight-cards.css";

const socials = [
  { label: "Henrique Barone on LinkedIn", href: "https://www.linkedin.com/in/hbarone/", highlight: "#0a66c2", icon: "linkedin" },
  { label: "Henrique Barone on GitHub", href: "https://github.com/henriquegpb", highlight: "#f0f0f0", icon: "github" },
  { label: "Henrique Barone on Instagram", href: "https://www.instagram.com/henrique_barone/", highlight: "#e4405f", icon: "instagram" },
];

function SocialIcon({ name = "linkedin" }) {
  if (name === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.1 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.3 8.9h3.6V20H3.3V8.9Zm5.8 0h3.4v1.5h.1c.5-.9 1.6-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.1V8.9Z" /></svg>;
  }

  if (name === "github") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.36-1.2-3.36-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.89v2.8c0 .28.18.6.69.5A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" /></svg>;
}

export function SocialHighlightCards() {
  return (
    <nav className="social-highlight-cards" aria-label="Social links">
      {socials.map((social) => (
        <a
          className="social-highlight-card"
          href={social.href}
          key={social.href}
          target="_blank"
          rel="noreferrer"
          title={social.label}
          aria-label={social.label}
          style={{ color: social.highlight }}
        >
          <span className="social-highlight-card__glow" aria-hidden="true" />
          <span className="social-highlight-card__beam" aria-hidden="true" />
          <span className="social-highlight-card__icon"><SocialIcon name={social.icon} /></span>
        </a>
      ))}
    </nav>
  );
}

/* social-highlight-cards.css */
.social-highlight-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.social-highlight-card {
  position: relative;
  isolation: isolate;
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .09);
  border-radius: 6px;
  background: #16171d;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .035),
    0 1px 0 rgba(255, 255, 255, .08);
  text-decoration: none;
  transition:
    border-color 260ms cubic-bezier(.22, 1, .36, 1),
    background-color 260ms cubic-bezier(.22, 1, .36, 1);
}

.social-highlight-card__glow {
  position: absolute;
  z-index: -1;
  inset: 0;
  background: radial-gradient(
    ellipse 78% 92% at 50% -4%,
    color-mix(in srgb, currentColor 38%, transparent) 0%,
    color-mix(in srgb, currentColor 16%, transparent) 38%,
    transparent 76%
  );
  opacity: .2;
}

.social-highlight-card__beam {
  position: absolute;
  top: 4px;
  right: 8px;
  left: 8px;
  height: 4px;
  border-radius: 999px;
  background: currentColor;
  opacity: .3;
  transform: scaleX(.96);
  transition:
    transform 480ms cubic-bezier(.22, 1, .36, 1),
    opacity 480ms cubic-bezier(.22, 1, .36, 1);
}

.social-highlight-card__icon {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  color: #0d0e13;
  opacity: .82;
  transform: scale(.96);
  transition:
    color 480ms cubic-bezier(.22, 1, .36, 1),
    opacity 480ms cubic-bezier(.22, 1, .36, 1),
    transform 480ms cubic-bezier(.22, 1, .36, 1);
}

.social-highlight-card__icon svg {
  width: 100%;
  height: 100%;
}

.social-highlight-card:hover,
.social-highlight-card:focus-visible {
  border-color: color-mix(in srgb, currentColor 28%, rgba(255, 255, 255, .08));
  background: #181920;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .06),
    0 10px 24px rgba(0, 0, 0, .28),
    0 0 22px color-mix(in srgb, currentColor 12%, transparent);
}

.social-highlight-card:hover .social-highlight-card__glow,
.social-highlight-card:focus-visible .social-highlight-card__glow {
  opacity: 1;
}

.social-highlight-card:hover .social-highlight-card__beam,
.social-highlight-card:focus-visible .social-highlight-card__beam {
  opacity: 1;
  transform: scaleX(1);
}

.social-highlight-card:hover .social-highlight-card__icon,
.social-highlight-card:focus-visible .social-highlight-card__icon {
  color: inherit;
  opacity: 1;
  transform: scale(1);
}

.social-highlight-card:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

@media (max-width: 420px) {
  .social-highlight-cards {
    gap: 10px;
  }

  .social-highlight-card {
    width: 56px;
    height: 56px;
  }

  .social-highlight-card__icon {
    width: 27px;
    height: 27px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .social-highlight-card,
  .social-highlight-card__glow,
  .social-highlight-card__beam,
  .social-highlight-card__icon {
    transition-duration: .01ms;
  }
}`;

export const tailwindCode = `const socials = [
  { label: "Henrique Barone on LinkedIn", href: "https://www.linkedin.com/in/hbarone/", highlight: "#0a66c2", icon: "linkedin" },
  { label: "Henrique Barone on GitHub", href: "https://github.com/henriquegpb", highlight: "#f0f0f0", icon: "github" },
  { label: "Henrique Barone on Instagram", href: "https://www.instagram.com/henrique_barone/", highlight: "#e4405f", icon: "instagram" },
];

function SocialIcon({ name = "linkedin" }) {
  if (name === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.1 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.3 8.9h3.6V20H3.3V8.9Zm5.8 0h3.4v1.5h.1c.5-.9 1.6-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.1V8.9Z" /></svg>;
  }

  if (name === "github") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.36-1.2-3.36-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.89v2.8c0 .28.18.6.69.5A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" /></svg>;
}

export function SocialHighlightCards() {
  return (
    <nav className="flex items-center justify-center gap-3.5 max-[420px]:gap-2.5" aria-label="Social links">
      {socials.map((social) => (
        <a
          className="group relative isolate grid size-16 place-items-center overflow-hidden rounded-md border border-white/[.09] bg-[#16171d] text-current no-underline shadow-[inset_0_1px_0_rgba(255,255,255,.035),0_1px_0_rgba(255,255,255,.08)] transition-[border-color,background-color] duration-[260ms] ease-[cubic-bezier(.22,1,.36,1)] hover:border-[color-mix(in_srgb,currentColor_28%,rgba(255,255,255,.08))] hover:bg-[#181920] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_10px_24px_rgba(0,0,0,.28),0_0_22px_color-mix(in_srgb,currentColor_12%,transparent)] focus-visible:border-[color-mix(in_srgb,currentColor_28%,rgba(255,255,255,.08))] focus-visible:bg-[#181920] focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_10px_24px_rgba(0,0,0,.28),0_0_22px_color-mix(in_srgb,currentColor_12%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current motion-reduce:duration-[.01ms] max-[420px]:size-14"
          href={social.href}
          key={social.href}
          target="_blank"
          rel="noreferrer"
          title={social.label}
          aria-label={social.label}
          style={{ color: social.highlight }}
        >
          <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_78%_92%_at_50%_-4%,color-mix(in_srgb,currentColor_38%,transparent)_0%,color-mix(in_srgb,currentColor_16%,transparent)_38%,transparent_76%)] opacity-20 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true" />
          <span className="pointer-events-none absolute left-2 right-2 top-1 h-1 scale-x-[.96] rounded-full bg-current opacity-30 transition-[transform,opacity] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100 group-hover:opacity-100 group-focus-visible:scale-x-100 group-focus-visible:opacity-100 motion-reduce:duration-[.01ms]" aria-hidden="true" />
          <span className="grid size-[30px] scale-[.96] place-items-center text-[#0d0e13] opacity-[.82] transition-[color,opacity,transform] duration-[480ms] ease-[cubic-bezier(.22,1,.36,1)] [&_svg]:size-full group-hover:scale-100 group-hover:text-inherit group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:text-inherit group-focus-visible:opacity-100 motion-reduce:duration-[.01ms] max-[420px]:size-[27px]"><SocialIcon name={social.icon} /></span>
        </a>
      ))}
    </nav>
  );
}`;
