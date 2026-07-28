"use client";

import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedIconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number;
}

interface HeartIconProps extends AnimatedIconProps {
  filled?: boolean;
}

export const HeartIcon = forwardRef<AnimatedIconHandle, HeartIconProps>(
  ({ className, filled = false, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => { void controls.start("animate"); },
        stopAnimation: () => { void controls.start("normal"); },
      };
    }, [controls]);

    const handleMouseEnter = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseEnter?.(event);
      else void controls.start("animate");
    }, [controls, onMouseEnter]);

    const handleMouseLeave = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseLeave?.(event);
      else void controls.start("normal");
    }, [controls, onMouseLeave]);

    return (
      <span className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <motion.svg
          animate={controls}
          fill={filled ? "currentColor" : "none"}
          height={size}
          initial="normal"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transition={{ duration: 0.45, repeat: 2 }}
          variants={{ normal: { scale: 1 }, animate: { scale: [1, 1.08, 1] } }}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </motion.svg>
      </span>
    );
  },
);
HeartIcon.displayName = "HeartIcon";

const LAYERS_TRANSITION: Transition = { type: "spring", stiffness: 100, damping: 14, mass: 1 };

export const LayersIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const start = useCallback(async () => {
      await controls.start("firstState");
      await controls.start("secondState");
    }, [controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation: () => { void start(); }, stopAnimation: () => { void controls.start("normal"); } };
    }, [controls, start]);

    const handleMouseEnter = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseEnter?.(event);
      else void start();
    }, [onMouseEnter, start]);
    const handleMouseLeave = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseLeave?.(event);
      else void controls.start("normal");
    }, [controls, onMouseLeave]);

    return <span className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <motion.path animate={controls} d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" transition={LAYERS_TRANSITION} variants={{ normal: { y: 0 }, firstState: { y: -9 }, secondState: { y: 0 } }} />
        <motion.path animate={controls} d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" transition={LAYERS_TRANSITION} variants={{ normal: { y: 0 }, firstState: { y: -5 }, secondState: { y: 0 } }} />
      </svg>
    </span>;
  },
);
LayersIcon.displayName = "LayersIcon";

const CLOCK_HAND_VARIANTS: Variants = { normal: { rotate: 0, originX: "0%", originY: "100%" }, animate: { rotate: 360, originX: "0%", originY: "100%" } };
const CLOCK_MINUTE_VARIANTS: Variants = { normal: { rotate: 0, originX: "0%", originY: "100%" }, animate: { rotate: 45, originX: "0%", originY: "100%" } };

export const ClockIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation: () => { void controls.start("animate"); }, stopAnimation: () => { void controls.start("normal"); } };
    }, [controls]);
    const handleMouseEnter = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseEnter?.(event);
      else void controls.start("animate");
    }, [controls, onMouseEnter]);
    const handleMouseLeave = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseLeave?.(event);
      else void controls.start("normal");
    }, [controls, onMouseLeave]);

    return <span className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        <motion.line animate={controls} initial="normal" transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }} variants={CLOCK_HAND_VARIANTS} x1="12" x2="12" y1="12" y2="6" />
        <motion.line animate={controls} initial="normal" transition={{ duration: 0.5, ease: "easeInOut" }} variants={CLOCK_MINUTE_VARIANTS} x1="12" x2="16" y1="12" y2="12" />
      </svg>
    </span>;
  },
);
ClockIcon.displayName = "ClockIcon";

const PANEL_TRANSITION: Transition = { times: [0, 0.4, 1], duration: 0.5 };

function createPanelIcon(name: "PanelLeftCloseIcon" | "PanelLeftOpenIcon", path: string, movement: number) {
  const Icon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(({ className, onMouseEnter, onMouseLeave, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return { startAnimation: () => { void controls.start("animate"); }, stopAnimation: () => { void controls.start("normal"); } };
    }, [controls]);
    const handleMouseEnter = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseEnter?.(event);
      else void controls.start("animate");
    }, [controls, onMouseEnter]);
    const handleMouseLeave = useCallback((event: MouseEvent<HTMLSpanElement>) => {
      if (isControlledRef.current) onMouseLeave?.(event);
      else void controls.start("normal");
    }, [controls, onMouseLeave]);
    return <span className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
      <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">
        <rect height="18" rx="2" width="18" x="3" y="3" />
        <path d="M9 3v18" />
        <motion.path animate={controls} d={path} transition={PANEL_TRANSITION} variants={{ normal: { x: 0 }, animate: { x: [0, movement, 0] } }} />
      </svg>
    </span>;
  });
  Icon.displayName = name;
  return Icon;
}

export const PanelLeftCloseIcon = createPanelIcon("PanelLeftCloseIcon", "m16 15-3-3 3-3", -1.5);
export const PanelLeftOpenIcon = createPanelIcon("PanelLeftOpenIcon", "m14 9 3 3-3 3", 1.5);
