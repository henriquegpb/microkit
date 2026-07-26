"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Highlight, type Language, type PrismTheme } from "prism-react-renderer";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Check,
  Clock,
  Code2,
  Copy,
  Crown,
  Gem,
  Heart,
  Layers,
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
import { interactions, type Interaction } from "../content/interactions/catalog";

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

const icons = { heart: Heart, search: Search, copy: Copy, back: ArrowLeft, code: Code2, grid: PanelLeft, reset: RotateCcw, desktop: Monitor, mobile: Smartphone, check: Check, close: X, sliders: SlidersHorizontal, arrow: ArrowUpRight, layers: Layers, clock: Clock } satisfies Record<string, LucideIcon>;
function Icon({ name, size = 16, filled = false }: { name: keyof typeof icons; size?: number; filled?: boolean }) { const Glyph = icons[name]; return <Glyph aria-hidden="true" size={size} strokeWidth={1.8} fill={filled ? "currentColor" : "none"} />; }

const SPOTLIGHT_ITEMS = [
  { label: "All components", icon: "layers" },
  { label: "Recently viewed", icon: "clock" },
  { label: "Favorites", icon: "heart" },
] satisfies { label: string; icon: keyof typeof icons }[];
type LibraryView = "all" | "recent" | "favorites";

function SpotlightDemo() {
  const navRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const animatedRef = useRef(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    const btn = btnRefs.current[active];
    const nav = navRef.current;
    if (!bar || !btn || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    bar.style.transition = animatedRef.current
      ? "top 0.3s cubic-bezier(0.4, 0, 0.2, 1), height 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      : "none";
    bar.style.top = `${btnRect.top - navRect.top + 4}px`;
    bar.style.height = `${btnRect.height - 8}px`;
    const frame = requestAnimationFrame(() => { animatedRef.current = true; });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return <div className="spot-nav" ref={navRef}><span ref={barRef} className="spot-bar" aria-hidden="true"/>{SPOTLIGHT_ITEMS.map((item, i)=><button key={item.label} ref={el=>{btnRefs.current[i]=el;}} className={`spot-item ${active===i?"active":""}`} onClick={()=>setActive(i)}><span className="spot-item-icon"><Icon name={item.icon} size={15}/></span>{item.label}</button>)}</div>;
}

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", `${position}%`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => event.currentTarget.style.setProperty("--glow-x", "50%");

  return <button className="whats-new-button" onPointerMove={updateGlow} onPointerLeave={resetGlow}><span className="whats-new-content"><ArrowRight size={16} strokeWidth={2.5}/>What's new</span><span className="whats-new-glow whats-new-glow-orange" aria-hidden="true"/><span className="whats-new-glow whats-new-glow-blue" aria-hidden="true"/></button>;
}

export function MagneticFillButton() {
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (bounds.left + bounds.width / 2)) * .14;
    const y = (event.clientY - (bounds.top + bounds.height / 2)) * .22;
    event.currentTarget.style.setProperty("--magnetic-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y}px`);
  };
  const reset = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  return <button className="magnetic-fill-button" onPointerMove={move} onPointerLeave={reset}><span className="magnetic-fill-label">Start a project</span><span className="magnetic-fill-background" aria-hidden="true"/></button>;
}

function AppleMark() {
  return <svg className="download-ios-apple" width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden="true"><path d="M13.5621 5.45739C13.4857 5.50195 11.6671 6.44248 11.6671 8.52785C11.7528 10.9061 13.9621 11.7401 14 11.7401C13.9621 11.7847 13.6665 12.8763 12.7907 14.0205C12.0956 15.0062 11.3242 16 10.1528 16C9.0385 16 8.6385 15.3431 7.35278 15.3431C5.97203 15.3431 5.58135 16 4.5242 16C3.35277 16 2.52419 14.953 1.79127 13.9766C.839096 12.6986.0297778 10.6931.00120634 8.76747C-.0180484 7.74707.19189 6.74403.72481 5.89206C1.47699 4.70265 2.81985 3.89524 4.28631 3.86862C5.40992 3.83331 6.40992 4.58747 7.09563 4.58747C7.75278 4.58747 8.98135 3.86862 10.3714 3.86862C10.9714 3.86919 12.5714 4.03762 13.5621 5.45739ZM7.0006 3.66488C6.8006 2.73303 7.35278 1.80119 7.86706 1.20677C8.52421.487918 9.5621 0 10.4571 0C10.5143.931848 10.1522 1.84575 9.50496 2.51136C8.92421 3.23021 7.92421 3.77138 7.0006 3.66488Z" fill="currentColor"/></svg>;
}

