"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Highlight, type Language, type PrismTheme } from "prism-react-renderer";
import { MorphIcon } from "morphicons/react";
// Icon data, not components: MorphIcon interpolates paths, so it consumes the
// `lucide` data package. Pinned to the same version as the `lucide-react`
// components rendered elsewhere, so the shape that morphs is the shape that
// sits still everywhere else.
import { Check as CheckData, Copy as CopyData } from "lucide";
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
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  HeartIcon,
  type AnimatedIconHandle,
  LayersIcon,
  LibraryIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
} from "../components/animated-icons";
import { otherLibraries, OtherLibraryPreview, type OtherLibrary } from "../components/other-libraries";
import { PackageManagerLogo } from "../components/package-manager-logos";
import { componentsByCategory, interactions, type Interaction } from "../content/interactions/catalog";
import { InteractionPreview } from "../components/interactions/registry";
import { StructuredData } from "../components/structured-data";
import { HomeBackground } from "../components/home-background";
import { Faq } from "../components/faq";
import { homeSchema, installationNote } from "./schema";
import {
  COMPONENTS_INDEX_DESCRIPTION,
  COMPONENTS_INDEX_HEADING,
  FRAMEWORK_ROUTES,
  frameworkDescription,
  frameworkHeading,
  frameworkLabel,
  GALLERY_HEADING,
  HERO_DESCRIPTION,
  PACKAGE_MANAGERS,
  REGISTRY_DIRECTORY_URL,
  REPO_URL,
  registryInstallCommand,
  registryItemAddress,
  registryRunner,
  type FrameworkRoute,
  type PackageManager,
} from "./site-metadata";
import { splitCssVariant, toJavaScript } from "./code-variants";
import { ThemeToggle } from "./theme";

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

const icons = { search: Search, copy: Copy, back: ArrowLeft, code: Code2, terminal: Terminal, grid: PanelLeft, reset: RotateCcw, desktop: Monitor, mobile: Smartphone, check: Check, close: X, sliders: SlidersHorizontal, arrow: ArrowUpRight } satisfies Record<string, LucideIcon>;
function Icon({ name, size = 16, filled = false }: { name: keyof typeof icons; size?: number; filled?: boolean }) { const Glyph = icons[name]; return <Glyph aria-hidden="true" size={size} strokeWidth={1.8} fill={filled ? "currentColor" : "none"} />; }

/**
 * The copy affordance, wherever it appears.
 *
 * One component so both copy buttons — the one floating over a code snippet and
 * the one labelled in a terminal block's header — confirm the same way. The
 * clipboard does not report back, so the icon turning into a check is the only
 * evidence the click did anything; morphing it rather than swapping it is what
 * ties the check to the button that was pressed.
 *
 * `reducedMotion="user"` because the rest of the catalog honours the setting,
 * and a morph degrades to the instant swap this used to be.
 */
function CopyGlyph({ done }: { done: boolean }) {
  return <MorphIcon icon={done ? CheckData : CopyData} size={16} strokeWidth={1.8} spring="snappy" reducedMotion="user" />;
}
type LibraryView = "all" | "libraries" | "favorites";

function FavoriteButton({ className, saved, label, onClick, size = 20 }: { className: string; saved: boolean; label: string; onClick: () => void; size?: number }) {
  const heartRef = useRef<AnimatedIconHandle>(null);
  return <button className={className} onClick={() => { onClick(); heartRef.current?.startAnimation(); }} onMouseEnter={() => heartRef.current?.startAnimation()} onMouseLeave={() => heartRef.current?.stopAnimation()} aria-label={label}><HeartIcon ref={heartRef} size={size} filled={saved}/></button>;
}

