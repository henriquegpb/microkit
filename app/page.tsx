"use client";

import Image from "next/image";
import { forwardRef, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Highlight, type Language, type PrismTheme } from "prism-react-renderer";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Check,
  Code2,
  Copy,
  Crown,
  Gem,
  MessageCircle,
  Monitor,
  Medal,
  PanelLeft,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  ClockIcon,
  HeartIcon,
  type AnimatedIconHandle,
  LayersIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "../components/animated-icons";
import { interactions, type Interaction } from "../content/interactions/catalog";
import { InteractionPreview } from "../components/interactions/registry";

const microKitCodeTheme: PrismTheme = {
  plain: {
    color: "#d8d9dd",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#5f646c", fontStyle: "italic" },
    },
    {
      types: ["keyword", "atrule", "rule"],
      style: { color: "#f97316", fontWeight: "600" },
    },
    {
      types: ["selector", "tag", "class-name", "important"],
      style: { color: "#ffad75" },
    },
    {
      types: ["property", "attr-name"],
      style: { color: "#d99562" },
    },
    {
      types: ["string", "char", "attr-value", "regex"],
      style: { color: "#f2c4a0" },
    },
    {
      types: ["number", "boolean", "constant", "symbol", "unit"],
      style: { color: "#ff8c47" },
    },
    {
      types: ["function", "function-variable"],
      style: { color: "#f2f3f4" },
    },
    {
      types: ["operator", "entity", "url"],
      style: { color: "#c96f3b" },
    },
    {
      types: ["punctuation"],
      style: { color: "#898f98" },
    },
    {
      types: ["builtin", "variable", "parameter"],
      style: { color: "#c8ccd2" },
    },
  ],
};

const icons = { search: Search, copy: Copy, back: ArrowLeft, code: Code2, grid: PanelLeft, reset: RotateCcw, desktop: Monitor, mobile: Smartphone, check: Check, close: X, sliders: SlidersHorizontal, arrow: ArrowUpRight } satisfies Record<string, LucideIcon>;
function Icon({ name, size = 16, filled = false }: { name: keyof typeof icons; size?: number; filled?: boolean }) { const Glyph = icons[name]; return <Glyph aria-hidden="true" size={size} strokeWidth={1.8} fill={filled ? "currentColor" : "none"} />; }
type LibraryView = "all" | "recent" | "favorites";

function FavoriteButton({ className, saved, label, onClick, size = 20 }: { className: string; saved: boolean; label: string; onClick: () => void; size?: number }) {
  const heartRef = useRef<AnimatedIconHandle>(null);
  return <button className={className} onClick={() => { onClick(); heartRef.current?.startAnimation(); }} onMouseEnter={() => heartRef.current?.startAnimation()} onMouseLeave={() => heartRef.current?.stopAnimation()} aria-label={label}><HeartIcon ref={heartRef} size={size} filled={saved}/></button>;
}

const NavigationIcon = forwardRef<AnimatedIconHandle, { name: "layers" | "clock" | "heart" }>(({ name }, ref) => {
  if (name === "layers") return <LayersIcon ref={ref} size={16}/>;
  if (name === "clock") return <ClockIcon ref={ref} size={16}/>;
  return <HeartIcon ref={ref} size={16}/>;
});
NavigationIcon.displayName = "NavigationIcon";
export function Demo({ id, large = false }: { id: string; large?: boolean }) {
  return (
    <div className={`demo ${large ? "demo-large" : ""}`}>
      <InteractionPreview id={id} />
    </div>
  );
}

const HERO_TUNNEL_HOME = { x: 18, y: 82 };