export function Demo({ id, large = false }: { id: string; large?: boolean }) {
  const cls = `demo ${large ? "demo-large" : ""}`;
  if (id === "focus-input") return <div className={cls}><label className="demo-input"><span>Project name</span><input placeholder="e.g. microkit-web" /></label></div>;
  if (id === "expanding-contact-button") return <div className={cls}><button className="contact-pill"><span className="contact-pill-icon" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.5}/></span><span>Get in touch</span></button></div>;
  if (id === "contact-reveal-button") return <div className={cls}><button className="contact-reveal"><span className="contact-reveal-icon" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.5}/></span><span>Get in touch</span></button></div>;
  if (id === "subscribe-shine-button") return <div className={cls}><button className="subscribe-shine"><span className="subscribe-shine-gradient" aria-hidden="true"/><span className="subscribe-shine-inner">Subscribe</span></button></div>;
  if (id === "next-reveal-button") return <div className={cls}><button className="next-reveal"><span className="next-reveal-label">Next</span><ArrowRight className="next-reveal-arrow" size={27} strokeWidth={1.7}/></button></div>;
  if (id === "pricing-slide-link") return <div className={cls}><button className="pricing-slide"><span className="pricing-slide-icon" aria-hidden="true"><ArrowRight size={23} strokeWidth={2.25}/></span><span className="pricing-slide-label">Pricing</span></button></div>;
  if (id === "read-more-swap") return <div className={cls}><button className="read-more-swap"><ArrowRight className="read-more-arrow read-more-arrow-left" size={25} strokeWidth={2.5}/><span>Read more</span><ArrowRight className="read-more-arrow read-more-arrow-right" size={25} strokeWidth={2.5}/></button></div>;
  if (id === "projects-arrow-button") return <div className={cls}><button className="projects-arrow-button"><span>Projects</span><span className="projects-arrow-icon" aria-hidden="true"><ArrowRight className="projects-arrow projects-arrow-current" size={18} strokeWidth={2.4}/><ArrowRight className="projects-arrow projects-arrow-incoming" size={18} strokeWidth={2.4}/></span></button></div>;
  if (id === "whats-new-glow-button") return <div className={cls}><WhatsNewGlowButton/></div>;
  if (id === "magnetic-fill-button") return <div className={cls}><MagneticFillButton/></div>;
  if (id === "preview-browser-button") return <div className={cls}><button className="preview-browser-button"><span>Preview in browser</span><span className="preview-browser-icon" aria-hidden="true"><ArrowRight className="preview-browser-arrow preview-browser-arrow-current" size={17} strokeWidth={2.4}/><ArrowRight className="preview-browser-arrow preview-browser-arrow-incoming" size={17} strokeWidth={2.4}/></span></button></div>;
  if (id === "download-ios-button") return <div className={cls}><button className="download-ios-button"><span className="download-ios-content"><AppleMark/><span className="download-ios-label">Download for IOS</span><span className="download-ios-arrow" aria-hidden="true"><ArrowRight size={17} strokeWidth={2.4}/></span></span></button></div>;
  if (id === "spotlight-indicator") return <div className={cls}><SpotlightDemo/></div>;
  return <div className={cls}>Preview</div>;
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
  const [heroPointer, setHeroPointer] = useState({ x: 50, y: 50 });
  const toggleFavorite = (id: string) => setFavorites(prev => { const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]; localStorage.setItem("microkit-favorites", JSON.stringify(next)); return next; });
  const markRecentlyViewed = (id: string) => setRecent(prev => { const next = [id, ...prev.filter(itemId => itemId !== id)].slice(0, 20); localStorage.setItem("microkit-recent", JSON.stringify(next)); return next; });
  useEffect(() => { if (selected) markRecentlyViewed(selected.id); }, [selected]);
  const copy = async (id: string, text: string) => { await navigator.clipboard?.writeText(text); setCopied(id); setTimeout(()=>setCopied(null), 1400); };
  const filtered = useMemo(() => {
    const matches = interactions.filter(item => (libraryView !== "all" || category === "All" || item.category === category || (category === "Click feedback" && item.type === "Click")) && (framework === "All frameworks" || item.framework === framework) && `${item.name} ${item.category} ${item.type}`.toLowerCase().includes(query.toLowerCase()));
    const scoped = libraryView === "favorites" ? matches.filter(item => favorites.includes(item.id)) : libraryView === "recent" ? recent.map(id => matches.find(item => item.id === id)).filter((item): item is Interaction => Boolean(item)) : matches;
    return sort === "Newest" && libraryView === "recent" ? scoped : [...scoped].sort((a,b) => sort === "A–Z" ? a.name.localeCompare(b.name) : sort === "Popular" ? (a.id === "magnetic-button" ? -1 : 1) : (a.new === b.new ? 0 : a.new ? -1 : 1));
  }, [category, favorites, framework, libraryView, query, recent, sort]);

  const chooseCategory = (view: LibraryView) => { localStorage.setItem("microkit-library-view", view); setLibraryView(view); setCategory("All"); setSelected(null); };
  const chooseLibraryView = (view: LibraryView) => { localStorage.setItem("microkit-library-view", view); setLibraryView(view); setCategory("All"); setSelected(null); };
  const openComponent = (item: Interaction) => window.location.assign(`/components/${item.id}`);
  const handleCardClick = (event: ReactMouseEvent<HTMLElement>, item: Interaction) => {
    const target = event.target as HTMLElement;
    const demo = target.closest<HTMLElement>(".demo");
    if (target.closest(".favorite") || (demo && target !== demo)) return;
    openComponent(item);
  };
  if (selected) return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} view={libraryView} counts={{all:interactions.length,recent:recent.length,favorites:favorites.length}} choose={chooseLibraryView}/><main className="playground-main"><div className="crumb"><button className="back-slide" onClick={()=>setSelected(null)}><span className="back-slide-label">All interactions</span><span className="back-slide-icon" aria-hidden="true"><ArrowLeft size={20} strokeWidth={2.25}/></span></button><span>/</span><span>{selected.category}</span></div><section className="playground-heading"><div><div className="eyebrow">{selected.category} <span>•</span> {selected.framework}</div><h1>{selected.name}</h1><p>{selected.description}</p></div><div className="header-actions"><button className={`square ${favorites.includes(selected.id)?"saved":""}`} onClick={()=>toggleFavorite(selected.id)} aria-label="Save favorite"><Icon name="heart" size={22} filled={favorites.includes(selected.id)}/></button><button className="copy-main" onClick={()=>copy(selected.id, selected.code)}><Icon name={copied===selected.id?"check":"copy"}/> {copied===selected.id?"Copied":"Copy code"}</button></div></section><div className="play-tabs"><button className={!codeTab?"active":""} onClick={()=>setCodeTab(false)}>Preview</button><button className={codeTab?"active":""} onClick={()=>setCodeTab(true)}>Code</button></div>{!codeTab ? <div className="play-layout"><section className="canvas-card"><div className="canvas-toolbar"><div className="segmented"><button className={canvas==="dark"?"active":""} onClick={()=>setCanvas("dark")}>Dark</button><button className={canvas==="light"?"active":""} onClick={()=>setCanvas("light")}>Light</button></div><div className="toolbar-right"><div className="segmented"><button className={viewport==="desktop"?"active":""} onClick={()=>setViewport("desktop")}><Icon name="desktop"/></button><button className={viewport==="mobile"?"active":""} onClick={()=>setViewport("mobile")}><Icon name="mobile"/></button></div><button className="reset"><Icon name="reset"/> Reset</button></div></div><div className={`canvas ${canvas} ${viewport}`}><Demo id={selected.id} large/></div><div className="canvas-footer"><span><i className="status-dot"/> Live preview</span><span>⌘ Enter to reset</span></div></section><aside className="control-panel"><div className="control-title"><Icon name="sliders"/> Customize</div><label className="control"><span>Intensity <output>{strength}%</output></span><input type="range" value={strength} onChange={e=>setStrength(+e.target.value)} /></label><label className="control"><span>Duration <output>240ms</output></span><input type="range" defaultValue="45" /></label><label className="control"><span>Label</span><input value="Explore components" readOnly /></label><label className="check-control"><input type="checkbox" defaultChecked/> Enable reduced motion fallback</label></aside></div> : <CodePanel item={selected} copy={copy} copied={copied}/>}<DetailInfo item={selected}/></main></div></div>;

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} choose={chooseCategory}/><div className="gallery-workspace"><main className="gallery-main"><section className="hero-card" aria-label="MicroKit UI introduction" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setHeroPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 }); }} style={{ "--pointer-x": `${heroPointer.x}%`, "--pointer-y": `${heroPointer.y}%` } as CSSProperties}><div className="hero-copy"><h2>Details Matter!</h2><p className="hero-description">MicroKit UI is a component library for developers who care about the experience behind every interaction.</p></div><div className="hero-figure" aria-hidden="true"><div className="hero-arch" onPointerMove={(event)=>{const rect=event.currentTarget.getBoundingClientRect();const x=Math.max(0,Math.min(100,((event.clientX-rect.left)/rect.width)*100));const y=Math.max(0,Math.min(100,((event.clientY-rect.top)/rect.height)*100));event.currentTarget.classList.add("is-tracking");event.currentTarget.style.setProperty("--tunnel-x",`${x}%`);event.currentTarget.style.setProperty("--tunnel-y",`${y}%`);}} onPointerLeave={(event)=>{event.currentTarget.classList.remove("is-tracking");event.currentTarget.style.setProperty("--tunnel-x","0%");event.currentTarget.style.setProperty("--tunnel-y","100%");}}><i/><i/><i/><i/><i/><i/></div></div><span className="hero-grid-light" aria-hidden="true"/><span className="hero-border-flash hero-border-flash-top" aria-hidden="true"/><span className="hero-border-flash hero-border-flash-left" aria-hidden="true"/><span className="grid-slip grid-slip-one" aria-hidden="true"/><span className="grid-slip grid-slip-two" aria-hidden="true"/><span className="grid-slip grid-slip-three" aria-hidden="true"/><span className="grid-slip grid-slip-four" aria-hidden="true"/><span className="grid-slip grid-slip-five" aria-hidden="true"/></section><div className="gallery-header"><div><div className="eyebrow">Library <span>•</span> {category === "All" ? "All interactions" : category}</div><h1>{category === "All" ? "Explore micro interactions" : category}</h1><p>{filtered.length} {filtered.length === 1 ? "interaction" : "interactions"} ready to copy, adapt, and ship.</p></div><div className="gallery-controls"><label className="inline-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter results" /></label><select value={framework} onChange={e=>setFramework(e.target.value)}><option>All frameworks</option><option>React</option><option>CSS</option></select><select value={sort} onChange={e=>setSort(e.target.value)}><option>Newest</option><option>Popular</option><option>A–Z</option></select></div></div><div className="active-filter"><span>{category === "All" ? "All components" : category}</span>{query && <button onClick={()=>setQuery("")}><Icon name="close"/> Clear search</button>}</div><section className="gallery-grid">{filtered.map(item=><article className="interaction-card" key={item.id} onClick={event=>handleCardClick(event,item)}><div className="card-preview"><Demo id={item.id}/>{item.new && <span className="new-badge">New</span>}<button className={`favorite ${favorites.includes(item.id)?"saved":""}`} onClick={()=>toggleFavorite(item.id)} aria-label={`Save ${item.name}`}><Icon name="heart" size={20} filled={favorites.includes(item.id)}/></button></div><button className="card-info" onClick={()=>openComponent(item)} aria-label={`Open ${item.name} playground`}><span><h2>{item.name}</h2><p>{item.category}</p></span><span className="card-meta"><span>{item.framework}</span>{item.dependency && <span>+ {item.dependency}</span>}<span className="state-type">{item.type}</span></span></button></article>)}</section>{!filtered.length && <div className="empty"><Icon name="search" size={28}/><h2>No interactions found</h2><p>Try a different search or clear your filters.</p><button onClick={()=>{setQuery("");setCategory("All");setFramework("All frameworks")}}>Clear all filters</button></div>}</main><aside className="sponsors-rail"><SponsorCard/></aside></div></div></div>;
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

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={() => setSidebar(!sidebar)} view="all" counts={{ all: interactions.length, recent: 0, favorites: 0 }} choose={() => window.location.assign("/")} /><main className="playground-main"><div className="crumb"><button className="back-slide" onClick={() => window.location.assign("/")}><span className="back-slide-label">All interactions</span><span className="back-slide-icon" aria-hidden="true"><ArrowLeft size={20} strokeWidth={2.25}/></span></button><span>/</span><span>{item.category}</span></div><section className="playground-heading"><div><div className="eyebrow">{item.category} <span>•</span> {item.framework}</div><h1>{item.name}</h1><p>{item.description}</p></div><div className="header-actions"><button className={`square ${favorite ? "saved" : ""}`} onClick={toggleFavorite} aria-label="Save favorite"><Icon name="heart" size={22} filled={favorite}/></button></div></section><div className="play-tabs"><button className={!codeTab ? "active" : ""} onClick={() => setCodeTab(false)}>Preview</button><button className={codeTab ? "active" : ""} onClick={() => setCodeTab(true)}>Code</button></div>{codeTab ? <CodePanel item={item} copy={copy} copied={copied}/> : <div className="play-layout"><section className="canvas-card"><div className="canvas dark desktop"><Demo id={item.id} large/></div><div className="canvas-footer"><span><i className="status-dot"/> Live preview</span></div></section></div>}</main></div></div>;
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
      <section className="sponsor-group"><span className="sponsor-tier-label sponsor-tier-diamond">Diamond</span><div className="sponsors-list"><article className="sponsor-entry sponsor-entry-diamond"><div className="sponsor-entry-identity"><Image className="sponsor-entry-logo" src="/assets/img/Nora.svg" alt="Nora" width={120} height={23} /><p>Your AI Personal Assistant</p></div><ArrowRight size={17} /></article></div></section>
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
] satisfies { label: string; icon: keyof typeof icons; view: LibraryView }[];

