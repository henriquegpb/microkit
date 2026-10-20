"use client";

import "./styles.css";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";

export type StrikeSide = "left" | "center" | "right" | "none";

export type BounceCheckboxProps = {
  label?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  color?: string;
  fillColor?: string;
  checkColor?: string;
  boxSize?: number;
  boxRadius?: number;
  fontSize?: number;
  bounce?: number;
  strikeLag?: number;
  doneOpacity?: number;
  strike?: StrikeSide;
  ariaLabel?: string;
  className?: string;
};

const VISUAL_DURATION = 0.2;
const RULE_END = 0.84;
const SWELL = 0.35;
const TICK_PATH = "M5 14L8.5 17.5L19 6.5";
const ORIGIN: Record<StrikeSide, string> = {
  left: "left center",
  center: "center",
  right: "right center",
  none: "left center",
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const zetaOf = (bounce: number) =>
  bounce <= 0 ? 1 : -Math.log(bounce) / Math.sqrt(Math.PI ** 2 + Math.log(bounce) ** 2);

const readings = (t: number, doneOpacity: number, strikeLag: number) => {
  const held = clamp01(t);
  return {
    fill: `scale(${Math.max(t, 0)})`,
    box: `scale(${1 + SWELL * Math.max(0, t - 1)})`,
    tick: 1 - held,
    word: 1 - (1 - doneOpacity) * held,
    rule: `scaleX(${clamp01((held - strikeLag) / (RULE_END - strikeLag))})`,
  };
};

export function BounceCheckbox({
  label = "Write the changelog",
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  color = "light-dark(#14181e, #f2f4f6)",
  fillColor = "light-dark(#14181e, #f2f4f6)",
  checkColor = "light-dark(#ffffff, #0b0b0f)",
  boxSize = 28,
  boxRadius = 9,
  fontSize = 18,
  bounce = 0.2,
  strikeLag = 0.12,
  doneOpacity = 0.42,
  strike = "left",
  ariaLabel,
  className = "",
}: BounceCheckboxProps) {
  const controlled = checked !== undefined;
  const [inner, setInner] = useState(defaultChecked);
  const on = controlled ? checked : inner;
  const reduce = useReducedMotion();

  const t = useMotionValue(on ? 1 : 0);
  const viaPointer = useRef(false);
  const instant = useRef(false);
  const rowRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tickRef = useRef<SVGPathElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const cfg = useRef({ doneOpacity, strikeLag });

  useLayoutEffect(() => {
    cfg.current = { doneOpacity, strikeLag };
  });

  const write = (value: number) => {
    const r = readings(value, cfg.current.doneOpacity, cfg.current.strikeLag);
    if (fillRef.current) fillRef.current.style.transform = r.fill;
    if (boxRef.current) boxRef.current.style.transform = r.box;
    if (tickRef.current) tickRef.current.style.strokeDashoffset = String(r.tick);
    if (wordRef.current) wordRef.current.style.opacity = String(r.word);
    if (ruleRef.current) ruleRef.current.style.transform = r.rule;
  };
  useMotionValueEvent(t, "change", write);
  useLayoutEffect(() => {
    write(t.get());
  });

  useEffect(() => {
    const target = on ? 1 : 0;
    if (reduce || instant.current) {
      instant.current = false;
      t.jump(target);
      return undefined;
    }
    if (t.get() === target && t.getVelocity() === 0) return undefined;
    const controls = animate(t, target, {
      type: "spring",
      visualDuration: VISUAL_DURATION,
      bounce: 1 - zetaOf(bounce),
    });
    return () => controls.stop();
  }, [on, reduce, bounce, t]);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || disabled) return;
    viaPointer.current = true;
    if (!reduce && rowRef.current) rowRef.current.dataset.pressed = "";
  };
  const handlePointerUp = () => {
    if (rowRef.current) delete rowRef.current.dataset.pressed;
  };
  const handlePointerCancel = () => {
    viaPointer.current = false;
    handlePointerUp();
  };
  const toggle = () => {
    if (disabled) return;
    instant.current = !viaPointer.current;
    viaPointer.current = false;
    const next = !on;
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  const initial = readings(on ? 1 : 0, doneOpacity, strikeLag);
  const ring = boxSize >= 24 ? 2 : 1.5;
  const gap = Math.min(16, Math.max(8, Math.round(boxSize * 0.43)));
  const ruleHeight = Math.max(1.5, Math.round(fontSize / 6) / 2);

  const cssVars = {
    "--bc-ink": color,
    "--bc-fill": fillColor,
    "--bc-check": checkColor,
    "--bc-box": `${boxSize}px`,
    "--bc-radius": `${boxRadius}px`,
    "--bc-font": `${fontSize}px`,
    "--bc-ring": `${ring}px`,
    "--bc-gap": `${gap}px`,
    "--bc-row": `${Math.max(44, boxSize + 16)}px`,
    "--bc-rule": `${ruleHeight}px`,
    "--bc-origin": ORIGIN[strike] || ORIGIN.left,
  } as CSSProperties;

  return (
    <button
      ref={rowRef}
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`bounce-checkbox${className ? ` ${className}` : ""}`}
      style={cssVars}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerCancel}
      onClick={toggle}
    >
      <span className="bounce-checkbox__box">
        <span ref={boxRef} className="bounce-checkbox__surface" style={{ transform: initial.box }}>
          <span className="bounce-checkbox__ring" aria-hidden="true" />
          <span ref={fillRef} className="bounce-checkbox__fill" style={{ transform: initial.fill }} />
          <svg className="bounce-checkbox__tick" viewBox="0 0 24 24" aria-hidden="true">
            <path ref={tickRef} d={TICK_PATH} pathLength={1} strokeDasharray={1} style={{ strokeDashoffset: initial.tick }} />
          </svg>
        </span>
      </span>
      <span className="bounce-checkbox__label">
        <span ref={wordRef} className="bounce-checkbox__word" style={{ opacity: initial.word }}>
          {label}
        </span>
        {strike !== "none" ? (
          <span ref={ruleRef} className="bounce-checkbox__rule" aria-hidden="true" style={{ transform: initial.rule }} />
        ) : null}
      </span>
    </button>
  );
}

export function BounceCheckboxList() {
  return (
    <div className="bounce-checkbox-list">
      <BounceCheckbox label="Write the changelog" />
      <BounceCheckbox label="Publish the release" />
    </div>
  );
}
