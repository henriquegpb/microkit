"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  Code2,
  Copy,
  Heart,
  Layers,
  Monitor,
  PanelLeft,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Smartphone,
  X,
  type LucideIcon,
} from "lucide-react";
import { interactions, type Interaction } from "../content/interactions/catalog";

const icons = { heart: Heart, search: Search, copy: Copy, back: ArrowLeft, code: Code2, grid: PanelLeft, reset: RotateCcw, desktop: Monitor, mobile: Smartphone, check: Check, close: X, sliders: SlidersHorizontal, arrow: ArrowUpRight, layers: Layers, clock: Clock } satisfies Record<string, LucideIcon>;
function Icon({ name, size = 16, filled = false }: { name: keyof typeof icons; size?: number; filled?: boolean }) { const Glyph = icons[name]; return <Glyph aria-hidden="true" size={size} strokeWidth={1.8} fill={filled ? "currentColor" : "none"} />; }

const SPOTLIGHT_ITEMS = [
  { label: "All components", icon: "layers" },
  { label: "Recently viewed", icon: "clock" },
  { label: "Favorites", icon: "heart" },
] satisfies { label: string; icon: keyof typeof icons }[];

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

function Demo({ id, large = false }: { id: string; large?: boolean }) {
  const cls = `demo ${large ? "demo-large" : ""}`;
  if (id === "focus-input") return <div className={cls}><label className="demo-input"><span>Project name</span><input placeholder="e.g. microkit-web" /></label></div>;
  if (id === "expanding-contact-button") return <div className={cls}><button className="contact-pill"><span className="contact-pill-icon" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.5}/></span><span>Get in touch</span></button></div>;
  if (id === "contact-reveal-button") return <div className={cls}><button className="contact-reveal"><span className="contact-reveal-icon" aria-hidden="true"><ArrowRight size={18} strokeWidth={2.5}/></span><span>Get in touch</span></button></div>;
  if (id === "spotlight-indicator") return <div className={cls}><SpotlightDemo/></div>;
  return <div className={cls}>Preview</div>;
}