const NavigationIcon = forwardRef<AnimatedIconHandle, { name: "layers" | "library" | "heart" }>(({ name }, ref) => {
  if (name === "layers") return <LayersIcon ref={ref} size={16}/>;
  if (name === "library") return <LibraryIcon ref={ref} size={16}/>;
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

  /*
   * The light stays where it was left. Sending it home on the way out made the
   * artwork undo the one thing the reader had just done to it, and the return
   * trip was the most visible movement on the page — a light drifting back to a
   * corner nobody pointed at. HERO_TUNNEL_HOME is now only where it starts.
   *
   * The frame loop is left to finish the last few percent of travel to wherever
   * the pointer was when it crossed the edge, so the light settles rather than
   * stopping dead.
   */
  const handlePointerLeave = () => {
    boundsRef.current = null;
    trackingRef.current = false;
    startAnimation();
  };

  return (
    <div className="hero-arch" onPointerEnter={handlePointerEnter} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <svg className="hero-tunnel-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient ref={gradientRef} id="hero-tunnel-gradient" gradientUnits="userSpaceOnUse" cx={HERO_TUNNEL_HOME.x} cy={HERO_TUNNEL_HOME.y} r="115">
            {/*
              * As paradas vêm de tokens porque este gradiente tem tema: ele
              * desce da laranja da marca até a cor do próprio quadrado, e no
              * tema claro esse destino é o oposto do que é no escuro. Um
              * `stopColor` fixo aqui deixaria o túnel mergulhando no preto
              * dentro de um quadrado branco.
              */}
            <stop offset="0" stopColor="var(--tunnel-0)"/>
            <stop offset=".22" stopColor="var(--tunnel-1)"/>
            <stop offset=".5" stopColor="var(--tunnel-2)"/>
            <stop offset=".82" stopColor="var(--tunnel-3)"/>
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

/**
 * The hero, in two parts inside one border.
 *
 * `.hero-stage` is the picture — it carries the aspect ratio, the grid overlay,
 * the gradient and the container queries the slips and the copy size against.
 * The card around it is now just the frame and a column, so anything passed as
 * `children` lands under the picture and inside the same border.
 *
 * The pointer is measured against the stage rather than the card. The glowing
 * grid only covers the picture, so tracking the card would have offset the
 * light by however tall the footer happens to be.
 */
function HeroCard({ children }: { children?: React.ReactNode }) {
  return (
    <section className="hero-card" aria-label="MicroKit UI introduction">
      {/*
        No pointer tracking on the stage.

        It fed one thing: a grid that lit up under the cursor, drawn by masking
        a full-width overlay with a radial gradient whose centre moved every
        frame. That is a repaint of the whole card for a circle two hundred
        pixels across, on a page that has a WebGL field and forty-seven live
        previews to draw first. The tunnel keeps its own tracking — it moves one
        SVG gradient and repaints nothing else.
      */}
      <div className="hero-stage">
        <div className="hero-copy">
          <h2>Details Matter!</h2>
          <p className="hero-description">{HERO_DESCRIPTION}</p>
        </div>
        <div className="hero-figure" aria-hidden="true"><HeroTunnel/></div>
        <span className="hero-border-flash hero-border-flash-top" aria-hidden="true"/>
        <span className="hero-border-flash hero-border-flash-left" aria-hidden="true"/>
        <span className="grid-slip grid-slip-one" aria-hidden="true"/>
        <span className="grid-slip grid-slip-two" aria-hidden="true"/>
        <span className="grid-slip grid-slip-three" aria-hidden="true"/>
        <span className="grid-slip grid-slip-four" aria-hidden="true"/>
        <span className="grid-slip grid-slip-five" aria-hidden="true"/>
      </div>
      {children}
    </section>
  );
}

/**
 * The install line, under the hero.
 *
 * The catalog's pitch is that the code is yours to copy, which reads as work.
 * One command that writes a component into your project reads as no work at
 * all, and the home page never said it was possible — the whole story lived on
 * the component pages, below the fold, behind a tab.
 *
 * It cycles because the point is not one component: it is that any of the
 * forty-seven installs this way. The name is the only part that moves, so the
 * command reads as a constant with a slot in it.
 *
 * Hovering stops the rotation. A target that moves while you reach for the copy
 * button is a target you cannot hit, and the reader who hovers is the reader
 * about to use it. Reduced motion stops it for good and leaves the first one.
 */
/**
 * The install line, under the hero, cycling the catalog.
 *
 * The name changes one letter at a time, on the catalog's own Staggered Letter
 * Text Swap — same easing, same 125% travel, a clipped cell per character. That
 * component trades a word for itself so each letter has a partner; here the
 * name changes length, so the letters enter and there is nothing to trade with.
 *
 * Everything about the timer is gated, because this sits on a page already
 * running forty-seven live previews and a WebGL gradient, and an animation that
 * costs something while nobody is looking at it costs the person who is looking
 * at something else:
 *
 * - off screen, it stops (the hero scrolls away and never comes back for most
 *   readers, so this is the gate that does the most work)
 * - in a background tab, it stops
 * - under the pointer, it stops, so a moving target does not slip out from
 *   under somebody reaching for the copy button
 * - with reduced motion, it never starts
 *
 * The letters are spans rather than one animated element because the effect is
 * per character; they are cheap to animate — transforms, composited — and the
 * gates are what keep them from running when they are not earning it.
 */
function RegistryCallout() {
  const [index, setIndex] = useState(0);
  const [manager, setManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const item = interactions[index % interactions.length];
  const address = registryItemAddress(item.id);
  const command = registryInstallCommand(item.id, manager);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!onScreen || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer = 0;
    const start = () => { timer = window.setInterval(() => setIndex(i => i + 1), 2800); };
    const stop = () => { window.clearInterval(timer); timer = 0; };
    const onVisibility = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => { stop(); document.removeEventListener("visibilitychange", onVisibility); };
  }, [onScreen, hovered]);

  const copyCommand = async () => {
    await navigator.clipboard?.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section ref={rootRef} className="registry-callout" aria-label="Install with the shadcn CLI">
      {/*
        The pause belongs to the command box, not to the row around it. It was
        on the whole callout, and once the callout moved inside the hero card
        that meant crossing the bottom of the card stopped the rotation — which
        reads as the thing freezing rather than waiting for you.
      */}
      <div className="registry-command" onPointerEnter={()=>setHovered(true)} onPointerLeave={()=>setHovered(false)} onFocusCapture={()=>setHovered(true)} onBlurCapture={()=>setHovered(false)}>
        <div className="registry-runners" role="tablist" aria-label="Package manager">
          {PACKAGE_MANAGERS.map(name => (
            <button key={name} type="button" role="tab" aria-selected={manager===name} aria-label={name} title={name} className={manager===name ? "active" : ""} onClick={()=>setManager(name)}>
              <PackageManagerLogo name={name}/>
            </button>
          ))}
        </div>
        <code>
          <span className="registry-command-static">{registryRunner(manager)} shadcn@latest add </span>
          {/*
            A clipped cell per character, rising a beat behind the one before —
            the catalog's own Staggered Letter Text Swap, on its easing and its
            125% travel. That component trades a word for itself so each letter
            has a partner; here the name changes length, so the letters enter
            and there is nothing to trade with.

            Clipping keeps these off the cheap compositing path, which is what
            made them expensive while the hero was repainting a full-width grid
            under the cursor on every frame. That overlay is gone, so this is
            paid for. `aria-label` carries the whole string: a name split into
            thirty spans is thirty things to announce one at a time.
          */}
          <span key={item.id} className="registry-command-item" aria-label={address}>
            {address.split("").map((character, position) => (
              <span className="registry-letter" style={{ "--letter-delay": `${position * 18}ms` } as CSSProperties} key={position} aria-hidden="true">
                <span>{character}</span>
              </span>
            ))}
          </span>
        </code>
        <button type="button" className="registry-copy" onClick={copyCommand} aria-label={`Copy the install command for ${item.name}`}>
          <CopyGlyph done={copied}/>
        </button>
      </div>
      {/*
        The mark trades places with an arrow on hover, the same swap the Star on
        GitHub button runs: the logo collapses to nothing and slides left while
        the arrow opens from the right, so the row never changes width and the
        badge reads as a link rather than a label.
      */}
      <a className="registry-badge" href={REGISTRY_DIRECTORY_URL} target="_blank" rel="noreferrer">
        <span className="registry-badge-content">
          <span className="registry-badge-mark" aria-hidden="true"/>
          <span className="registry-badge-label">Official shadcn registry</span>
          <span className="registry-badge-arrow" aria-hidden="true"><ArrowRight size={14} strokeWidth={2.2}/></span>
        </span>
      </a>
    </section>
  );
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [libraryView, setLibraryView] = useState<LibraryView>("all");
  const [query, setQuery] = useState("");
  const [framework, setFramework] = useState("All frameworks");
  const [sort, setSort] = useState("Newest");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("microkit-favorites") || "[]");
  });
  const [sidebar, setSidebar] = useState(true);
  const toggleFavorite = (id: string) => setFavorites(prev => { const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]; localStorage.setItem("microkit-favorites", JSON.stringify(next)); return next; });
  const filtered = useMemo(() => {
    const matches = interactions.filter(item => (libraryView !== "all" || category === "All" || item.category === category || (category === "Click feedback" && item.type === "Click")) && (framework === "All frameworks" || item.framework === framework) && `${item.name} ${item.category} ${item.type}`.toLowerCase().includes(query.toLowerCase()));
    const scoped = libraryView === "favorites" ? matches.filter(item => favorites.includes(item.id)) : matches;
    return [...scoped].sort((a,b) => sort === "A–Z" ? a.name.localeCompare(b.name) : sort === "Popular" ? (a.id === "magnetic-button" ? -1 : 1) : (a.new === b.new ? 0 : a.new ? -1 : 1));
  }, [category, favorites, framework, libraryView, query, sort]);

  /*
   * "Other libraries" lists projects rather than interactions, so it answers to
   * the search box but not to the framework or sort controls — those describe
   * a snippet these entries do not have.
   */
  const libraries = useMemo(
    () => otherLibraries.filter(library => `${library.name} ${library.tagline} ${library.meta}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const showingLibraries = libraryView === "libraries";

  const chooseCategory = (view: LibraryView) => { localStorage.setItem("microkit-library-view", view); setLibraryView(view); setCategory("All"); };
  const openComponent = (item: Interaction) => {
    window.location.assign(`/components/${item.id}`);
  };
  /*
   * The card body is an <a href="/components/{id}">, so a click that lands
   * inside it is left alone: the browser navigates, and handling it here as
   * well would race the navigation to the same URL.
   */
  const handleCardClick = (event: ReactMouseEvent<HTMLElement>, item: Interaction) => {
    const target = event.target as HTMLElement;
    const demo = target.closest<HTMLElement>(".demo");
    if (target.closest(".card-info") || target.closest(".favorite") || (demo && target !== demo)) return;
    openComponent(item);
  };

  const count = showingLibraries ? libraries.length : filtered.length;
  const heading = showingLibraries ? "Other libraries" : category === "All" ? GALLERY_HEADING : category;

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><StructuredData schema={homeSchema}/><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={()=>setSidebar(!sidebar)} choose={chooseCategory}/><div className="gallery-workspace"><HomeBackground/><div className="gallery-row"><main className="gallery-main"><HeroCard><RegistryCallout/></HeroCard><div className="gallery-header"><div><div className="eyebrow">Library <span>•</span> {showingLibraries ? "Other libraries" : category === "All" ? "All interactions" : category}</div><h1>{heading}</h1>{showingLibraries ? <p>{count} {count === 1 ? "library" : "libraries"} we keep going back to. Built by other people, worth your time.</p> : <p>{count} {count === 1 ? "interaction" : "interactions"} ready to copy, adapt, and ship.</p>}{!showingLibraries && <Link className="gallery-index-link" href="/components">Browse all {interactions.length} as a list</Link>}</div><div className="gallery-controls"><label className="inline-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Filter results" /></label>{!showingLibraries && <><select value={framework} onChange={e=>setFramework(e.target.value)}><option>All frameworks</option><option>React</option><option>CSS</option></select><select value={sort} onChange={e=>setSort(e.target.value)}><option>Newest</option><option>Popular</option><option>A–Z</option></select></>}</div></div><div className="active-filter"><span>{showingLibraries ? "Other libraries" : category === "All" ? "All components" : category}</span>{query && <button onClick={()=>setQuery("")}><Icon name="close"/> Clear search</button>}</div>{showingLibraries ? <section className="gallery-grid">{libraries.map(library=><LibraryCard key={library.id} library={library}/>)}</section> : <section className="gallery-grid">{filtered.map(item=><article className="interaction-card" key={item.id} onClick={event=>handleCardClick(event,item)}><div className="card-preview"><Demo id={item.id}/>{item.new && <span className="new-badge">New</span>}<FavoriteButton className={`favorite ${favorites.includes(item.id)?"saved":""}`} saved={favorites.includes(item.id)} label={`Save ${item.name}`} onClick={()=>toggleFavorite(item.id)}/></div><a className="card-info" href={`/components/${item.id}`}><span><h2>{item.name}</h2><p>{item.category}</p></span><span className="card-meta"><span>{item.framework}</span><span className="state-type">{item.type}</span></span></a></article>)}</section>}{!count && <div className="empty"><Icon name="search" size={28}/><h2>{showingLibraries ? "No libraries found" : "No interactions found"}</h2><p>Try a different search or clear your filters.</p><button onClick={()=>{setQuery("");setCategory("All");setFramework("All frameworks")}}>Clear all filters</button></div>}<Faq/><HomeFootnote/></main><aside className="sponsors-rail"><SponsorCard/></aside></div></div></div></div>;
}

/*
 * A library is a destination, not a snippet: the whole card is a link out, and
 * the preview is the library demonstrating itself instead of a component you
 * could copy.
 */
function LibraryCard({ library }: { library: OtherLibrary }) {
  return <article className="interaction-card library-card">
    <div className="card-preview"><OtherLibraryPreview id={library.id}/><span className="library-badge">Library</span></div>
    <a className="card-info" href={library.href} target="_blank" rel="noreferrer"><span><h2>{library.name}</h2><p>{library.tagline}</p></span><span className="card-meta"><span>{library.meta}</span><span className="state-type">{library.scale}</span><span className="library-out" aria-hidden="true"><ArrowUpRight size={14} strokeWidth={2.2}/></span></span></a>
  </article>;
}

/** The sites this one took its cues from. */
const INSPIRATION = ["https://21st.dev/", "https://morphin.dev/", "https://huly.io/", "https://oryzo.ai/"];

/**
 * The credit at the floor of the home page.
 *
 * Home only, bottom left, and deliberately quiet: it sits under the FAQ at the
 * end of the one page somebody scrolls to the bottom of. Plain text rather than
 * anchors — this is an acknowledgement, not four ways off the page, and four
 * live links in the last line of a catalog would be the most clickable thing
 * below the fold.
 */
function HomeFootnote() {
  return <p className="home-footnote">Found inspiration in: {INSPIRATION.join(" ")}</p>;
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

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={() => setSidebar(!sidebar)} view="all" counts={{ all: interactions.length, libraries: otherLibraries.length, favorites: 0 }} choose={() => window.location.assign("/")} /><main className="playground-main"><div className="crumb"><button className="back-slide" onClick={() => window.location.assign("/")}><span className="back-slide-label">All interactions</span><span className="back-slide-icon" aria-hidden="true"><ArrowLeft size={20} strokeWidth={2.25}/></span></button><span>/</span><span>{item.category}</span></div><section className="playground-heading"><div><div className="eyebrow">{item.category} <span>•</span> {item.framework}</div><h1>{item.name}</h1><p>{item.description}</p></div><div className="header-actions"><FavoriteButton className={`square ${favorite ? "saved" : ""}`} saved={favorite} label="Save favorite" onClick={toggleFavorite}/></div></section><div className="play-tabs"><button className={!codeTab ? "active" : ""} onClick={() => setCodeTab(false)}>Preview</button><button className={codeTab ? "active" : ""} onClick={() => setCodeTab(true)}>Code</button></div><div className="play-panel" hidden={codeTab}><div className="play-layout"><section className="canvas-card"><div className="canvas dark desktop"><Demo id={item.id} large/></div><div className="canvas-footer"><span><i className="status-dot"/> Live preview</span></div></section></div></div><div className="play-panel" hidden={!codeTab}><Installation item={item} copy={copy} copied={copied}/><CodePanel item={item} copy={copy} copied={copied}/></div><Related item={item}/></main></div></div>;
}

/** How many neighbours a component page links to. */
const RELATED_COUNT = 6;

/**
 * Sideways links, which the site had none of.
 *
 * Every component page used to be a dead end: the only way out was back to the
 * home page. That leaves the forty-two pages sharing whatever authority the
 * home page passes down and passing none of it between themselves, and it gives
 * a crawler exactly one path through the catalog instead of a mesh.
 *
 * Same category first, because that is the honest sense of "related" here, then
 * topped up from the rest of the catalog — "Inputs" holds a single interaction,
 * so a strict same-category rule would render an empty block on that page and a
 * three-link one elsewhere.
 *
 * The component's own name is the link text. That is the whole point: `<button>`
 * told a crawler nothing, and "read more" would tell it just as little.
 */
function Related({ item }: { item: Interaction }) {
  const others = interactions.filter(other => other.id !== item.id);
  const sameCategory = others.filter(other => other.category === item.category);
  const related = [...sameCategory, ...others.filter(other => other.category !== item.category)].slice(0, RELATED_COUNT);

  return <section className="component-related"><h2>Related components</h2><ul>{related.map(other => <li key={other.id}><a href={`/components/${other.id}`}><span className="component-related-name">{other.name}</span><span className="component-related-meta">{other.category} <span>•</span> {other.framework}</span></a></li>)}</ul></section>;
}

/**
 * `/components` — the index the gallery never was.
 *
 * The home page renders forty-two live previews and no links; every card used
 * to open its component through a click handler, which meant the component
 * pages existed in the sitemap and nowhere in the site's own link graph. This
 * page is the plain-text counterpart: one anchor per component, its own name as
 * the link text, its description beside it, grouped by the category it belongs
 * to. It is cheap to crawl, it is a page in its own right for anyone searching
 * for the catalog rather than for one interaction, and it is the middle level
 * of the breadcrumb the component pages now declare.
 *
 * No previews here on purpose. The home page is where the interactions are
 * shown; repeating forty-two of them would make the index the slowest page on
 * the site and say nothing the home page does not already say better.
 */
export function ComponentsIndexPage() {
  return <ComponentIndexShell heading={COMPONENTS_INDEX_HEADING} intro={COMPONENTS_INDEX_DESCRIPTION} eyebrow={`${interactions.length} interactions`} groups={componentsByCategory} crumb={{ href: "/", label: "All interactions" }} activeFramework={null}/>;
}

/**
 * `/components/react` and `/components/css`.
 *
 * A framework is the one axis of this catalog that both splits it usefully —
 * 33 CSS against 9 React — and matches something people type. The category axis
 * does neither: 35 of the 42 sit in one category and one category holds a
 * single interaction.
 *
 * The rows are grouped by category inside the framework, so the page is not a
 * flat list of thirty-three names, and the crumb points back at the full index
 * rather than the home page — that is where this page's parent actually is.
 */
export function FrameworkIndexPage({ route }: { route: FrameworkRoute }) {
  const label = frameworkLabel(route);
  const groups = componentsByCategory
    .map(group => ({ category: group.category, items: group.items.filter(item => item.framework === label) }))
    .filter(group => group.items.length);
  const count = groups.reduce((total, group) => total + group.items.length, 0);

  return <ComponentIndexShell heading={frameworkHeading(route)} intro={frameworkDescription(route, count)} eyebrow={`${count} ${label} interactions`} groups={groups} crumb={{ href: "/components", label: COMPONENTS_INDEX_HEADING }} activeFramework={route}/>;
}

/**
 * The chrome and the list markup both index pages share.
 *
 * Extracted the moment there was a second one, so the two cannot drift into
 * describing the same catalog with different markup — the shape of these rows
 * is what the CollectionPage schema on each page claims is on screen.
 */
function ComponentIndexShell({ heading, intro, eyebrow, groups, crumb, activeFramework }: { heading: string; intro: string; eyebrow: string; groups: { category: string; items: Interaction[] }[]; crumb: { href: string; label: string }; activeFramework: FrameworkRoute | null }) {
  const [query, setQuery] = useState("");
  const [sidebar, setSidebar] = useState(true);

  return <div className={`app ${sidebar ? "" : "sidebar-is-collapsed"}`}><Header query={query} setQuery={setQuery}/><div className="shell"><Sidebar open={sidebar} toggle={() => setSidebar(!sidebar)} view="all" counts={{ all: interactions.length, libraries: otherLibraries.length, favorites: 0 }} choose={() => window.location.assign("/")} /><main className="playground-main"><div className="crumb"><Link className="back-slide" href={crumb.href}><span className="back-slide-label">{crumb.label}</span><span className="back-slide-icon" aria-hidden="true"><ArrowLeft size={20} strokeWidth={2.25}/></span></Link></div><section className="playground-heading"><div><div className="eyebrow">Library <span>•</span> {eyebrow}</div><h1>{heading}</h1><p>{intro}</p></div></section><div className="component-index">{groups.map(group => <section className="component-index-group" key={group.category}><h2>{group.category} <em>{group.items.length}</em></h2><ul>{group.items.map(item => <li key={item.id}><a href={`/components/${item.id}`}><span className="component-index-entry"><span className="component-index-name">{item.name}</span><span className="component-index-summary">{item.description}</span></span><span className="component-index-meta"><span>{item.framework}</span><span className="state-type">{item.type}</span></span></a></li>)}</ul></section>)}</div><FrameworkLinks active={activeFramework}/></main></div></div>;
}

/**
 * The two framework pages, linked from every index. Without this they would be
 * reachable only from the sitemap — the exact problem the component pages had.
 */
function FrameworkLinks({ active }: { active: FrameworkRoute | null }) {
  const routes = FRAMEWORK_ROUTES.filter(route => route !== active);
  if (!routes.length) return null;

  return <nav className="index-crosslinks" aria-label="Browse by framework"><span>Browse by framework</span>{routes.map(route => <Link key={route} href={`/components/${route}`}>{frameworkHeading(route)}</Link>)}</nav>;
}

function Header({ query, setQuery }: { query: string; setQuery: (x:string)=>void }) { return <header className="topbar"><nav><a className="current submit-link" href="/submit"><span>Submit</span><span className="submit-link-icon" aria-hidden="true"><ArrowRight className="submit-link-arrow submit-link-arrow-current" size={14} strokeWidth={2.2}/><ArrowRight className="submit-link-arrow submit-link-arrow-incoming" size={14} strokeWidth={2.2}/></span></a></nav><label className="global-search"><Icon name="search"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search interactions"/><kbd>⌘ K</kbd></label><div className="top-actions"><ThemeToggle/><a className="github" href={REPO_URL} target="_blank" rel="noreferrer"><span className="github-content"><Image className="github-mark" src="/assets/img/GitHub.svg" alt="" width={15} height={15}/><span className="github-label">Star on GitHub</span><span className="github-arrow" aria-hidden="true"><ArrowRight size={14} strokeWidth={2.2}/></span></span></a></div></header> }

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
  const issueUrl = `${REPO_URL}/issues/new?${new URLSearchParams({
    title: `[Component] ${name.trim() || "New submission"}`,
    body: issueBody,
  }).toString()}`;

  if (submitted) return <div className="app submit-app"><Header query="" setQuery={()=>{}}/><main className="submit-page"><section className="submit-card submit-success"><span className="submit-check"><Check size={24}/></span><p className="eyebrow">Continue on GitHub</p><h1>Your submission is prefilled.</h1><p>Review the component code in the GitHub description{screenshot ? ` and attach ${screenshot}` : ""}, then create the issue to send it for review.</p><div className="submit-success-actions"><a className="submit-primary" href={issueUrl} target="_blank" rel="noreferrer">Open GitHub form</a><button className="submit-secondary" onClick={onBack}>Back to the library</button></div></section></main></div>;

  return <div className="app submit-app"><Header query="" setQuery={()=>{}}/><main className="submit-page"><section className="submit-card"><button className="submit-back" onClick={onBack}><ArrowLeft size={15}/> All components</button><div className="submit-intro"><p className="eyebrow">Contribute</p><h1>Submit a component</h1><p>Share the code behind an interaction. We’ll prefill it in a GitHub issue where you can attach the optional screenshot.</p></div><form className="submit-form" onSubmit={(event)=>{event.preventDefault();if(!code.trim())return;void navigator.clipboard.writeText(code).catch(()=>{});window.open(issueUrl,"_blank","noopener,noreferrer");setSubmitted(true);}}><label>Component name <span>Optional</span><input value={name} onChange={event=>setName(event.target.value)} placeholder="e.g. Magnetic button" /></label><label>Component code<textarea value={code} onChange={event=>setCode(event.target.value)} placeholder={'export function Component() {\n  return <button>Hover me</button>;\n}'} required /></label><label className="screenshot-field">Screenshot <span>Optional · attach it in GitHub</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={event=>setScreenshot(event.target.files?.[0]?.name || "")} /><span className="upload-drop">{screenshot ? screenshot : "Choose an image to remember for the GitHub form"}</span></label><button className="submit-primary submit-primary-send" type="submit"><span>Send component</span><span className="submit-primary-icon" aria-hidden="true"><ArrowRight className="submit-primary-arrow submit-primary-arrow-current" size={15} strokeWidth={2.3}/><ArrowRight className="submit-primary-arrow submit-primary-arrow-incoming" size={15} strokeWidth={2.3}/></span></button></form></section></main></div>;
}
const NAV_ITEMS = [
  { label: "All components", icon: "layers", view: "all" },
  { label: "Other libraries", icon: "library", view: "libraries" },
  { label: "Favorites", icon: "heart", view: "favorites" },
] satisfies { label: string; icon: "layers" | "library" | "heart"; view: LibraryView }[];

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
  const liveCounts = counts ?? (typeof window === "undefined" ? { all: interactions.length, libraries: otherLibraries.length, favorites: 0 } : { all: interactions.length, libraries: otherLibraries.length, favorites: JSON.parse(localStorage.getItem("microkit-favorites") || "[]").length });

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
  const implementation = styling === "Tailwind" ? item.tailwindCode : item.code;
  // Tailwind carries its styles in the markup, so there is nothing to split off.
  const variant = styling === "CSS" ? splitCssVariant(implementation) : { component: implementation, css: "" };
  const componentCode = (language === "JavaScript" ? toJavaScript(variant.component) : variant.component).trim();
  const cssCode = variant.css;
  const code = componentCode;

  return <div className="component-code"><section className="code-section"><h2>Code</h2><div className="code-selectors"><label><span>{language === "TypeScript" ? "TS" : "JS"}</span><select value={language} onChange={event=>setLanguage(event.target.value as "JavaScript" | "TypeScript")}><option>JavaScript</option><option>TypeScript</option></select></label><label><span className={`code-style-logo ${styling.toLowerCase()}`}>{styling === "CSS" ? <Image src="/assets/img/CSS.svg" alt="" width={17} height={17} /> : <Image src="/assets/img/Tailwind.svg" alt="" width={20} height={12} />}</span><select value={styling} onChange={event=>setStyling(event.target.value as "CSS" | "Tailwind")}><option>CSS</option><option>Tailwind</option></select></label></div>{styling === "CSS" ? <div className="code-files"><div className="code-file"><h3>{language} component</h3><CodeSnippet label={`${item.id}-${language}`} code={componentCode} item={item} copy={copy} copied={copied}/></div><div className="code-file"><h3>CSS</h3><CodeSnippet label={`${item.id}-css`} code={cssCode} item={item} copy={copy} copied={copied}/></div></div> : <CodeSnippet label={`${item.id}-${language}-tailwind`} code={code} item={item} copy={copy} copied={copied}/>}</section></div>
}
function getSnippetLanguage(label: string): Language {
  if (label.endsWith("-css")) return "css";
  return label.includes("JavaScript") ? "jsx" : "tsx";
}
function CodeSnippet({ label, code, item, copy, copied }: { label:string; code:string; item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) {
  const id = `${item.id}-${label}`;
  const language = getSnippetLanguage(label);

  /*
   * The two prop objects are read for what they carry rather than spread.
   * prism-react-renderer still returns a `key` in them, and React 19 takes the
   * key off a spread object in preference to the explicit attribute — so every
   * token span was rendering keyless, one warning per line of every snippet.
   * It only ever surfaced when somebody opened the Code tab; now that the panel
   * is always in the DOM it fired on every build.
   */
  return <div className="code-snippet"><button className="snippet-copy" onClick={()=>copy(id,code)} aria-label="Copy code"><CopyGlyph done={copied===id}/></button><Highlight theme={microKitCodeTheme} code={code} language={language}>{({ tokens, getLineProps, getTokenProps })=><pre>{tokens.map((line,index)=>{const { className, style }=getLineProps({line});return <span key={index} style={style} className={`${className} snippet-line`}><i>{index + 1}</i><code>{line.map((token,tokenIndex)=>{const { className: tokenClass, style: tokenStyle, children }=getTokenProps({token});return <span key={tokenIndex} className={tokenClass} style={tokenStyle}>{children}</span>;})}</code></span>;})}</pre>}</Highlight></div>;
}
function CodeBlock({ label, code, item, copy, copied }: { label:string; code:string; item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) { const id=`${item.id}-${label}`; return <div className="code-block"><div className="code-head"><span><Icon name="terminal"/> {label}</span><button onClick={()=>copy(id,code)}><CopyGlyph done={copied===id}/> {copied===id?"Copied":"Copy"}</button></div><pre><code>{code}</code></pre></div> }
/**
 * The one Installation block, rendered by both views of a component.
 *
 * It used to sit inside `DetailInfo`, which `/components/[id]` never renders
 * and which `.detail-info{display:none}` hides in any case — so the indexable
 * page was the one that withheld the dependency. Its copy also described "a
 * small external dependency for gesture handling"; the only dependency in the
 * catalog is lucide-react, and it is there for icons.
 *
 * `installationNote` is shared with the JSON-LD, so the `dependencies` field
 * and this paragraph cannot come to say different things — including when there
 * is nothing to say, which is why both go quiet together.
 *
 * It opens the Code tab, above the source. Somebody who switched to Code came
 * for the implementation, and the one command that fetches it should be the
 * first thing they read.
 *
 * A heading, at most one sentence, and the command. There is no "manual" tab
 * beside it, because the manual path is the panel directly below in four
 * variants; and no paragraph under the command explaining where the file lands,
 * because the command names the component and the code follows it on the same
 * screen. Prose that narrates what the reader is looking at is prose to cut.
 *
 * The panel it lives in stays in the DOM while the Preview tab is open, so the
 * dependency sentence the schema's `dependencies` field quotes describes
 * something a crawler can see either way.
 */
function Installation({ item, copy, copied }: { item:Interaction; copy:(id:string,t:string)=>void; copied:string|null }) {
  const [manager, setManager] = useState<PackageManager>("npm");
  const note = installationNote(item);

  return <section className="component-install"><h2>Installation</h2>
    {note ? <p className="install-lead">{note}</p> : null}
    <div className="install-managers" data-active={PACKAGE_MANAGERS.indexOf(manager)} role="tablist" aria-label="Package manager">
      <span className="install-managers-indicator" aria-hidden="true" />
      {PACKAGE_MANAGERS.map(name=><button key={name} type="button" role="tab" aria-selected={manager===name} className={manager===name ? "active" : ""} onClick={()=>setManager(name)}><PackageManagerLogo name={name}/>{name}</button>)}
    </div>
    <CodeBlock label="Terminal" code={registryInstallCommand(item.id, manager)} item={item} copy={copy} copied={copied}/>
  </section>;
}
