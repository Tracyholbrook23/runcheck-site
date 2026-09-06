"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface IridescentPhoneProps {
  src: string;
  alt: string;
  /** Tailwind / CSS classes applied to the <img> for sizing etc. */
  className?: string;
}

// Combined state shape - one setState call per event instead of four
interface PhoneState {
  tilt: { x: number; y: number };
  glow: { x: number; y: number };
  norm: { x: number; y: number };
  hovered: boolean;
}

const IDLE_STATE: PhoneState = {
  tilt: { x: 0, y: 0 },
  glow: { x: 50, y: 50 },
  norm: { x: 0, y: 0 },
  hovered: false,
};

/**
 * Wraps a phone-mockup image with:
 * - Mouse-tracked 3-D perspective tilt (spring-animated)
 * - Iridescent gradient overlay that shifts hue as the cursor moves
 * - Specular highlight dot that follows the cursor
 * - Dynamic drop-shadow that deepens on hover
 */
export function IridescentPhone({ src, alt, className = "" }: IridescentPhoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Single state object - one re-render per mousemove instead of four
  const [ps, setPs] = useState<PhoneState>(IDLE_STATE);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0–1
    const py = (e.clientY - rect.top)  / rect.height;  // 0–1
    const nx = (px - 0.5) * 2;  // -1 to 1
    const ny = (py - 0.5) * 2;  // -1 to 1

    setPs({ tilt: { x: -ny * 15, y: nx * 15 }, glow: { x: px * 100, y: py * 100 }, norm: { x: nx, y: ny }, hovered: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPs(IDLE_STATE);
  }, []);

  const { tilt, glow, norm, hovered } = ps;

  // Orange-chrome gradient - stays in warm orange / amber / gold range
  const angle = 135 + norm.x * 35 + norm.y * 20;
  const h1    = 22  + norm.x * 12;   // deep orange
  const h2    = 38  + norm.y * 14;   // amber / gold
  const h3    = 30  + norm.x * 10;   // warm orange-gold

  // Shadow deepens and shifts slightly with tilt
  const shadowY  = 40 + norm.y * 18;
  const shadowSz = 120 + Math.abs(norm.y) * 40;
  const glowSz   = hovered ? "80px" : "60px";
  const glowAlpha = hovered ? "0.42" : "0";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "900px", display: "inline-block" }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.7 }}
        style={{ transformStyle: "preserve-3d", position: "relative", display: "inline-block" }}
      >
        {/* ── Phone image ───────────────────────────────────── */}
        <Image
          src={src}
          alt={alt}
          width={1170}
          height={2532}
          className={className}
          style={{
            filter: `drop-shadow(0 0 ${glowSz} rgba(249,115,22,${hovered ? glowAlpha : "0"})) drop-shadow(0 ${shadowY}px ${shadowSz}px rgba(0,0,0,0.92))`,
            transition: hovered ? "none" : "filter 0.45s ease",
            display: "block",
          }}
        />

        {/* ── Iridescent gradient overlay ───────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            mixBlendMode: "overlay",
            opacity: hovered ? 0.9 : 0,
            transition: "opacity 0.35s ease",
            background: `
              radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,200,120,0.28) 0%, transparent 52%),
              linear-gradient(${angle}deg,
                hsla(${h1}, 100%, 60%, 0.50) 0%,
                hsla(${h2}, 90%, 68%, 0.38) 30%,
                hsla(${h3 + 10}, 85%, 75%, 0.32) 55%,
                hsla(${h1 - 5}, 100%, 58%, 0.48) 100%
              )
            `,
          }}
        />

        {/* ── Specular highlight (screen blend) ────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            mixBlendMode: "screen",
            opacity: hovered ? 0.85 : 0,
            transition: "opacity 0.25s ease",
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,180,80,0.30) 0%, rgba(255,140,40,0.12) 40%, transparent 65%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
