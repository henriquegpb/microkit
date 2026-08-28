const sharedComponentLogic = `const FREQUENCY = 3.4;
const DAMPING = 0.78;
const GLOW_RISE = 0.5;
const EDGE_SATURATION = 0.55;
const EDGE_BRIGHTNESS = 0.12;
const HUE_SHIFT = -5;

export function CursorEdgeGlowButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lightTrackRef = useRef<HTMLSpanElement>(null);
  const rightGlowRef = useRef<HTMLSpanElement>(null);
  const leftGlowRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    const lightTrack = lightTrackRef.current;
    const rightGlow = rightGlowRef.current;
    const leftGlow = leftGlowRef.current;
    if (!container || !button || !lightTrack || !rightGlow || !leftGlow) return;

    let bound = container.getBoundingClientRect().width / 2 + 12;
    let x = bound;
    let velocity = 0;
    let target = bound;
    let inside = false;
    let last = 0;

    const measure = () => {
      bound = container.getBoundingClientRect().width / 2 + 12;
    };

    const paint = () => {
      lightTrack.style.setProperty("--light-x", x.toFixed(2) + "px");
      const normalized = Math.max(-1, Math.min(1, x / bound));
      const magnitude = Math.abs(normalized);
      const intensity = Math.pow(magnitude, GLOW_RISE);
      const colorTuning =
        "hue-rotate(" + HUE_SHIFT + "deg)" +
        " saturate(" + (1 + EDGE_SATURATION * magnitude).toFixed(3) + ")" +
        " brightness(" + (1 + EDGE_BRIGHTNESS * magnitude).toFixed(3) + ")";

      rightGlow.style.opacity = (normalized > 0 ? intensity : 0).toFixed(3);
      leftGlow.style.opacity = (normalized < 0 ? intensity : 0).toFixed(3);
      rightGlow.style.filter = colorTuning;
      leftGlow.style.filter = colorTuning;
    };

    measure();
    paint();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => resizeObserver.disconnect();
    }

    const frame = (now = performance.now()) => {
      const delta = Math.min((now - last) / 1000, 0.032);
      last = now;
      const angularFrequency = 2 * Math.PI * FREQUENCY;
      velocity +=
        (angularFrequency * angularFrequency * (target - x) -
          2 * DAMPING * angularFrequency * velocity) *
        delta;
      x += velocity * delta;
      paint();

      if (inside || Math.abs(target - x) > 0.15 || Math.abs(velocity) > 0.6) {
        animationFrameRef.current = requestAnimationFrame(frame);
      } else {
        animationFrameRef.current = null;
        x = target;
        velocity = 0;
        paint();
      }
    };

    const kick = () => {
      if (animationFrameRef.current === null) {
        last = performance.now();
        animationFrameRef.current = requestAnimationFrame(frame);
      }
    };

    container.onpointermove = (event) => {
      const bounds = container.getBoundingClientRect();
      inside = true;
      target = Math.max(-bound, Math.min(bound, event.clientX - (bounds.left + bounds.width / 2)));
      kick();
    };

    container.onpointerleave = () => {
      inside = false;
      target = x;
      kick();
    };

    button.onfocus = () => {
      inside = false;
      target = 0;
      kick();
    };

    button.onblur = () => {
      inside = false;
      target = x;
      kick();
    };

    return () => {
      resizeObserver.disconnect();
      container.onpointermove = null;
      container.onpointerleave = null;
      button.onfocus = null;
      button.onblur = null;
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (`;

const componentMarkup = `    <div ref={containerRef} className="edge-light-button">
      <span ref={rightGlowRef} className="edge-light-button__glow" aria-hidden="true">
        <span className="edge-light-button__outer-glow" />
        <span className="edge-light-button__inner-glow" />
        <span className="edge-light-button__rim"><span className="edge-light-button__rim-glow" /></span>
      </span>
      <span ref={leftGlowRef} className="edge-light-button__glow edge-light-button__glow--mirrored" aria-hidden="true">
        <span className="edge-light-button__outer-glow" />
        <span className="edge-light-button__inner-glow" />
        <span className="edge-light-button__rim"><span className="edge-light-button__rim-glow" /></span>
      </span>
      <button ref={buttonRef} type="button" className="edge-light-button__control">
        <span ref={lightTrackRef} className="edge-light-button__light-track" aria-hidden="true">
          <span className="edge-light-button__light-core" />
          <span className="edge-light-button__light-bloom" />
        </span>
        <span>See in Action</span>
        <svg className="edge-light-button__arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 9" aria-hidden="true">
          <path fill="currentColor" fillRule="evenodd" d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}`;