function HeroTunnel() {
  const gradientRef = useRef<SVGRadialGradientElement>(null);
  const frameRef = useRef<number | null>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const currentRef = useRef({ ...HERO_TUNNEL_HOME });
  const targetRef = useRef({ ...HERO_TUNNEL_HOME });
  const trackingRef = useRef(false);

  const animate = () => {
    const current = currentRef.current;
    const target = targetRef.current;
    const easing = trackingRef.current ? 0.14 : 0.055;

    current.x += (target.x - current.x) * easing;
    current.y += (target.y - current.y) * easing;

    const gradient = gradientRef.current;
    if (gradient) {
      gradient.setAttribute("cx", current.x.toFixed(2));
      gradient.setAttribute("cy", current.y.toFixed(2));
    }

    if (Math.abs(target.x - current.x) > 0.04 || Math.abs(target.y - current.y) > 0.04) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      current.x = target.x;
      current.y = target.y;
      frameRef.current = null;
    }
  };

  const startAnimation = () => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const handlePointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    boundsRef.current = event.currentTarget.getBoundingClientRect();
    trackingRef.current = true;
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = boundsRef.current ?? event.currentTarget.getBoundingClientRect();
    targetRef.current.x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    targetRef.current.y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
    startAnimation();
  };

  const handlePointerLeave = () => {
    boundsRef.current = null;
    trackingRef.current = false;
    targetRef.current = { ...HERO_TUNNEL_HOME };
    startAnimation();
  };

  return (
    <div className="hero-arch" onPointerEnter={handlePointerEnter} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <svg className="hero-tunnel-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient ref={gradientRef} id="hero-tunnel-gradient" gradientUnits="userSpaceOnUse" cx={HERO_TUNNEL_HOME.x} cy={HERO_TUNNEL_HOME.y} r="115">
            <stop offset="0" stopColor="#f97316"/>
            <stop offset=".22" stopColor="#743313"/>
            <stop offset=".5" stopColor="#160a04"/>
            <stop offset=".82" stopColor="#000"/>
          </radialGradient>
        </defs>
        <rect x="1" y="1" width="98" height="98" rx="21.5"/>
        <rect x="9" y="9" width="82" height="82" rx="18"/>
        <rect x="17" y="17" width="66" height="66" rx="14.5"/>
        <rect x="25" y="25" width="50" height="50" rx="11"/>
        <rect x="33" y="33" width="34" height="34" rx="7.5"/>
        <rect x="41" y="41" width="18" height="18" rx="4"/>
      </svg>
    </div>
  );
}

