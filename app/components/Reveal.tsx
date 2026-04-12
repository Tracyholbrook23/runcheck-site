"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

export type RevealVariant = "up" | "fade" | "scale" | "left";

/**
 * Scroll-triggered reveal wrapper.
 *
 * variant="up"    — fade + translate-up (default, most text/headers)
 * variant="fade"  — opacity only (subtle, for decorative elements)
 * variant="scale" — scale 0.94→1 + fade (large visual assets / CTAs)
 * variant="left"  — slide from left + fade (lists, tab rows)
 *
 * Respects `prefers-reduced-motion` — collapses all transforms to zero
 * and sets duration to 0 so the element appears instantly.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: RevealVariant;
}) {
  const reduced = useReducedMotion() ?? false;
  const ease = [0.16, 1, 0.3, 1] as const;
  const dur = reduced ? 0 : 0.65;
  const d = delay / 1000;

  const variants: Variants = (() => {
    switch (variant) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: reduced ? 0 : 0.7, ease: "easeOut", delay: d } },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: reduced ? 1 : 0.94, y: reduced ? 0 : 14 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: dur, ease, delay: d } },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: reduced ? 0 : -16 },
          visible: { opacity: 1, x: 0, transition: { duration: dur, ease, delay: d } },
        };
      default: // "up"
        return {
          hidden: { opacity: 0, y: reduced ? 0 : 22 },
          visible: { opacity: 1, y: 0, transition: { duration: dur, ease, delay: d } },
        };
    }
  })();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.01 }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
