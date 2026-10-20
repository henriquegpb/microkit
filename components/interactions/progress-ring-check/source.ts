export const componentCode = `"use client";

import "./styles.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

export type ProgressRingCheckStatus = "pending" | "running" | "done" | "failed" | "cancelled";

export type ProgressRingCheckProps = {
  status?: ProgressRingCheckStatus;
  progress?: number;
  label?: ReactNode;
  color?: string;
  doneColor?: string;
  errorColor?: string;
  size?: number;
  strokeWidth?: number;
  dashes?: number;
  fontSize?: number;
  spinDuration?: number;
  arcLength?: number;
  drawDuration?: number;
  fillOpacity?: number;
  strike?: boolean;
  strikeDelay?: number;
  className?: string;
  style?: CSSProperties;
};

const UI = { type: "spring" as const, duration: 0.3, bounce: 0 };
const MORPH = { duration: 0.3, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] };
const CHECK = "M7.5 12.25 10.5 15.25 16.75 8.75";
const CROSS = "M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5";
const TEXT: Record<ProgressRingCheckStatus, string> = {
  pending: "Pending",
  running: "In progress",
  done: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
};
const IDLE_DASH = 0.3;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function ProgressRingCheck({
  status = "pending",
  progress,
  label,
  color = "currentColor",
  doneColor = "#22c55e",
  errorColor = "#ef4444",
  size = 20,
  strokeWidth = 2,
  dashes = 8,
  fontSize = 14,
  spinDuration = 1100,
  arcLength = 0.68,
  drawDuration = 240,
  fillOpacity = 0.06,
  strike = true,
  strikeDelay = 60,
  className = "",
  style,
}: ProgressRingCheckProps) {
  const reduce = useReducedMotion();
  const r = 10 - strokeWidth / 2;
  const C = 2 * Math.PI * r;
  const P = C / Math.max(1, dashes);
  const determinate = status === "running" && typeof progress === "number" && Number.isFinite(progress);
  const indeterminate = status === "running" && !determinate;
  const solid = status === "running" || status === "done" || status === "failed";
  const targetArc = indeterminate ? arcLength : determinate ? clamp01(progress as number) : 1;

  const mode = useMotionValue(solid ? 1 : 0);
  const arc = useMotionValue(targetArc);
  const travel = useMotionValue(0);
  const ringRef = useRef<SVGCircleElement>(null);
  const geo = useRef({ C, P });
  const gen = useRef(0);

  const writeDash = () => {
    const g = geo.current;
    const m = mode.get();
    const a = arc.get();
    const dash = IDLE_DASH * g.P + (a * g.C - IDLE_DASH * g.P) * m;
    const gap = (1 - IDLE_DASH) * g.P + ((1 - a) * g.C - (1 - IDLE_DASH) * g.P) * m;
    ringRef.current?.setAttribute("stroke-dasharray", \`\${Math.max(0, dash)} \${Math.max(0, gap)}\`);
  };

  useLayoutEffect(() => {
    geo.current = { C, P };
    writeDash();
    ringRef.current?.setAttribute("stroke-dashoffset", String(travel.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [C, P]);

  useEffect(() => {
    const offs = [
      mode.on("change", writeDash),
      arc.on("change", writeDash),
      travel.on("change", (value: number) => ringRef.current?.setAttribute("stroke-dashoffset", String(value))),
    ];
    return () => {
      offs.forEach((off) => off());
      mode.stop();
      arc.stop();
      travel.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const g = ++gen.current;
    if (reduce) {
      mode.jump(solid ? 1 : 0);
      arc.jump(targetArc);
      travel.jump(0);
      return;
    }
    if (mode.get() === 0) arc.jump(targetArc);
    animate(mode, solid ? 1 : 0, MORPH);
    animate(arc, targetArc, UI);
    if (indeterminate) {
      const t0 = travel.get();
      animate(travel, [t0, t0 - C], { duration: spinDuration / 1000, ease: "linear", repeat: Infinity });
      return;
    }
    const unit = determinate ? C : P;
    const to = Math.floor(travel.get() / unit) * unit;
    animate(travel, to, UI).then(() => {
      if (gen.current === g) travel.jump(0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, determinate, targetArc, reduce, C, P, spinDuration]);

  const spoken = TEXT[status] + (determinate ? \`, \${Math.round(clamp01(progress as number) * 100)}%\` : "");
  const hasLabel = label !== undefined && label !== null;

  return (
    <span
      className={\`progress-ring-check\${className ? \` \${className}\` : ""}\`}
      data-status={status}
      data-indeterminate={indeterminate ? "" : undefined}
      data-strike={strike ? "" : undefined}
      style={
        {
          "--prc-size": \`\${size}px\`,
          "--prc-stroke": strokeWidth,
          "--prc-color": color,
          "--prc-done": doneColor,
          "--prc-error": errorColor,
          "--prc-fill": fillOpacity,
          "--prc-font": \`\${fontSize}px\`,
          "--prc-draw": \`\${drawDuration}ms\`,
          "--prc-strike-delay": \`\${120 + strikeDelay}ms\`,
          "--prc-check-delay": "120ms",
          ...style,
        } as CSSProperties
      }
    >
      <svg
        className="progress-ring-check__icon"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        role={hasLabel ? undefined : "img"}
        aria-label={hasLabel ? undefined : spoken}
        aria-hidden={hasLabel || undefined}
      >
        <circle className="progress-ring-check__track" cx="12" cy="12" r={r} transform="rotate(-90 12 12)" />
        <circle ref={ringRef} className="progress-ring-check__ring" cx="12" cy="12" r={r} transform="rotate(-90 12 12)" />
        <path className="progress-ring-check__glyph progress-ring-check__glyph--check" d={CHECK} pathLength="1" />
        <path className="progress-ring-check__glyph progress-ring-check__glyph--cross" d={CROSS} pathLength="1" />
      </svg>
      {hasLabel ? <span className="progress-ring-check__sr">{spoken}: </span> : null}
      {hasLabel ? (
        <span className="progress-ring-check__label">
          {label}
          <span className="progress-ring-check__strike" aria-hidden="true" />
        </span>
      ) : null}
    </span>
  );
}

const tasks: { label: string; status: ProgressRingCheckStatus }[] = [
  { label: "Sync calendar events", status: "done" },
  { label: "Generate weekly report", status: "running" },
  { label: "Notify the team", status: "pending" },
];

const SPIN_MS = 1600;

const nextStatus: Record<Exclude<ProgressRingCheckStatus, "pending" | "running">, ProgressRingCheckStatus> = {
  done: "failed",
  failed: "cancelled",
  cancelled: "pending",
};

export function ProgressRingCheckList() {
  const [statuses, setStatuses] = useState(() => tasks.map((task) => task.status));
  const timers = useRef<number[]>([]);

  const update = (index: number, status: ProgressRingCheckStatus) =>
    setStatuses((current) => current.map((value, i) => (i === index ? status : value)));

  const finishLater = (index: number) => {
    timers.current.push(window.setTimeout(() => update(index, "done"), SPIN_MS));
  };

  useEffect(() => {
    const pending = timers.current;
    tasks.forEach((task, index) => {
      if (task.status !== "running") return;
      const finish = () => setStatuses((current) => current.map((value, i) => (i === index ? "done" : value)));
      pending.push(window.setTimeout(finish, SPIN_MS));
    });
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const advance = (index: number) => {
    const status = statuses[index];
    if (status === "pending") {
      update(index, "running");
      finishLater(index);
    } else if (status !== "running") {
      update(index, nextStatus[status]);
    }
  };

  return (
    <div className="progress-ring-check-list">
      {tasks.map((task, index) => (
        <button key={task.label} type="button" className="progress-ring-check-list__row" onClick={() => advance(index)}>
          <ProgressRingCheck
            status={statuses[index]}
            label={task.label}
            size={22}
            fontSize={16}
          />
        </button>
      ))}
    </div>
  );
}

/* styles.css */
.progress-ring-check {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: calc(var(--prc-size) * .5);
  line-height: 1;
  vertical-align: middle;
}

.progress-ring-check__icon {
  flex-shrink: 0;
  overflow: visible;
  color: var(--prc-color);
  transition: color 200ms ease;
}

.progress-ring-check[data-status="done"] .progress-ring-check__icon {
  color: var(--prc-done);
}

.progress-ring-check[data-status="failed"] .progress-ring-check__icon {
  color: var(--prc-error);
}

.progress-ring-check__track {
  fill: currentColor;
  fill-opacity: 0;
  stroke: currentColor;
  stroke-opacity: 0;
  stroke-width: var(--prc-stroke);
  transition: fill-opacity 180ms ease, stroke-opacity 200ms ease;
}

.progress-ring-check[data-status="running"] .progress-ring-check__track {
  stroke-opacity: .2;
}

.progress-ring-check[data-status="done"] .progress-ring-check__track,
.progress-ring-check[data-status="failed"] .progress-ring-check__track {
  fill-opacity: var(--prc-fill);
}

.progress-ring-check__ring {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: var(--prc-stroke);
  opacity: .55;
  transition: opacity 200ms ease;
}

.progress-ring-check[data-status="running"] .progress-ring-check__ring,
.progress-ring-check[data-status="done"] .progress-ring-check__ring,
.progress-ring-check[data-status="failed"] .progress-ring-check__ring {
  opacity: 1;
}

.progress-ring-check__glyph {
  fill: none;
  stroke: currentColor;
  stroke-dasharray: 1 2;
  stroke-dashoffset: 1.05;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: var(--prc-stroke);
  opacity: 0;
  transition: stroke-dashoffset 160ms cubic-bezier(.23, 1, .32, 1), opacity 0ms linear 160ms;
}

.progress-ring-check[data-status="done"] .progress-ring-check__glyph--check,
.progress-ring-check[data-status="failed"] .progress-ring-check__glyph--cross,
.progress-ring-check[data-status="cancelled"] .progress-ring-check__glyph--cross {
  stroke-dashoffset: 0;
  opacity: 1;
  transition:
    stroke-dashoffset var(--prc-draw) cubic-bezier(.23, 1, .32, 1) var(--prc-check-delay),
    opacity 0ms linear var(--prc-check-delay);
}

.progress-ring-check__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
}

.progress-ring-check__label {
  position: relative;
  color: var(--prc-color);
  font-size: var(--prc-font);
  line-height: 1.25;
  opacity: .65;
  transition: opacity 200ms ease;
}

.progress-ring-check[data-status="running"] .progress-ring-check__label,
.progress-ring-check[data-status="failed"] .progress-ring-check__label {
  opacity: 1;
}

.progress-ring-check[data-status="done"] .progress-ring-check__label {
  opacity: .6;
}

.progress-ring-check[data-status="cancelled"] .progress-ring-check__label {
  opacity: .55;
}

.progress-ring-check__strike {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  height: max(1px, calc(var(--prc-font) / 14));
  background: currentColor;
  pointer-events: none;
  transform: scaleX(0);
  transform-origin: left;
  translate: 0 -50%;
  transition: transform 160ms cubic-bezier(.23, 1, .32, 1);
}

.progress-ring-check[data-status="done"][data-strike] .progress-ring-check__strike {
  transform: scaleX(1);
  transition: transform 280ms cubic-bezier(.23, 1, .32, 1) var(--prc-strike-delay);
}

.progress-ring-check-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.progress-ring-check-list__row {
  appearance: none;
  display: flex;
  min-height: 44px;
  align-items: center;
  border: 0;
  border-radius: 12px;
  background: transparent;
  padding: 0 14px;
  color: light-dark(#14181e, #f2f4f6);
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color .2s ease;
}

.progress-ring-check-list__row:hover {
  background: light-dark(#f0f2f5, #1b1e23);
}

.progress-ring-check-list__row:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

@keyframes prc-breathe {
  50% {
    opacity: .45;
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-ring-check[data-indeterminate] .progress-ring-check__ring {
    animation: prc-breathe 1400ms cubic-bezier(.77, 0, .175, 1) infinite;
  }

  .progress-ring-check__glyph {
    stroke-dashoffset: 0;
    transition: opacity 200ms ease;
  }

  .progress-ring-check[data-status="done"] .progress-ring-check__glyph--check,
  .progress-ring-check[data-status="failed"] .progress-ring-check__glyph--cross,
  .progress-ring-check[data-status="cancelled"] .progress-ring-check__glyph--cross {
    transition: opacity 200ms ease;
  }

  .progress-ring-check__strike {
    transform: scaleX(1);
    opacity: 0;
    transition: opacity 200ms ease;
  }

  .progress-ring-check[data-status="done"][data-strike] .progress-ring-check__strike {
    transform: scaleX(1);
    opacity: 1;
    transition: opacity 200ms ease;
  }

  .progress-ring-check-list__row {
    transition: none;
  }
}`;