const componentStyles = `.edge-light-button,
.edge-light-button * {
  box-sizing: border-box;
}

.edge-light-button {
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
}

.edge-light-button__glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(100% + 9px);
  height: calc(100% + 9px);
  border: 3px solid transparent;
  border-radius: 9999px;
  opacity: 1;
  transform: translate(-50%, -50%);
  pointer-events: none;
  will-change: transform;
}

.edge-light-button__glow--mirrored {
  opacity: 0;
  transform: translate(-50%, -50%) scaleX(-1);
}

.edge-light-button__outer-glow,
.edge-light-button__inner-glow {
  position: absolute;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  border-style: solid;
  border-color: transparent;
  border-radius: 9999px;
}

.edge-light-button__outer-glow {
  z-index: 20;
  left: -3px;
  top: -3px;
  border-width: 3px;
  background: linear-gradient(transparent, transparent) padding-box, linear-gradient(91.88deg, rgba(255, 137, 100, .2) 46.45%, #cd3100 98.59%) border-box;
  filter: blur(15px);
}

.edge-light-button__inner-glow {
  z-index: 10;
  left: -2px;
  top: -2px;
  border-width: 2px;
  background: linear-gradient(transparent, transparent) padding-box, linear-gradient(97.68deg, rgba(255, 177, 153, 0) 38.1%, rgba(255, 177, 153, .2) 82.47%, #ff7950 93.3%) border-box;
  filter: blur(2px);
}

.edge-light-button__rim {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 9999px;
  background: linear-gradient(transparent, transparent) padding-box, linear-gradient(103.7deg, rgba(188, 155, 143, .1) 38.66%, rgba(233, 132, 99, .1) 68.55%, #e98463 85.01%, #fff 92.12%) border-box;
}

.edge-light-button__rim-glow {
  position: absolute;
  z-index: 30;
  left: -2px;
  top: -2px;
  box-sizing: content-box;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 9999px;
  background: linear-gradient(transparent, transparent) padding-box, linear-gradient(91.96deg, rgba(255, 177, 153, 0) 6.11%, rgba(255, 177, 153, .2) 53.57%, #ff7950 93.6%) border-box;
  filter: blur(7px);
}

.edge-light-button__control {
  position: relative;
  z-index: 10;
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: .25rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .6);
  border-radius: 9999px;
  background: #d1d1d1;
  padding: 0 3.25rem;
  color: #5a250a;
  font-family: Inter, -apple-system, "Segoe UI", sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: -.015em;
  line-height: 1;
  text-transform: uppercase;
  cursor: pointer;
  transition: color .2s cubic-bezier(.4, 0, .2, 1);
}

.edge-light-button__light-track {
  --light-x: 120px;
  position: absolute;
  z-index: -10;
  left: 50%;
  top: 0;
  display: flex;
  width: 204px;
  height: 100%;
  margin-left: -102px;
  align-items: center;
  justify-content: center;
  transform: translateX(var(--light-x)) translateZ(0);
}

.edge-light-button__light-core {
  position: absolute;
  top: 50%;
  width: 121px;
  height: 121px;
  background: radial-gradient(50% 50% at 50% 50%, #fffff5 3.5%, #ffaa81 26.5%, #ffda9f 37.5%, rgba(255, 170, 129, .5) 49%, rgba(210, 106, 58, 0) 92.5%);
  transform: translateY(-50%);
}

.edge-light-button__light-bloom {
  position: absolute;
  top: 50%;
  width: 204px;
  height: 103px;
  background: radial-gradient(43.3% 44.23% at 50% 49.51%, #fffff7 29%, #fffacd 48.5%, #f4d2bf 60.71%, rgba(214, 211, 210, 0) 100%);
  filter: blur(5px);
  transform: translateY(-50%);
}

.edge-light-button__arrow {
  width: 17px;
  height: 9px;
  flex: none;
  color: #5a250a;
}

.edge-light-button__control:focus-visible {
  outline: 2px solid #ff8964;
  outline-offset: 8px;
}`;

export const componentCode = `"use client";

import "./cursor-edge-glow-button.css";

import { useEffect, useRef } from "react";

${sharedComponentLogic}
${componentMarkup}

/* cursor-edge-glow-button.css */
${componentStyles}`;