function HeroCard() {
  const cardRef = useRef<HTMLElement>(null);
  const pointerRef = useRef({ x: 50, y: 50 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (card) {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${((pointerRef.current.x - bounds.left) / bounds.width) * 100}%`);
        card.style.setProperty("--pointer-y", `${((pointerRef.current.y - bounds.top) / bounds.height) * 100}%`);
      }
      frameRef.current = null;
    });
  };

  return (
    <section ref={cardRef} className="hero-card" aria-label="MicroKit UI introduction" onPointerMove={handlePointerMove}>
      <div className="hero-copy">
        <h2>Details Matter!</h2>
        <p className="hero-description">MicroKit UI is a component library for developers who care about the experience behind every interaction.</p>
      </div>
      <div className="hero-figure" aria-hidden="true"><HeroTunnel/></div>
      <span className="hero-grid-light" aria-hidden="true"/>
      <span className="hero-border-flash hero-border-flash-top" aria-hidden="true"/>
      <span className="hero-border-flash hero-border-flash-left" aria-hidden="true"/>
      <span className="grid-slip grid-slip-one" aria-hidden="true"/>
      <span className="grid-slip grid-slip-two" aria-hidden="true"/>
      <span className="grid-slip grid-slip-three" aria-hidden="true"/>
      <span className="grid-slip grid-slip-four" aria-hidden="true"/>
      <span className="grid-slip grid-slip-five" aria-hidden="true"/>
    </section>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Interaction | null>(null);
  const [category, setCategory] = useState("All");
  const [libraryView, setLibraryView] = useState<LibraryView>("all");
  const [query, setQuery] = useState("");
  const [framework, setFramework] = useState("All frameworks");
  const [sort, setSort] = useState("Newest");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("microkit-favorites") || "[]");
  });
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("microkit-recent") || "[]");
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [codeTab, setCodeTab] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [canvas, setCanvas] = useState<"dark" | "light">("dark");
  const [strength, setStrength] = useState(24);
  const [sidebar, setSidebar] = useState(true);
  const toggleFavorite = (id: string) => setFavorites(prev => { const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]; localStorage.setItem("microkit-favorites", JSON.stringify(next)); return next; });
  const markRecentlyViewed = (id: string) => setRecent(prev => { const next = [id, ...prev.filter(itemId => itemId !== id)].slice(0, 20); localStorage.setItem("microkit-recent", JSON.stringify(next)); return next; });
  const copy = async (id: string, text: string) => { await navigator.clipboard?.writeText(text); setCopied(id); setTimeout(()=>setCopied(null), 1400); };
  const filtered = useMemo(() => {
    const matches = interactions.filter(item => (libraryView !== "all" || category === "All" || item.category === category || (category === "Click feedback" && item.type === "Click")) && (framework === "All frameworks" || item.framework === framework) && `${item.name} ${item.category} ${item.type}`.toLowerCase().includes(query.toLowerCase()));
    const scoped = libraryView === "favorites" ? matches.filter(item => favorites.includes(item.id)) : libraryView === "recent" ? recent.map(id => matches.find(item => item.id === id)).filter((item): item is Interaction => Boolean(item)) : matches;
    return sort === "Newest" && libraryView === "recent" ? scoped : [...scoped].sort((a,b) => sort === "A–Z" ? a.name.localeCompare(b.name) : sort === "Popular" ? (a.id === "magnetic-button" ? -1 : 1) : (a.new === b.new ? 0 : a.new ? -1 : 1));
  }, [category, favorites, framework, libraryView, query, recent, sort]);

  const chooseCategory = (view: LibraryView) => { localStorage.setItem("microkit-library-view", view); setLibraryView(view); setCategory("All"); setSelected(null); };
  const chooseLibraryView = (view: LibraryView) => { localStorage.setItem("microkit-library-view", view); setLibraryView(view); setCategory("All"); setSelected(null); };
  const openComponent = (item: Interaction) => {
    markRecentlyViewed(item.id);
    window.location.assign(`/components/${item.id}`);
  };
  const handleCardClick = (event: ReactMouseEvent<HTMLElement>, item: Interaction) => {
    const target = event.target as HTMLElement;
    const demo = target.closest<HTMLElement>(".demo");
    if (target.closest(".favorite") || (demo && target !== demo)) return;
    openComponent(item);
  };
  if (selected) return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} view={libraryView} counts={{all:interactions.length,recent:recent.length,favorites:favorites.length}} choose={chooseLibraryView}/><main className="playground-main"><div className="crumb"><button className="back-slide" onClick={()=>setSelected(null)}><span className="back-slide-label">All interactions</span><span className="back-slide-icon" aria-hidden="true"><ArrowLeft size={20} strokeWidth={2.25}/></span></button><span>/</span><span>{selected.category}</span></div><section className="playground-heading"><div><div className="eyebrow">{selected.category} <span>•</span> {selected.framework}</div><h1>{selected.name}</h1><p>{selected.description}</p></div><div className="header-actions"><FavoriteButton className={`square ${favorites.includes(selected.id)?"saved":""}`} saved={favorites.includes(selected.id)} size={22} label="Save favorite" onClick={()=>toggleFavorite(selected.id)}/><button className="copy-main" onClick={()=>copy(selected.id, selected.code)}><Icon name={copied===selected.id?"check":"copy"}/> {copied===selected.id?"Copied":"Copy code"}</button></div></section><div className="play-tabs"><button className={!codeTab?"active":""} onClick={()=>setCodeTab(false)}>Preview</button><button className={codeTab?"active":""} onClick={()=>setCodeTab(true)}>Code</button></div>{!codeTab ? <div className="play-layout"><section className="canvas-card"><div className="canvas-toolbar"><div className="segmented"><button className={canvas==="dark"?"active":""} onClick={()=>setCanvas("dark")}>Dark</button><button className={canvas==="light"?"active":""} onClick={()=>setCanvas("light")}>Light</button></div><div className="toolbar-right"><div className="segmented"><button className={viewport==="desktop"?"active":""} onClick={()=>setViewport("desktop")}><Icon name="desktop"/></button><button className={viewport==="mobile"?"active":""} onClick={()=>setViewport("mobile")}><Icon name="mobile"/></button></div><button className="reset"><Icon name="reset"/> Reset</button></div></div><div className={`canvas ${canvas} ${viewport}`}><Demo id={selected.id} large/></div><div className="canvas-footer"><span><i className="status-dot"/> Live preview</span><span>⌘ Enter to reset</span></div></section><aside className="control-panel"><div className="control-title"><Icon name="sliders"/> Customize</div><label className="control"><span>Intensity <output>{strength}%</output></span><input type="range" value={strength} onChange={e=>setStrength(+e.target.value)} /></label><label className="control"><span>Duration <output>240ms</output></span><input type="range" defaultValue="45" /></label><label className="control"><span>Label</span><input value="Explore components" readOnly /></label><label className="check-control"><input type="checkbox" defaultChecked/> Enable reduced motion fallback</label></aside></div> : <CodePanel item={selected} copy={copy} copied={copied}/>}<DetailInfo item={selected}/></main></div></div>;

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} choose={chooseCategory}/><div className="gallery-workspace"><main className="gallery-main"><HeroCard/><div className="gallery-header"><div><div className="eyebrow">Library <span>•</span> {category === "All" ? "All interactions" : category}</div><h1>{category === "All" ? "Explore micro interactions" : category}</h1><p>{filtered.length} {filtered.length === 1 ? "interaction" : "interactions"} ready to copy, adapt, and ship.</p></div><div className="gallery-controls"><label className="inline-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter results" /></label><select value={framework} onChange={e=>setFramework(e.target.value)}><option>All frameworks</option><option>React</option><option>CSS</option></select><select value={sort} onChange={e=>setSort(e.target.value)}><option>Newest</option><option>Popular</option><option>A–Z</option></select></div></div><div className="active-filter"><span>{category === "All" ? "All components" : category}</span>{query && <button onClick={()=>setQuery("")}><Icon name="close"/> Clear search</button>}</div><section className="gallery-grid">{filtered.map(item=><article className="interaction-card" key={item.id} onClick={event=>handleCardClick(event,item)}><div className="card-preview"><Demo id={item.id}/>{item.new && <span className="new-badge">New</span>}<FavoriteButton className={`favorite ${favorites.includes(item.id)?"saved":""}`} saved={favorites.includes(item.id)} label={`Save ${item.name}`} onClick={()=>toggleFavorite(item.id)}/></div><button className="card-info" onClick={()=>openComponent(item)} aria-label={`Open ${item.name} playground`}><span><h2>{item.name}</h2><p>{item.category}</p></span><span className="card-meta"><span>{item.framework}</span><span className="state-type">{item.type}</span></span></button></article>)}</section>{!filtered.length && <div className="empty"><Icon name="search" size={28}/><h2>No interactions found</h2><p>Try a different search or clear your filters.</p><button onClick={()=>{setQuery("");setCategory("All");setFramework("All frameworks")}}>Clear all filters</button></div>}</main><aside className="sponsors-rail"><SponsorCard/></aside></div></div></div>;
}

export function ComponentDetailPage({ item }: { item: Interaction }) {
  const [query, setQuery] = useState("");
  const [codeTab, setCodeTab] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [sidebar, setSidebar] = useState(true);
  const [favorite, setFavorite] = useState(() => typeof window !== "undefined" && JSON.parse(localStorage.getItem("microkit-favorites") || "[]").includes(item.id));
  const copy = async (id: string, text: string) => { await navigator.clipboard?.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 1400); };
  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("microkit-favorites") || "[]") as string[];
    const next = favorite ? saved.filter(id => id !== item.id) : [...saved, item.id];
    localStorage.setItem("microkit-favorites", JSON.stringify(next));
    setFavorite(!favorite);
  };

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={() => setSidebar(!sidebar)} view="all" counts={{ all: interactions.length, recent: 0, favorites: 0 }} choose={() => window.location.assign("/")} /><main className="playground-main"><div className="crumb"><button className="back-slide" onClick={() => window.location.assign("/")}><span className="back-slide-label">All interactions</span><span className="back-slide-icon" aria-hidden="true"><ArrowLeft size={20} strokeWidth={2.25}/></span></button><span>/</span><span>{item.category}</span></div><section className="playground-heading"><div><div className="eyebrow">{item.category} <span>•</span> {item.framework}</div><h1>{item.name}</h1><p>{item.description}</p></div><div className="header-actions"><FavoriteButton className={`square ${favorite ? "saved" : ""}`} saved={favorite} label="Save favorite" onClick={toggleFavorite}/></div></section><div className="play-tabs"><button className={!codeTab ? "active" : ""} onClick={() => setCodeTab(false)}>Preview</button><button className={codeTab ? "active" : ""} onClick={() => setCodeTab(true)}>Code</button></div>{codeTab ? <CodePanel item={item} copy={copy} copied={copied}/> : <div className="play-layout"><section className="canvas-card"><div className="canvas dark desktop"><Demo id={item.id} large/></div><div className="canvas-footer"><span><i className="status-dot"/> Live preview</span></div></section></div>}</main></div></div>;
}

function Header({ query, setQuery }: { query: string; setQuery: (x:string)=>void }) { return <header className="topbar"><nav><a className="current submit-link" href="/submit"><span>Submit</span><span className="submit-link-icon" aria-hidden="true"><ArrowRight className="submit-link-arrow submit-link-arrow-current" size={14} strokeWidth={2.2}/><ArrowRight className="submit-link-arrow submit-link-arrow-incoming" size={14} strokeWidth={2.2}/></span></a></nav><label className="global-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search interactions"/><kbd>⌘ K</kbd></label><div className="top-actions"><a className="github" href="https://github.com/henriquegpb/microkit" target="_blank" rel="noreferrer"><span className="github-content"><Image className="github-mark" src="/assets/img/GitHub.svg" alt="" width={15} height={15}/><span className="github-label">Star on GitHub</span><span className="github-arrow" aria-hidden="true"><ArrowRight size={14} strokeWidth={2.2}/></span></span></a></div></header> }

function sponsorshipEmailHref(tier: string, price: string) {
  const subject = `MicroKit ${tier} sponsorship inquiry`;
  const body = `Hello,

I'm interested in the ${tier} sponsorship tier for MicroKit (${price}).

Name:
Company or project:
Website:
What we would like to promote:

Questions or additional details:
`;

  return `mailto:hbarone2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function SponsorsPage({ onBack }: { onBack: () => void }) {
  return <div className="app sponsors-app"><Header query="" setQuery={() => {}} /><main className="sponsors-page">
    <section className="sponsors-hero sponsors-hero-compact">
      <button className="sponsors-back" onClick={onBack}><ArrowLeft size={15} /> All components</button>
      <div className="sponsors-hero-copy"><h1>Sponsors</h1><p>Support for MicroKit will be acknowledged here.</p></div>
    </section>
    <section className="sponsors-current"><div className="sponsor-groups">
      <section className="sponsor-group"><span className="sponsor-tier-label sponsor-tier-diamond">Diamond</span><div className="sponsors-list"><a className="sponsor-entry sponsor-entry-diamond" href="https://www.noraai.co/" target="_blank" rel="noreferrer" aria-label="Visit Nora"><div className="sponsor-entry-identity"><Image className="sponsor-entry-logo" src="/assets/img/Nora.svg" alt="Nora" width={120} height={23} /><p>Your AI Personal Assistant</p></div><ArrowRight size={17} /></a></div></section>
    </div></section>
    <section className="sponsors-opportunities" id="sponsorship">
      <div className="sponsors-section-heading"><h2>Become a sponsor</h2><p>Choose a tier and send an inquiry. We’ll confirm the details with you directly by email.</p></div>
      <div className="sponsorship-options">
        <article className="sponsor-plan sponsor-plan-diamond">
          <Gem className="sponsor-plan-icon" size={22} />
          <h3>Diamond</h3>
          <p className="sponsor-price">$200 <small>/ month</small></p>
          <ul className="sponsor-benefits"><li><PanelLeft size={15} /> Largest logo on the docs sidebar</li><li><BookOpen size={15} /> Largest logo in the README</li><li><BadgeCheck size={15} /> Featured on the sponsors page</li><li><MessageCircle size={15} /> Direct line for feedback &amp; requests</li></ul>
          <a className="sponsor-email sponsor-email-diamond" href={sponsorshipEmailHref("Diamond", "$200 / month")}><span>Become a Diamond sponsor</span><span className="sponsor-cta-icon" aria-hidden="true"><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-current" size={15} strokeWidth={2.3}/><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-incoming" size={15} strokeWidth={2.3}/></span></a>
        </article>
        <article className="sponsor-plan">
          <Crown className="sponsor-plan-icon" size={22} />
          <h3>Platinum</h3>
          <p className="sponsor-price">$100 <small>/ month</small></p>
          <ul className="sponsor-benefits"><li><BookOpen size={15} /> Larger logo in the README</li><li><PanelLeft size={15} /> Larger logo on the docs sidebar</li></ul>
          <a className="sponsor-email" href={sponsorshipEmailHref("Platinum", "$100 / month")}><span>Become a Platinum sponsor</span><span className="sponsor-cta-icon" aria-hidden="true"><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-current" size={15} strokeWidth={2.3}/><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-incoming" size={15} strokeWidth={2.3}/></span></a>
        </article>
        <article className="sponsor-plan">
          <Medal className="sponsor-plan-icon" size={22} />
          <h3>Silver</h3>
          <p className="sponsor-price">$50 <small>/ month</small></p>
          <ul className="sponsor-benefits"><li><BookOpen size={15} /> Logo in the README</li><li><PanelLeft size={15} /> Logo on the docs sidebar</li><li><BadgeCheck size={15} /> Listed on the sponsors page</li></ul>
          <a className="sponsor-email" href={sponsorshipEmailHref("Silver", "$50 / month")}><span>Become a Silver sponsor</span><span className="sponsor-cta-icon" aria-hidden="true"><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-current" size={15} strokeWidth={2.3}/><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-incoming" size={15} strokeWidth={2.3}/></span></a>
        </article>
      </div>
    </section>
  </main></div>;
}

export function SubmissionPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const issueBody = `## Component

${name.trim() || "Untitled component"}

## Code

\`\`\`tsx
${code.trim()}
\`\`\`

## Screenshot

${screenshot ? `Attach **${screenshot}** here before submitting.` : "Optional — drag a screenshot into this section."}

## Notes

Describe the interaction, its intended use, and any relevant source or attribution.`;
  const issueUrl = `https://github.com/henriquegpb/microkit/issues/new?${new URLSearchParams({
    title: `[Component] ${name.trim() || "New submission"}`,
    body: issueBody,
  }).toString()}`;

  if (submitted) return <div className="app submit-app"><Header query="" setQuery={()=>{}}/><main className="submit-page"><section className="submit-card submit-success"><span className="submit-check"><Check size={24}/></span><p className="eyebrow">Continue on GitHub</p><h1>Your submission is prefilled.</h1><p>Review the component code in the GitHub description{screenshot ? ` and attach ${screenshot}` : ""}, then create the issue to send it for review.</p><div className="submit-success-actions"><a className="submit-primary" href={issueUrl} target="_blank" rel="noreferrer">Open GitHub form</a><button className="submit-secondary" onClick={onBack}>Back to the library</button></div></section></main></div>;

  return <div className="app submit-app"><Header query="" setQuery={()=>{}}/><main className="submit-page"><section className="submit-card"><button className="submit-back" onClick={onBack}><ArrowLeft size={15}/> All components</button><div className="submit-intro"><p className="eyebrow">Contribute</p><h1>Submit a component</h1><p>Share the code behind an interaction. We’ll prefill it in a GitHub issue where you can attach the optional screenshot.</p></div><form className="submit-form" onSubmit={(event)=>{event.preventDefault();if(!code.trim())return;void navigator.clipboard.writeText(code).catch(()=>{});window.open(issueUrl,"_blank","noopener,noreferrer");setSubmitted(true);}}><label>Component name <span>Optional</span><input value={name} onChange={event=>setName(event.target.value)} placeholder="e.g. Magnetic button" /></label><label>Component code<textarea value={code} onChange={event=>setCode(event.target.value)} placeholder={'export function Component() {\n  return <button>Hover me</button>;\n}'} required /></label><label className="screenshot-field">Screenshot <span>Optional · attach it in GitHub</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={event=>setScreenshot(event.target.files?.[0]?.name || "")} /><span className="upload-drop">{screenshot ? screenshot : "Choose an image to remember for the GitHub form"}</span></label><button className="submit-primary submit-primary-send" type="submit"><span>Send component</span><span className="submit-primary-icon" aria-hidden="true"><ArrowRight className="submit-primary-arrow submit-primary-arrow-current" size={15} strokeWidth={2.3}/><ArrowRight className="submit-primary-arrow submit-primary-arrow-incoming" size={15} strokeWidth={2.3}/></span></button></form></section></main></div>;
}
const NAV_ITEMS = [
  { label: "All components", icon: "layers", view: "all" },
  { label: "Recently viewed", icon: "clock", view: "recent" },
  { label: "Favorites", icon: "heart", view: "favorites" },
] satisfies { label: string; icon: "layers" | "clock" | "heart"; view: LibraryView }[];

function Sidebar({ open, toggle, view, counts, choose }: { open:boolean; toggle:()=>void; view?:LibraryView; counts?:Record<LibraryView,number>; choose:(view:LibraryView)=>void }) {
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navIconRefs = useRef<(AnimatedIconHandle | null)[]>([]);
  const sidebarToggleIconRef = useRef<AnimatedIconHandle>(null);
  const animatedRef = useRef(false);
  const [localActiveIndex, setLocalActiveIndex] = useState(() => {
    if (typeof window === "undefined") return 0;
    const savedView = localStorage.getItem("microkit-library-view") as LibraryView | null;
    return Math.max(0, NAV_ITEMS.findIndex(item => item.view === savedView));
  });
  const activeIndex = view ? NAV_ITEMS.findIndex(item => item.view === view) : localActiveIndex;
  const liveCounts = counts ?? (typeof window === "undefined" ? { all: interactions.length, recent: 0, favorites: 0 } : { all: interactions.length, recent: JSON.parse(localStorage.getItem("microkit-recent") || "[]").length, favorites: JSON.parse(localStorage.getItem("microkit-favorites") || "[]").length });

  useEffect(() => {
    if (!open) { animatedRef.current = false; return; }
    const indicator = indicatorRef.current;
    const btn = btnRefs.current[activeIndex];
    const nav = navRef.current;
    if (!indicator || !btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    indicator.style.transition = animatedRef.current
      ? "top 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
    indicator.style.top = `${btnRect.top - navRect.top + 4}px`;
    indicator.style.height = `${btnRect.height - 8}px`;
    const frame = requestAnimationFrame(() => { animatedRef.current = true; });
    return () => cancelAnimationFrame(frame);
  }, [activeIndex, open]);

  const select = (i: number) => { if (!view) setLocalActiveIndex(i); choose(NAV_ITEMS[i].view); };

  return <aside className={`sidebar ${open?"":"collapsed"}`}><div className="sidebar-brand"><button className="brand" onClick={()=>location.reload()}><i/>MicroKit <span>UI</span></button><button className="sidebar-trigger" onClick={toggle} onMouseEnter={()=>sidebarToggleIconRef.current?.startAnimation()} onMouseLeave={()=>sidebarToggleIconRef.current?.stopAnimation()} aria-label={open ? "Collapse sidebar" : "Expand sidebar"}>{open ? <PanelLeftCloseIcon ref={sidebarToggleIconRef} size={16}/> : <PanelLeftOpenIcon ref={sidebarToggleIconRef} size={16}/>}</button></div><div className="sidebar-scroll" ref={navRef}>{open && <span ref={indicatorRef} className="sidebar-nav-indicator" aria-hidden="true"/>}{NAV_ITEMS.map((item, i)=><button key={item.label} ref={el=>{btnRefs.current[i]=el;}} className={`sidebar-nav-item ${activeIndex===i?"sidebar-nav-item--active":""}`} onClick={()=>select(i)} onMouseEnter={()=>navIconRefs.current[i]?.startAnimation()} onMouseLeave={()=>navIconRefs.current[i]?.stopAnimation()}><span className="side-row"><span className="sidebar-nav-item-icon"><NavigationIcon ref={icon=>{navIconRefs.current[i]=icon;}} name={item.icon}/></span>{item.label}</span><em>{liveCounts[item.view]}</em></button>)}</div></aside>;
}
function SponsorCard() { return <section className="sponsor-card" aria-label="Sponsors"><span className="sponsor-badge">Sponsors</span><a className="sponsor-card-nora" href="https://www.noraai.co/" target="_blank" rel="noreferrer" aria-label="Visit Nora"><span className="sponsor-card-tier">Diamond</span><Image src="/assets/img/Nora.svg" alt="Nora" width={104} height={20} /><p>Your AI Personal Assistant</p></a><a className="sponsor-cta" href="/sponsors"><span>View sponsors</span><span className="sponsor-cta-icon" aria-hidden="true"><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-current" size={16} strokeWidth={2.3}/><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-incoming" size={16} strokeWidth={2.3}/></span></a></section> }
export function CodePanel({ item, copy, copied }: { item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) {
  const [language, setLanguage] = useState<"JavaScript" | "TypeScript">("TypeScript");
  const [styling, setStyling] = useState<"CSS" | "Tailwind">(item.framework === "CSS" ? "CSS" : "Tailwind");
  useEffect(() => {
    const openSelector = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const label = target.closest<HTMLLabelElement>(".code-selectors label");
      if (!label || target.closest("select")) return;
      const select = label.querySelector("select");
      if (!select) return;
      event.preventDefault();
      select.focus();
      if (typeof select.showPicker === "function") select.showPicker();
      else select.click();
    };
    document.addEventListener("pointerdown", openSelector);
    return () => document.removeEventListener("pointerdown", openSelector);
  }, []);
  const tailwindCode = item.tailwindCode;
  const implementation = styling === "Tailwind" ? tailwindCode : item.code;
  const toJavaScript = (source: string) => language === "JavaScript"
    ? source
        .replace(/^import type[^\n]*\n/gm, "")
        .replace(/: ReactPointerEvent<HTMLButtonElement>/g, "")
        .replace(/\buseRef<[^>]+>/g, "useRef")
    : source;
  const separator = implementation.indexOf("\n/* ");
  const componentSource = styling === "CSS" && separator !== -1 ? implementation.slice(0, separator) : implementation;
  const componentCode = toJavaScript(componentSource).trim();
  const cssCode = styling === "CSS" && separator !== -1 ? formatCssCode(implementation.slice(separator + 1)) : "";
  const code = styling === "Tailwind" ? componentCode : implementation;

  return <div className="component-code"><section className="code-section"><h2>Code</h2><div className="code-selectors"><label><span>{language === "TypeScript" ? "TS" : "JS"}</span><select value={language} onChange={event=>setLanguage(event.target.value as "JavaScript" | "TypeScript")}><option>JavaScript</option><option>TypeScript</option></select></label><label><span className={`code-style-logo ${styling.toLowerCase()}`}>{styling === "CSS" ? <Image src="/assets/img/CSS.svg" alt="" width={17} height={17} /> : <Image src="/assets/img/Tailwind.svg" alt="" width={20} height={12} />}</span><select value={styling} onChange={event=>setStyling(event.target.value as "CSS" | "Tailwind")}><option>CSS</option><option>Tailwind</option></select></label></div>{styling === "CSS" ? <div className="code-files"><div className="code-file"><h3>{language} component</h3><CodeSnippet label={`${item.id}-${language}`} code={componentCode} item={item} copy={copy} copied={copied}/></div><div className="code-file"><h3>CSS</h3><CodeSnippet label={`${item.id}-css`} code={cssCode} item={item} copy={copy} copied={copied}/></div></div> : <CodeSnippet label={`${item.id}-${language}-tailwind`} code={code} item={item} copy={copy} copied={copied}/>}</section></div>
}
function formatCssCode(source: string) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*\}/g, "\n}\n")
    .replace(/\n[ \t]*\n+/g, "\n")
    .replace(/\n  \n}/g, "\n}")
    .trim();
}
function getSnippetLanguage(label: string): Language {
  if (label.endsWith("-css")) return "css";
  return label.includes("JavaScript") ? "jsx" : "tsx";
}
function CodeSnippet({ label, code, item, copy, copied }: { label:string; code:string; item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) {
  const id = `${item.id}-${label}`;
  const language = getSnippetLanguage(label);

  return <div className="code-snippet"><button className="snippet-copy" onClick={()=>copy(id,code)} aria-label="Copy code"><Icon name={copied===id?"check":"copy"}/></button><Highlight theme={microKitCodeTheme} code={code} language={language}>{({ tokens, getLineProps, getTokenProps })=><pre>{tokens.map((line,index)=>{const lineProps=getLineProps({line});return <span {...lineProps} className={`${lineProps.className} snippet-line`} key={index}><i>{index + 1}</i><code>{line.map((token,tokenIndex)=><span {...getTokenProps({token})} key={tokenIndex}/>)}</code></span>;})}</pre>}</Highlight></div>;
}
function CodeBlock({ label, code, item, copy, copied }: { label:string; code:string; item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) { const id=`${item.id}-${label}`; return <div className="code-block"><div className="code-head"><span><Icon name="code"/> {label}</span><button onClick={()=>copy(id,code)}><Icon name={copied===id?"check":"copy"}/> {copied===id?"Copied":"Copy"}</button></div><pre><code>{code}</code></pre></div> }
function DetailInfo({ item }: { item:Interaction }) { return <section className="detail-info"><div><h2>Installation</h2><p>{item.dependency ? "This interaction uses a small external dependency for gesture handling." : "No dependencies required. Drop the component into your project."}</p><CodeBlock label="Terminal" code={item.dependency ? `npm install ${item.dependency}` : "# No installation required"} item={item} copy={()=>{}} copied={null}/></div><div><h2>Accessibility</h2><p>Keyboard interactive, with visible focus states and a reduced-motion fallback included by default.</p><div className="a11y-tags"><span>Keyboard</span><span>Focus visible</span><span>Reduced motion</span></div></div><div><h2>Related</h2><div className="related">{interactions.filter(x=>x.id!==item.id).map(x=><button key={x.id}>{x.name} <Icon name="arrow"/></button>)}</div></div></section> }