function Sidebar({ open, toggle, view, counts, choose }: { open:boolean; toggle:()=>void; view?:LibraryView; counts?:Record<LibraryView,number>; choose:(view:LibraryView)=>void }) {
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  return <aside className={`sidebar ${open?"":"collapsed"}`}><div className="sidebar-brand"><button className="brand" onClick={()=>location.reload()}><i/>MicroKit <span>UI</span></button><button className="sidebar-trigger" onClick={toggle} aria-label="Collapse sidebar"><Icon name="grid"/></button></div><div className="sidebar-scroll" ref={navRef}>{open && <span ref={indicatorRef} className="sidebar-nav-indicator" aria-hidden="true"/>}{NAV_ITEMS.map((item, i)=><button key={item.label} ref={el=>{btnRefs.current[i]=el;}} className={`sidebar-nav-item ${activeIndex===i?"sidebar-nav-item--active":""}`} onClick={()=>select(i)}><span className="side-row"><span className="sidebar-nav-item-icon"><Icon name={item.icon}/></span>{item.label}</span><em>{liveCounts[item.view]}</em></button>)}</div></aside>;
}
function SponsorCard() { return <section className="sponsor-card" aria-label="Sponsors"><span className="sponsor-badge">Sponsors</span><div className="sponsor-card-nora"><span className="sponsor-card-tier">Diamond</span><Image src="/assets/img/Nora.svg" alt="Nora" width={104} height={20} /><p>Your AI Personal Assistant</p></div><a className="sponsor-cta" href="/sponsors"><span>View sponsors</span><span className="sponsor-cta-icon" aria-hidden="true"><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-current" size={16} strokeWidth={2.3}/><ArrowRight className="sponsor-cta-arrow sponsor-cta-arrow-incoming" size={16} strokeWidth={2.3}/></span></a></section> }
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
  const componentName = item.name.replaceAll(" ", "");
  const defaultTailwindCode = item.id === "focus-input" ? `export function FocusField() {
  return (
    <label className="block w-[210px]">
      <span className="mb-[7px] block font-mono text-[10px] text-[#9298a1]">Project name</span>
      <input
        className="w-full rounded-[5px] border border-[#363a42] bg-[#15171b] p-2 text-[11px] text-[#e8ebee] outline-none focus:border-[#f97316] focus:shadow-[0_0_0_3px_#f9731625]"
        placeholder="e.g. microkit-web"
      />
    </label>
  );
}` : item.id === "expanding-contact-button" ? `import { ArrowRight } from "lucide-react";

export function ExpandingContactButton() {
  return (
    <button className="group relative inline-flex h-9 w-9 items-center overflow-hidden rounded-full border-0 bg-transparent p-0 text-[13px] font-medium leading-none text-[#f0f0f0] transition-[width,background-color,color] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)] hover:w-[145px] hover:bg-[#f4f4f5] hover:text-[#111] focus-visible:w-[145px] focus-visible:bg-[#f4f4f5] focus-visible:text-[#111]">
      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-[#f97316] text-[#111]">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span className="absolute left-[47px] whitespace-nowrap opacity-0 -translate-x-[5px] transition-[opacity,transform] duration-[240ms] delay-[60ms] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        Get in touch
      </span>
    </button>
  );
}` : item.id === "contact-reveal-button" ? `import { ArrowRight } from "lucide-react";

export function ContactRevealButton() {
  return (
    <button className="group relative inline-flex h-9 w-[145px] items-center gap-[10px] overflow-hidden rounded-full border-0 bg-transparent py-0 pr-[15px] text-[13px] font-medium leading-none text-[#f0f0f0] transition-colors duration-[280ms] hover:text-[#111] focus-visible:text-[#111]">
      <span className="absolute inset-y-0 left-0 w-9 rounded-full bg-[#f0f0f0] transition-[width] duration-[320ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:w-full group-focus-visible:w-full" />
      <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full text-[#111] transition-colors delay-[120ms] duration-200 group-hover:bg-[#f97316] group-focus-visible:bg-[#f97316]">
        <ArrowRight size={18} strokeWidth={2.5} />
      </span>
      <span className="relative z-10">Get in touch</span>
    </button>
  );
}` : item.id === "subscribe-shine-button" ? `export function SubscribeShineButton() {
  return (
    <button className="group relative flex h-[60px] w-[200px] items-center justify-center overflow-hidden rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f97316]">
      <span className="h-[250px] w-[230px] shrink-0 bg-[linear-gradient(121deg,#1b1b1b_38%,#f0f0f0_50%,#1b1b1b_61%)] transition-transform duration-1000 ease-linear group-hover:rotate-[360deg] group-hover:duration-[3000ms] group-focus-visible:rotate-[360deg] group-focus-visible:duration-[3000ms]" />
      <span className="absolute inset-px flex items-center justify-center rounded-full bg-[#0b0b11] text-[13px] font-bold leading-none text-[#f0f0f0] uppercase">
        Subscribe
      </span>
    </button>
  );
}` : item.id === "next-reveal-button" ? `import { ArrowRight } from "lucide-react";

export function NextRevealButton() {
  return (
    <button className="group relative inline-flex h-[42px] w-[110px] items-center justify-end overflow-hidden rounded-full border border-[#f0f0f033] bg-[#171717] px-[15px] text-[#f0f0f0] transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:border-transparent hover:bg-[#f97316] hover:text-[#171d1a] focus-visible:border-transparent focus-visible:bg-[#f97316] focus-visible:text-[#171d1a]">
      <span className="absolute left-[21px] translate-y-[160%] text-base font-normal opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        Next
      </span>
      <ArrowRight className="relative z-10 shrink-0" size={27} strokeWidth={1.7} />
    </button>
  );
}` : item.id === "pricing-slide-link" ? `import { ArrowRight } from "lucide-react";

export function PricingSlideLink() {
  return (
    <button className="group inline-flex items-center gap-2 overflow-hidden border-0 bg-transparent p-0 text-base font-medium leading-none text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f97316]">
      <span className="flex size-[23px] -translate-x-[150%] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        <ArrowRight size={23} strokeWidth={2.25} />
      </span>
      <span className="-translate-x-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0">
        Pricing
      </span>
    </button>
  );
}` : item.id === "spotlight-indicator" ? `import { useEffect, useRef, useState } from "react";
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
}` : `export function ${componentName}() {
  return (
    <div className="rounded-md border border-zinc-700 bg-zinc-950 p-4">
      <span className="text-zinc-200">${item.name}</span>
    </div>
  );
}`;
  const componentTailwindCode: Record<string, string> = {
    "read-more-swap": `import { ArrowRight } from "lucide-react";

export function ReadMoreSwap() {
  return (
    <button className="group inline-flex h-12 items-center gap-3 overflow-hidden border-0 bg-transparent p-0 text-base font-medium text-[#f0f0f0]">
      <ArrowRight className="w-0 shrink-0 translate-x-[-12px] text-[#f97316] opacity-0 transition-[width,transform,opacity] duration-[240ms] group-hover:w-[25px] group-hover:translate-x-0 group-hover:opacity-100" size={25} strokeWidth={2.5} />
      <span>Read more</span>
      <ArrowRight className="w-[25px] shrink-0 transition-[width,transform,opacity] duration-[240ms] group-hover:w-0 group-hover:translate-x-3 group-hover:opacity-0" size={25} strokeWidth={2.5} />
    </button>
  );
}`,
    "projects-arrow-button": `import { ArrowRight } from "lucide-react";

export function ProjectsArrowButton() {
  return (
    <button className="group inline-flex items-center gap-[9px] border-0 bg-transparent p-0 text-base font-medium tracking-[.5px] text-[#f0f0f0]">
      <span>Projects</span>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-full border border-current">
        <ArrowRight className="absolute transition-transform duration-[480ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[25px]" size={18} strokeWidth={2.4} />
        <ArrowRight className="absolute -translate-x-[25px] transition-transform duration-[480ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0" size={18} strokeWidth={2.4} />
      </span>
    </button>
  );
}`,
    "whats-new-glow-button": `import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowRight } from "lucide-react";

export function WhatsNewGlowButton() {
  const updateGlow = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
    event.currentTarget.style.setProperty("--glow-x", \`\${position}%\`);
  };
  const resetGlow = (event: ReactPointerEvent<HTMLButtonElement>) => event.currentTarget.style.setProperty("--glow-x", "50%");

  return (
    <button onPointerMove={updateGlow} onPointerLeave={resetGlow} className="group relative inline-flex min-h-[42px] items-center justify-center overflow-hidden rounded-full border border-[#36383d] bg-[#0e0e10] px-[18px] text-base font-medium text-[#f0f0f0]">
      <span className="relative z-10 inline-flex items-center gap-[9px]"><ArrowRight size={16} strokeWidth={2.5} />What's new</span>
      <span className="pointer-events-none absolute bottom-[-108%] left-[calc(var(--glow-x)-78%)] h-[180%] w-[112%] rounded-full bg-[linear-gradient(145deg,#ffbe91,#f97316_43%,#7a2808)] opacity-[.28] blur-[23px] transition-[left,transform,opacity] duration-[220ms] ease-out group-hover:translate-y-[-19px] group-hover:opacity-100" />
      <span className="pointer-events-none absolute bottom-[-108%] left-[calc(var(--glow-x)-30%)] h-[180%] w-[112%] rounded-full bg-[linear-gradient(145deg,#77e1e6,#2187d7_45%,#192b8a)] opacity-[.28] blur-[23px] transition-[left,transform,opacity] duration-[220ms] ease-out group-hover:translate-y-[-19px] group-hover:opacity-100" />
    </button>
  );
}`,
    "preview-browser-button": `import { ArrowRight } from "lucide-react";

export function PreviewInBrowserButton() {
  return (
    <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#f0f0f0] bg-transparent px-6 py-3 text-base font-medium text-[#f0f0f0]">
      <span>Preview in browser</span>
      <span className="relative grid h-5 w-[17px] place-items-center overflow-hidden">
        <ArrowRight className="absolute rotate-[-45deg] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-4 group-hover:-translate-y-3" size={17} strokeWidth={2.4} />
        <ArrowRight className="absolute -translate-x-4 translate-y-3 rotate-[-45deg] transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" size={17} strokeWidth={2.4} />
      </span>
    </button>
  );
}`,
    "download-ios-button": `import { ArrowRight } from "lucide-react";

function AppleMark() {
  return (
    <svg className="size-6 shrink-0 text-[#f0f0f0] transition-[width,margin,opacity,transform] duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:-mr-2 group-hover:w-0 group-hover:-translate-x-[18px] group-hover:opacity-0 group-focus-visible:-mr-2 group-focus-visible:w-0 group-focus-visible:-translate-x-[18px] group-focus-visible:opacity-0" width="18" height="20" viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path d="M13.5621 5.45739C13.4857 5.50195 11.6671 6.44248 11.6671 8.52785C11.7528 10.9061 13.9621 11.7401 14 11.7401C13.9621 11.7847 13.6665 12.8763 12.7907 14.0205C12.0956 15.0062 11.3242 16 10.1528 16C9.0385 16 8.6385 15.3431 7.35278 15.3431C5.97203 15.3431 5.58135 16 4.5242 16C3.35277 16 2.52419 14.953 1.79127 13.9766C.839096 12.6986.0297778 10.6931.00120634 8.76747C-.0180484 7.74707.19189 6.74403.72481 5.89206C1.47699 4.70265 2.81985 3.89524 4.28631 3.86862C5.40992 3.83331 6.40992 4.58747 7.09563 4.58747C7.75278 4.58747 8.98135 3.86862 10.3714 3.86862C10.9714 3.86919 12.5714 4.03762 13.5621 5.45739ZM7.0006 3.66488C6.8006 2.73303 7.35278 1.80119 7.86706 1.20677C8.52421.487918 9.5621 0 10.4571 0C10.5143.931848 10.1522 1.84575 9.50496 2.51136C8.92421 3.23021 7.92421 3.77138 7.0006 3.66488Z" fill="currentColor" />
    </svg>
  );
}

export function DownloadIOSButton() {
  return (
    <button className="group inline-flex min-h-14 w-[228px] items-center justify-center overflow-hidden rounded-xl border border-[#ffffff14] bg-transparent px-4 py-2 text-[#f0f0f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#f97316]">
      <span className="relative inline-flex items-center gap-2">
        <AppleMark />
        <span className="relative z-10 whitespace-nowrap text-base font-medium">Download for IOS</span>
        <span className="-ml-2 grid h-6 w-0 translate-x-[18px] place-items-center overflow-hidden opacity-0 transition-[width,margin,opacity,transform] duration-[520ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:ml-0 group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:ml-0 group-focus-visible:w-6 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </span>
    </button>
  );
}`,
    "magnetic-fill-button": `import type { PointerEvent as ReactPointerEvent } from "react";

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
    <button
      onPointerMove={move}
      onPointerLeave={reset}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-[100px] border border-[#f0f0f0] bg-transparent px-8 py-3 text-base font-medium text-[#f0f0f0] [transform:translate(var(--magnetic-x,0px),var(--magnetic-y,0px))] transition-[transform,color] duration-[220ms] ease-[cubic-bezier(.16,1,.3,1)] hover:text-[#111] focus-visible:text-[#111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f97316]"
    >
      <span className="relative z-10">Start a project</span>
      <span className="absolute inset-x-0 bottom-0 h-0 bg-[#f97316] transition-[height] duration-[380ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:h-full group-focus-visible:h-full" aria-hidden="true" />
    </button>
  );
}`,
  };
  const tailwindCode = componentTailwindCode[item.id] ?? defaultTailwindCode;
  const implementation = styling === "Tailwind" ? tailwindCode : item.code;
  const code = language === "JavaScript" ? implementation.replace(/^import type[^\n]*\n/gm, "").replace(/: ReactPointerEvent<HTMLButtonElement>/g, "").replace(/: [A-Za-z][A-Za-z<>\[\]| ]*/g, "") : implementation;
  const separator = code.indexOf("\n/* ");
  const componentCode = styling === "CSS" && separator !== -1 ? code.slice(0, separator).trim() : code.trim();
  const cssCode = styling === "CSS" && separator !== -1 ? formatCssCode(code.slice(separator + 1)) : "";

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