export const tailwindCode = `"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { animate, useMotionValue, useReducedMotion } from "motion/react";

export type ProgressRingCheckStatus = "pending" | "running" | "done" | "failed" | "cancelled";

export type ProgressRingCheckProps = {
  status?: ProgressRingCheckStatus;
  progress?: number;
  label?: ReactNode;
  color?: string;
  doneColor?: string;
  errorColor?: string;
  size?: number;
  strokeWidth?: number;
  dashes?: number;
  fontSize?: number;
  spinDuration?: number;
  arcLength?: number;
  drawDuration?: number;
  fillOpacity?: number;
  strike?: boolean;
  strikeDelay?: number;
  className?: string;
  style?: CSSProperties;
};

const UI = { type: "spring" as const, duration: 0.3, bounce: 0 };
const MORPH = { duration: 0.3, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] };
const CHECK = "M7.5 12.25 10.5 15.25 16.75 8.75";
const CROSS = "M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5";
const TEXT: Record<ProgressRingCheckStatus, string> = {
  pending: "Pending",
  running: "In progress",
  done: "Completed",
  failed: "Failed",
  cancelled: "Cancelled",
};
const IDLE_DASH = 0.3;
const STYLE = "@keyframes prc-breathe{50%{opacity:.45}}";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function ProgressRingCheck({
  status = "pending",
  progress,
  label,
  color = "currentColor",
  doneColor = "#22c55e",
  errorColor = "#ef4444",
  size = 20,
  strokeWidth = 2,
  dashes = 8,
  fontSize = 14,
  spinDuration = 1100,
  arcLength = 0.68,
  drawDuration = 240,
  fillOpacity = 0.06,
  strike = true,
  strikeDelay = 60,
  className = "",
  style,
}: ProgressRingCheckProps) {
  const reduce = useReducedMotion();
  const r = 10 - strokeWidth / 2;
  const C = 2 * Math.PI * r;
  const P = C / Math.max(1, dashes);
  const determinate = status === "running" && typeof progress === "number" && Number.isFinite(progress);
  const indeterminate = status === "running" && !determinate;
  const solid = status === "running" || status === "done" || status === "failed";
  const targetArc = indeterminate ? arcLength : determinate ? clamp01(progress as number) : 1;

  const mode = useMotionValue(solid ? 1 : 0);
  const arc = useMotionValue(targetArc);
  const travel = useMotionValue(0);
  const ringRef = useRef<SVGCircleElement>(null);
  const geo = useRef({ C, P });
  const gen = useRef(0);

  const writeDash = () => {
    const g = geo.current;
    const m = mode.get();
    const a = arc.get();
    const dash = IDLE_DASH * g.P + (a * g.C - IDLE_DASH * g.P) * m;
    const gap = (1 - IDLE_DASH) * g.P + ((1 - a) * g.C - (1 - IDLE_DASH) * g.P) * m;
    ringRef.current?.setAttribute("stroke-dasharray", \`\${Math.max(0, dash)} \${Math.max(0, gap)}\`);
  };

  useLayoutEffect(() => {
    geo.current = { C, P };
    writeDash();
    ringRef.current?.setAttribute("stroke-dashoffset", String(travel.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [C, P]);

  useEffect(() => {
    const offs = [
      mode.on("change", writeDash),
      arc.on("change", writeDash),
      travel.on("change", (value: number) => ringRef.current?.setAttribute("stroke-dashoffset", String(value))),
    ];
    return () => {
      offs.forEach((off) => off());
      mode.stop();
      arc.stop();
      travel.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const g = ++gen.current;
    if (reduce) {
      mode.jump(solid ? 1 : 0);
      arc.jump(targetArc);
      travel.jump(0);
      return;
    }
    if (mode.get() === 0) arc.jump(targetArc);
    animate(mode, solid ? 1 : 0, MORPH);
    animate(arc, targetArc, UI);
    if (indeterminate) {
      const t0 = travel.get();
      animate(travel, [t0, t0 - C], { duration: spinDuration / 1000, ease: "linear", repeat: Infinity });
      return;
    }
    const unit = determinate ? C : P;
    const to = Math.floor(travel.get() / unit) * unit;
    animate(travel, to, UI).then(() => {
      if (gen.current === g) travel.jump(0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, determinate, targetArc, reduce, C, P, spinDuration]);

  const spoken = TEXT[status] + (determinate ? \`, \${Math.round(clamp01(progress as number) * 100)}%\` : "");
  const hasLabel = label !== undefined && label !== null;

  return (
    <span
      className={\`group relative inline-flex items-center align-middle leading-none [gap:calc(var(--prc-size)*0.5)]\${className ? \` \${className}\` : ""}\`}
      data-status={status}
      data-indeterminate={indeterminate ? "" : undefined}
      data-strike={strike ? "" : undefined}
      style={
        {
          "--prc-size": \`\${size}px\`,
          "--prc-stroke": strokeWidth,
          "--prc-color": color,
          "--prc-done": doneColor,
          "--prc-error": errorColor,
          "--prc-fill": fillOpacity,
          "--prc-font": \`\${fontSize}px\`,
          "--prc-draw": \`\${drawDuration}ms\`,
          "--prc-strike-delay": \`\${120 + strikeDelay}ms\`,
          "--prc-check-delay": "120ms",
          ...style,
        } as CSSProperties
      }
    >
      <style>{STYLE}</style>
      <svg
        className="shrink-0 overflow-visible [color:var(--prc-color)] [transition:color_200ms_ease] group-data-[status=done]:[color:var(--prc-done)] group-data-[status=failed]:[color:var(--prc-error)]"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        role={hasLabel ? undefined : "img"}
        aria-label={hasLabel ? undefined : spoken}
        aria-hidden={hasLabel || undefined}
      >
        <circle className="[fill:currentColor] [stroke:currentColor] [stroke-width:var(--prc-stroke)] [fill-opacity:0] [stroke-opacity:0] [transition:fill-opacity_180ms_ease,stroke-opacity_200ms_ease] group-data-[status=running]:[stroke-opacity:0.2] group-data-[status=done]:[fill-opacity:var(--prc-fill)] group-data-[status=failed]:[fill-opacity:var(--prc-fill)]" cx="12" cy="12" r={r} transform="rotate(-90 12 12)" />
        <circle ref={ringRef} className="fill-none [stroke:currentColor] [stroke-width:var(--prc-stroke)] [stroke-linecap:round] opacity-[0.55] [transition:opacity_200ms_ease] group-data-[status=running]:opacity-100 group-data-[status=done]:opacity-100 group-data-[status=failed]:opacity-100 motion-reduce:group-data-[indeterminate]:animate-[prc-breathe_1400ms_cubic-bezier(0.77,0,0.175,1)_infinite]" cx="12" cy="12" r={r} transform="rotate(-90 12 12)" />
        <path className="fill-none [stroke:currentColor] [stroke-width:var(--prc-stroke)] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:1_2] [stroke-dashoffset:1.05] opacity-0 [transition:stroke-dashoffset_160ms_cubic-bezier(0.23,1,0.32,1),opacity_0ms_linear_160ms] motion-reduce:[stroke-dashoffset:0] motion-reduce:[transition:opacity_200ms_ease] group-data-[status=done]:[stroke-dashoffset:0] group-data-[status=done]:opacity-100 group-data-[status=done]:[transition:stroke-dashoffset_var(--prc-draw)_cubic-bezier(0.23,1,0.32,1)_var(--prc-check-delay),opacity_0ms_linear_var(--prc-check-delay)] motion-reduce:group-data-[status=done]:[transition:opacity_200ms_ease]" d={CHECK} pathLength="1" />
        <path className="fill-none [stroke:currentColor] [stroke-width:var(--prc-stroke)] [stroke-linecap:round] [stroke-linejoin:round] [stroke-dasharray:1_2] [stroke-dashoffset:1.05] opacity-0 [transition:stroke-dashoffset_160ms_cubic-bezier(0.23,1,0.32,1),opacity_0ms_linear_160ms] motion-reduce:[stroke-dashoffset:0] motion-reduce:[transition:opacity_200ms_ease] group-data-[status=failed]:[stroke-dashoffset:0] group-data-[status=failed]:opacity-100 group-data-[status=failed]:[transition:stroke-dashoffset_var(--prc-draw)_cubic-bezier(0.23,1,0.32,1)_var(--prc-check-delay),opacity_0ms_linear_var(--prc-check-delay)] motion-reduce:group-data-[status=failed]:[transition:opacity_200ms_ease] group-data-[status=cancelled]:[stroke-dashoffset:0] group-data-[status=cancelled]:opacity-100 group-data-[status=cancelled]:[transition:stroke-dashoffset_var(--prc-draw)_cubic-bezier(0.23,1,0.32,1)_var(--prc-check-delay),opacity_0ms_linear_var(--prc-check-delay)] motion-reduce:group-data-[status=cancelled]:[transition:opacity_200ms_ease]" d={CROSS} pathLength="1" />
      </svg>
      {hasLabel ? <span className="sr-only">{spoken}: </span> : null}
      {hasLabel ? (
        <span className="relative leading-[1.25] opacity-[0.65] [color:var(--prc-color)] [font-size:var(--prc-font)] [transition:opacity_200ms_ease] group-data-[status=running]:opacity-100 group-data-[status=done]:opacity-60 group-data-[status=failed]:opacity-100 group-data-[status=cancelled]:opacity-[0.55]">
          {label}
          <span className="pointer-events-none absolute inset-x-0 top-1/2 origin-left bg-current [transform:scaleX(0)] [translate:0_-50%] [height:max(1px,calc(var(--prc-font)/14))] [transition:transform_160ms_cubic-bezier(0.23,1,0.32,1)] group-data-[status=done]:group-data-[strike]:[transform:scaleX(1)] group-data-[status=done]:group-data-[strike]:[transition:transform_280ms_cubic-bezier(0.23,1,0.32,1)_var(--prc-strike-delay)] motion-reduce:[transform:scaleX(1)]! motion-reduce:opacity-0 motion-reduce:[transition:opacity_200ms_ease] motion-reduce:group-data-[status=done]:group-data-[strike]:opacity-100 motion-reduce:group-data-[status=done]:group-data-[strike]:[transition:opacity_200ms_ease]" aria-hidden="true" />
        </span>
      ) : null}
    </span>
  );
}

const tasks: { label: string; status: ProgressRingCheckStatus }[] = [
  { label: "Sync calendar events", status: "done" },
  { label: "Generate weekly report", status: "running" },
  { label: "Notify the team", status: "pending" },
];

const SPIN_MS = 1600;

const nextStatus: Record<Exclude<ProgressRingCheckStatus, "pending" | "running">, ProgressRingCheckStatus> = {
  done: "failed",
  failed: "cancelled",
  cancelled: "pending",
};

export function ProgressRingCheckList() {
  const [statuses, setStatuses] = useState(() => tasks.map((task) => task.status));
  const timers = useRef<number[]>([]);

  const update = (index: number, status: ProgressRingCheckStatus) =>
    setStatuses((current) => current.map((value, i) => (i === index ? status : value)));

  const finishLater = (index: number) => {
    timers.current.push(window.setTimeout(() => update(index, "done"), SPIN_MS));
  };

  useEffect(() => {
    const pending = timers.current;
    tasks.forEach((task, index) => {
      if (task.status !== "running") return;
      const finish = () => setStatuses((current) => current.map((value, i) => (i === index ? "done" : value)));
      pending.push(window.setTimeout(finish, SPIN_MS));
    });
    return () => pending.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const advance = (index: number) => {
    const status = statuses[index];
    if (status === "pending") {
      update(index, "running");
      finishLater(index);
    } else if (status !== "running") {
      update(index, nextStatus[status]);
    }
  };

  return (
    <div className="flex flex-col gap-[2px]">
      {tasks.map((task, index) => (
        <button key={task.label} type="button" className="flex min-h-[44px] cursor-pointer appearance-none items-center rounded-[12px] border-0 bg-transparent px-[14px] text-left [font-family:inherit] text-[light-dark(#14181e,#f2f4f6)] [transition:background-color_.2s_ease] hover:bg-[light-dark(#f0f2f5,#1b1e23)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f97316] motion-reduce:transition-none" onClick={() => advance(index)}>
          <ProgressRingCheck
            status={statuses[index]}
            label={task.label}
            size={22}
            fontSize={16}
          />
        </button>
      ))}
    </div>
  );
}`;