export default function Home() {
  const [selected, setSelected] = useState<Interaction | null>(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [framework, setFramework] = useState("All frameworks");
  const [sort, setSort] = useState("Newest");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("microkit-favorites") || "[]");
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [codeTab, setCodeTab] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [canvas, setCanvas] = useState<"dark" | "light">("dark");
  const [strength, setStrength] = useState(24);
  const [sidebar, setSidebar] = useState(true);
  const [heroPointer, setHeroPointer] = useState({ x: 50, y: 50 });
  const [submitPage, setSubmitPage] = useState(false);

  useEffect(() => {
    const openSubmission = () => { setSelected(null); setSubmitPage(true); };
    window.addEventListener("open-submission", openSubmission);
    return () => window.removeEventListener("open-submission", openSubmission);
  }, []);

  const toggleFavorite = (id: string) => setFavorites(prev => { const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]; localStorage.setItem("microkit-favorites", JSON.stringify(next)); return next; });
  const copy = async (id: string, text: string) => { await navigator.clipboard?.writeText(text); setCopied(id); setTimeout(()=>setCopied(null), 1400); };
  const filtered = useMemo(() => interactions.filter(x => (category === "All" || x.category === category || (category === "Click feedback" && x.type === "Click")) && (framework === "All frameworks" || x.framework === framework) && `${x.name} ${x.category} ${x.type}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === "A–Z" ? a.name.localeCompare(b.name) : sort === "Popular" ? (a.id === "magnetic-button" ? -1 : 1) : (a.new === b.new ? 0 : a.new ? -1 : 1)), [category, framework, query, sort]);

  const chooseCategory = (x: string) => { setCategory(x); setSelected(null); };
  if (submitPage) return <SubmissionPage onBack={() => setSubmitPage(false)}/>;
  if (selected) return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} choose={chooseCategory}/><main className="playground-main"><div className="crumb"><button onClick={()=>setSelected(null)}><Icon name="back"/> All interactions</button><span>/</span><span>{selected.category}</span></div><section className="playground-heading"><div><div className="eyebrow">{selected.category} <span>•</span> {selected.framework}</div><h1>{selected.name}</h1><p>{selected.description}</p></div><div className="header-actions"><button className={`square ${favorites.includes(selected.id)?"saved":""}`} onClick={()=>toggleFavorite(selected.id)} aria-label="Save favorite"><Icon name="heart" size={22} filled={favorites.includes(selected.id)}/></button><button className="copy-main" onClick={()=>copy(selected.id, selected.code)}><Icon name={copied===selected.id?"check":"copy"}/> {copied===selected.id?"Copied":"Copy code"}</button></div></section><div className="play-tabs"><button className={!codeTab?"active":""} onClick={()=>setCodeTab(false)}>Preview</button><button className={codeTab?"active":""} onClick={()=>setCodeTab(true)}>Code</button></div>{!codeTab ? <div className="play-layout"><section className="canvas-card"><div className="canvas-toolbar"><div className="segmented"><button className={canvas==="dark"?"active":""} onClick={()=>setCanvas("dark")}>Dark</button><button className={canvas==="light"?"active":""} onClick={()=>setCanvas("light")}>Light</button></div><div className="toolbar-right"><div className="segmented"><button className={viewport==="desktop"?"active":""} onClick={()=>setViewport("desktop")}><Icon name="desktop"/></button><button className={viewport==="mobile"?"active":""} onClick={()=>setViewport("mobile")}><Icon name="mobile"/></button></div><button className="reset"><Icon name="reset"/> Reset</button></div></div><div className={`canvas ${canvas} ${viewport}`}><Demo id={selected.id} large/></div><div className="canvas-footer"><span><i className="status-dot"/> Live preview</span><span>⌘ Enter to reset</span></div></section><aside className="control-panel"><div className="control-title"><Icon name="sliders"/> Customize</div><label className="control"><span>Intensity <output>{strength}%</output></span><input type="range" value={strength} onChange={e=>setStrength(+e.target.value)} /></label><label className="control"><span>Duration <output>240ms</output></span><input type="range" defaultValue="45" /></label><label className="control"><span>Label</span><input value="Explore components" readOnly /></label><label className="check-control"><input type="checkbox" defaultChecked/> Enable reduced motion fallback</label></aside></div> : <CodePanel item={selected} copy={copy} copied={copied}/>}<DetailInfo item={selected}/></main></div></div>;

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} choose={chooseCategory}/><div className="gallery-workspace"><main className="gallery-main"><section className="hero-card" aria-label="MicroKit UI introduction" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setHeroPointer({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 }); }} style={{ "--pointer-x": `${heroPointer.x}%`, "--pointer-y": `${heroPointer.y}%` } as CSSProperties}><div className="hero-copy"><h2>Details Matter!</h2><p className="hero-description">MicroKit UI is a component library for developers who care about the experience behind every interaction.</p></div><div className="hero-figure" aria-hidden="true"><div className="hero-arch"/></div><span className="hero-grid-light" aria-hidden="true"/><span className="hero-border-flash hero-border-flash-top" aria-hidden="true"/><span className="hero-border-flash hero-border-flash-left" aria-hidden="true"/><span className="grid-slip grid-slip-one" aria-hidden="true"/><span className="grid-slip grid-slip-two" aria-hidden="true"/><span className="grid-slip grid-slip-three" aria-hidden="true"/><span className="grid-slip grid-slip-four" aria-hidden="true"/><span className="grid-slip grid-slip-five" aria-hidden="true"/></section><div className="gallery-header"><div><div className="eyebrow">Library <span>•</span> {category === "All" ? "All interactions" : category}</div><h1>{category === "All" ? "Explore interactions" : category}</h1><p>{filtered.length} {filtered.length === 1 ? "interaction" : "interactions"} ready to copy, adapt, and ship.</p></div><div className="gallery-controls"><label className="inline-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter results" /></label><select value={framework} onChange={e=>setFramework(e.target.value)}><option>All frameworks</option><option>React</option><option>CSS</option></select><select value={sort} onChange={e=>setSort(e.target.value)}><option>Newest</option><option>Popular</option><option>A–Z</option></select></div></div><div className="active-filter"><span>{category === "All" ? "All components" : category}</span>{query && <button onClick={()=>setQuery("")}><Icon name="close"/> Clear search</button>}</div><section className="gallery-grid">{filtered.map(item=><article className="interaction-card" key={item.id}><div className="card-preview"><Demo id={item.id}/>{item.new && <span className="new-badge">New</span>}<button className={`favorite ${favorites.includes(item.id)?"saved":""}`} onClick={()=>toggleFavorite(item.id)} aria-label={`Save ${item.name}`}><Icon name="heart" size={20} filled={favorites.includes(item.id)}/></button></div><button className="card-info" onClick={()=>setSelected(item)} aria-label={`Open ${item.name} playground`}><span><h2>{item.name}</h2><p>{item.category}</p></span><span className="card-meta"><span>{item.framework}</span>{item.dependency && <span>+ {item.dependency}</span>}<span className="state-type">{item.type}</span></span></button></article>)}</section>{!filtered.length && <div className="empty"><Icon name="search" size={28}/><h2>No interactions found</h2><p>Try a different search or clear your filters.</p><button onClick={()=>{setQuery("");setCategory("All");setFramework("All frameworks")}}>Clear all filters</button></div>}</main><aside className="sponsors-rail"><SponsorCard/></aside></div></div></div>;
}

function Header({ query, setQuery }: { query: string; setQuery: (x:string)=>void }) { return <header className="topbar"><nav><a className="current" href="#submit" onClick={(event)=>{ event.preventDefault(); window.dispatchEvent(new Event("open-submission")); }}>Submit</a></nav><label className="global-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search interactions"/><kbd>⌘ K</kbd></label><div className="top-actions"><a className="github" href="https://github.com/henriquegpb/microkit" target="_blank" rel="noreferrer"><Image src="/assets/img/GitHub.svg" alt="" width={15} height={15}/><span>GitHub</span></a></div></header> }

function SubmissionPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <div className="app submit-app"><Header query="" setQuery={()=>{}}/><main className="submit-page"><section className="submit-card submit-success"><span className="submit-check"><Check size={24}/></span><p className="eyebrow">Submission received</p><h1>Thanks for sharing{ name ? ` ${name}` : " your component" }.</h1><p>We’ll review the code and get in touch if it’s a fit for the library.</p><button className="submit-primary" onClick={onBack}>Back to the library</button></section></main></div>;

  return <div className="app submit-app"><Header query="" setQuery={()=>{}}/><main className="submit-page"><section className="submit-card"><button className="submit-back" onClick={onBack}><ArrowLeft size={15}/> All components</button><div className="submit-intro"><p className="eyebrow">Contribute</p><h1>Submit a component</h1><p>Share the code behind an interaction. A screenshot helps us understand the intended result, but it’s optional.</p></div><form className="submit-form" onSubmit={(event)=>{ event.preventDefault(); if (code.trim()) setSubmitted(true); }}><label>Component name <span>Optional</span><input value={name} onChange={event=>setName(event.target.value)} placeholder="e.g. Magnetic button" /></label><label>Component code<textarea value={code} onChange={event=>setCode(event.target.value)} placeholder={'export function Component() {\n  return <button>Hover me</button>;\n}'} required /></label><label className="screenshot-field">Screenshot <span>Optional · PNG, JPG, or WebP</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={event=>setScreenshot(event.target.files?.[0]?.name || "")} /><span className="upload-drop">{screenshot ? screenshot : "Choose an image or drop it here"}</span></label><button className="submit-primary" type="submit">Send component</button></form></section></main></div>;
}
const NAV_ITEMS = [
  { label: "All components", icon: "layers", count: interactions.length },
  { label: "Recently viewed", icon: "clock", count: 3 },
  { label: "Favorites", icon: "heart", count: 0 },
] satisfies { label: string; icon: keyof typeof icons; count: number }[];

function Sidebar({ open, toggle, choose }: { open:boolean; toggle:()=>void; choose:(x:string)=>void }) {
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const animatedRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const select = (i: number) => { setActiveIndex(i); if (i === 0) choose("All"); };

  return <aside className={`sidebar ${open?"":"collapsed"}`}><div className="sidebar-brand"><button className="brand" onClick={()=>location.reload()}><i/>MicroKit <span>UI</span></button><button className="sidebar-trigger" onClick={toggle} aria-label="Collapse sidebar"><Icon name="grid"/></button></div><div className="sidebar-scroll" ref={navRef}>{open && <span ref={indicatorRef} className="sidebar-nav-indicator" aria-hidden="true"/>}{NAV_ITEMS.map((item, i)=><button key={item.label} ref={el=>{btnRefs.current[i]=el;}} className={`sidebar-nav-item ${activeIndex===i?"sidebar-nav-item--active":""}`} onClick={()=>select(i)}><span className="side-row"><span className="sidebar-nav-item-icon"><Icon name={item.icon}/></span>{item.label}</span><em>{item.count}</em></button>)}</div></aside>;
}
function SponsorCard() { return <section className="sponsor-card" aria-label="Sponsors"><span className="sponsor-badge">Sponsor</span><h3>Backed by Nora</h3><p>MicroKit stays free and open, supported by sponsors who care about the craft behind every interaction.</p><a className="sponsor-cta" href="#nora">Visit Nora <Icon name="arrow"/></a><a className="sponsor-secondary" href="mailto:sponsors@microkit.ui">Become a sponsor</a></section> }
function CodePanel({ item, copy, copied }: { item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) {
  const [language, setLanguage] = useState<"JavaScript" | "TypeScript">("TypeScript");
  const [styling, setStyling] = useState<"CSS" | "Tailwind">(item.framework === "CSS" ? "CSS" : "Tailwind");
  const componentName = item.name.replaceAll(" ", "");
  const usage = language === "TypeScript"
    ? `import { ${componentName} } from "@/components/${item.id}";\n\nexport default function Example() {\n  return <${componentName} />;\n}`
    : `import { ${componentName} } from "./${item.id}.js";\n\nexport default function Example() {\n  return <${componentName} />;\n}`;
  const tailwindCode = item.id === "expanding-contact-button" ? `import { ArrowRight } from "lucide-react";

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
}` : `export function ${componentName}() {
  return (
    <div className="rounded-md border border-zinc-700 bg-zinc-950 p-4">
      <span className="text-zinc-200">${item.name}</span>
    </div>
  );
}`;
  const cssCode = item.framework === "CSS" ? item.code : item.code.includes("/*") ? item.code.slice(item.code.lastIndexOf("/*")) : item.code;
  const implementation = styling === "Tailwind" ? tailwindCode : cssCode;
  const code = language === "JavaScript" ? implementation.replace(/: [A-Za-z][A-Za-z<>\[\]| ]*/g, "") : implementation;

  return <div className="component-code"><section className="code-section"><h2>Usage</h2><CodeSnippet label="usage" code={usage} item={item} copy={copy} copied={copied}/></section><section className="code-section"><h2>Code</h2><div className="code-selectors"><label><span>{language === "TypeScript" ? "TS" : "JS"}</span><select value={language} onChange={event=>setLanguage(event.target.value as "JavaScript" | "TypeScript")}><option>JavaScript</option><option>TypeScript</option></select></label><label><span>⌁</span><select value={styling} onChange={event=>setStyling(event.target.value as "CSS" | "Tailwind")}><option>CSS</option><option>Tailwind</option></select></label></div><CodeSnippet label={`${item.id}-${language}-${styling}`} code={code} item={item} copy={copy} copied={copied}/></section></div>
}
function CodeSnippet({ label, code, item, copy, copied }: { label:string; code:string; item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) { const id=`${item.id}-${label}`; return <div className="code-snippet"><button className="snippet-copy" onClick={()=>copy(id,code)} aria-label="Copy code"><Icon name={copied===id?"check":"copy"}/></button><pre>{code.split("\n").map((line,index)=><span className="snippet-line" key={`${index}-${line}`}><i>{index + 1}</i><code>{line || " "}</code></span>)}</pre></div> }
function CodeBlock({ label, code, item, copy, copied }: { label:string; code:string; item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) { const id=`${item.id}-${label}`; return <div className="code-block"><div className="code-head"><span><Icon name="code"/> {label}</span><button onClick={()=>copy(id,code)}><Icon name={copied===id?"check":"copy"}/> {copied===id?"Copied":"Copy"}</button></div><pre><code>{code}</code></pre></div> }
function DetailInfo({ item }: { item:Interaction }) { return <section className="detail-info"><div><h2>Installation</h2><p>{item.dependency ? "This interaction uses a small external dependency for gesture handling." : "No dependencies required. Drop the component into your project."}</p><CodeBlock label="Terminal" code={item.dependency ? `npm install ${item.dependency}` : "# No installation required"} item={item} copy={()=>{}} copied={null}/></div><div><h2>Accessibility</h2><p>Keyboard interactive, with visible focus states and a reduced-motion fallback included by default.</p><div className="a11y-tags"><span>Keyboard</span><span>Focus visible</span><span>Reduced motion</span></div></div><div><h2>Related</h2><div className="related">{interactions.filter(x=>x.id!==item.id).map(x=><button key={x.id}>{x.name} <Icon name="arrow"/></button>)}</div></div></section> }