const tailwindMarkup = `    <div ref={containerRef} className="relative z-10 inline-flex items-center">
      <span ref={rightGlowRef} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] rounded-full border-[3px] border-transparent opacity-100 will-change-transform [transform:translate(-50%,-50%)]">
        <span className="absolute left-[-3px] top-[-3px] z-20 box-content h-full w-full rounded-full border-[3px] border-transparent blur-[15px] [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(91.88deg,rgba(255,137,100,.2)_46.45%,#cd3100_98.59%)_border-box]" />
        <span className="absolute left-[-2px] top-[-2px] z-10 box-content h-full w-full rounded-full border-2 border-transparent blur-[2px] [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(97.68deg,rgba(255,177,153,0)_38.1%,rgba(255,177,153,.2)_82.47%,#ff7950_93.3%)_border-box]" />
        <span className="relative block h-full w-full rounded-full border border-transparent [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(103.7deg,rgba(188,155,143,.1)_38.66%,rgba(233,132,99,.1)_68.55%,#e98463_85.01%,#fff_92.12%)_border-box]">
          <span className="absolute left-[-2px] top-[-2px] z-30 box-content h-full w-full rounded-full border-2 border-transparent blur-[7px] [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(91.96deg,rgba(255,177,153,0)_6.11%,rgba(255,177,153,.2)_53.57%,#ff7950_93.6%)_border-box]" />
        </span>
      </span>
      <span ref={leftGlowRef} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+9px)] w-[calc(100%+9px)] rounded-full border-[3px] border-transparent opacity-0 will-change-transform [transform:translate(-50%,-50%)_scaleX(-1)]">
        <span className="absolute left-[-3px] top-[-3px] z-20 box-content h-full w-full rounded-full border-[3px] border-transparent blur-[15px] [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(91.88deg,rgba(255,137,100,.2)_46.45%,#cd3100_98.59%)_border-box]" />
        <span className="absolute left-[-2px] top-[-2px] z-10 box-content h-full w-full rounded-full border-2 border-transparent blur-[2px] [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(97.68deg,rgba(255,177,153,0)_38.1%,rgba(255,177,153,.2)_82.47%,#ff7950_93.3%)_border-box]" />
        <span className="relative block h-full w-full rounded-full border border-transparent [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(103.7deg,rgba(188,155,143,.1)_38.66%,rgba(233,132,99,.1)_68.55%,#e98463_85.01%,#fff_92.12%)_border-box]">
          <span className="absolute left-[-2px] top-[-2px] z-30 box-content h-full w-full rounded-full border-2 border-transparent blur-[7px] [background:linear-gradient(transparent,transparent)_padding-box,linear-gradient(91.96deg,rgba(255,177,153,0)_6.11%,rgba(255,177,153,.2)_53.57%,#ff7950_93.6%)_border-box]" />
        </span>
      </span>
      <button ref={buttonRef} type="button" className="relative z-10 flex h-10 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full border border-white/60 bg-[#d1d1d1] px-[3.25rem] text-xs font-bold uppercase leading-none tracking-[-.015em] text-[#5a250a] transition-colors duration-200 ease-[cubic-bezier(.4,0,.2,1)] [font-family:Inter,-apple-system,'Segoe_UI',sans-serif] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#ff8964]">
        <span ref={lightTrackRef} aria-hidden="true" className="absolute left-1/2 top-0 z-[-10] ml-[-102px] flex h-full w-[204px] items-center justify-center [--light-x:120px] [transform:translateX(var(--light-x))_translateZ(0)]">
          <span className="absolute top-1/2 h-[121px] w-[121px] -translate-y-1/2 [background:radial-gradient(50%_50%_at_50%_50%,#fffff5_3.5%,#ffaa81_26.5%,#ffda9f_37.5%,rgba(255,170,129,.5)_49%,rgba(210,106,58,0)_92.5%)]" />
          <span className="absolute top-1/2 h-[103px] w-[204px] -translate-y-1/2 blur-[5px] [background:radial-gradient(43.3%_44.23%_at_50%_49.51%,#fffff7_29%,#fffacd_48.5%,#f4d2bf_60.71%,rgba(214,211,210,0)_100%)]" />
        </span>
        <span>See in Action</span>
        <svg className="h-[9px] w-[17px] flex-none text-[#5a250a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 9" aria-hidden="true">
          <path fill="currentColor" fillRule="evenodd" d="m12.495 0 4.495 4.495-4.495 4.495-.99-.99 2.805-2.805H0v-1.4h14.31L11.505.99z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}`;

export const tailwindCode = `"use client";

import { useEffect, useRef } from "react";

${sharedComponentLogic}
${tailwindMarkup}`;
