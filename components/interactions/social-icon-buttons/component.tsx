import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import "./styles.css";

type Social = {
  label: string;
  href: string;
  brand: string;
  icon: "linkedin" | "github" | "instagram";
};

const socials: Social[] = [
  { label: "Henrique Barone on LinkedIn", href: "https://www.linkedin.com/in/hbarone/", brand: "#0a66c2", icon: "linkedin" },
  { label: "Henrique Barone on GitHub", href: "https://github.com/henriquegpb", brand: "#f0f0f0", icon: "github" },
  { label: "Henrique Barone on Instagram", href: "https://www.instagram.com/henrique_barone/", brand: "#e4405f", icon: "instagram" },
];

function SocialIcon({ name }: { name: Social["icon"] }) {
  if (name === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.1 3.5a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM3.3 8.9h3.6V20H3.3V8.9Zm5.8 0h3.4v1.5h.1c.5-.9 1.6-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.6V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.1V8.9Z" /></svg>;
  if (name === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.5v-1.9c-2.78.62-3.36-1.2-3.36-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.43.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.94.68 1.89v2.8c0 .28.18.6.69.5A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" /></svg>;
}

export function SocialIconButtons() {
  return <div className="social-icon-buttons" aria-label="Social links">{socials.map((social) => <a className="social-icon-button" href={social.href} key={social.href} target="_blank" rel="noreferrer" title={social.label} aria-label={social.label} style={{ "--social-brand": social.brand } as CSSProperties}><span className="social-icon-button-swap"><SocialIcon name={social.icon} /></span><span className="social-icon-button-swap social-icon-button-arrow"><ArrowRight size={15} strokeWidth={1.9} /></span></a>)}</div>;
}
