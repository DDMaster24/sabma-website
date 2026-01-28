"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";

type AnimationType =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-down"
  | "slide-in-right"
  | "slide-in-left"
  | "scale-in"
  | "reveal-up"
  | "blur-in"
  | "blur-in-up"
  | "spring-up"
  | "spring-scale"
  | "stagger-children";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in milliseconds before animation starts */
  delay?: number;
  /** Threshold for triggering animation (0-1) */
  threshold?: number;
  /** Animation type to use */
  animation?: AnimationType;
  /** Duration in seconds */
  duration?: number;
  /** Whether to animate only once or every time element enters view */
  once?: boolean;
  /** Custom margin for triggering animation */
  margin?: string;
  /** For stagger-children: delay between each child */
  staggerDelay?: number;
}

// Animation variants for different animation types
const variants: Record<AnimationType, Variants> = {
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-in-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-in-right": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-in-left": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  "reveal-up": {
    hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "blur-in-up": {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "spring-up": {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  "spring-scale": {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  "stagger-children": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

// Transition configurations for different animation types
const getTransition = (
  animation: AnimationType,
  duration: number,
  delay: number
) => {
  const baseTransition = {
    duration,
    delay: delay / 1000, // Convert ms to seconds
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom easing (ease-out-expo)
  };

  switch (animation) {
    case "spring-up":
    case "spring-scale":
      return {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: delay / 1000,
      };
    case "reveal-up":
    case "blur-in":
    case "blur-in-up":
      return {
        ...baseTransition,
        duration: duration * 1.2,
      };
    default:
      return baseTransition;
  }
};

/**
 * Reveal - A scroll-triggered reveal animation component powered by Framer Motion
 *
 * Wraps content and animates it into view when scrolled into the viewport.
 * Supports multiple animation types, customizable timing, and respects
 * user motion preferences.
 *
 * @example
 * // Basic usage
 * <Reveal>
 *   <h1>Hello World</h1>
 * </Reveal>
 *
 * @example
 * // With options
 * <Reveal animation="blur-in-up" delay={200} duration={0.8}>
 *   <Card />
 * </Reveal>
 *
 * @example
 * // Stagger children
 * <Reveal animation="stagger-children" staggerDelay={0.1}>
 *   {items.map(item => <RevealItem key={item.id}>{item.content}</RevealItem>)}
 * </Reveal>
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  animation = "fade-in-up",
  duration = 0.8,
  once = true,
  margin = "-80px",
  staggerDelay = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as `${number}px ${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px` | `${number}px`,
  });

  // Respect reduced motion preference
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // For stagger-children, wrap children in a container with staggered animation
  if (animation === "stagger-children") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay / 1000,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[animation]}
      transition={getTransition(animation, duration, delay)}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealItem - Child component for use with stagger-children animation
 *
 * Use inside a Reveal component with animation="stagger-children"
 */
export function RevealItem({
  children,
  className = "",
  animation = "fade-in-up",
}: {
  children: React.ReactNode;
  className?: string;
  animation?: Exclude<AnimationType, "stagger-children">;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants[animation]}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * RevealText - Character-by-character text reveal animation
 *
 * Animates text one character at a time for a typewriter-like effect.
 */
export function RevealText({
  text,
  className = "",
  delay = 0,
  charDelay = 0.03,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (prefersReducedMotion) {
    const Element = as;
    return <Element className={className}>{text}</Element>;
  }

  const MotionComponent = motion[as] as typeof motion.span;

  return (
    <MotionComponent ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.3,
            delay: delay / 1000 + index * charDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

/**
 * RevealLines - Line-by-line text reveal animation
 *
 * Animates multi-line text one line at a time.
 */
export function RevealLines({
  children,
  className = "",
  delay = 0,
  lineDelay = 0.15,
}: {
  children: string;
  className?: string;
  delay?: number;
  lineDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const lines = children.split("\n");

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div key={index} style={{ overflow: "hidden" }}>
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay / 1000 + index * lineDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/**
 * useReveal - Hook version for custom reveal implementations
 *
 * Returns ref and animation state for use with custom motion components.
 */
export function useReveal({
  threshold = 0.1,
  once = true,
  margin = "-80px",
}: {
  threshold?: number;
  once?: boolean;
  margin?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as `${number}px ${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px` | `${number}px`,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isVisible: prefersReducedMotion || isInView,
    hasAnimated: prefersReducedMotion || hasAnimated,
    prefersReducedMotion,
  };
}
