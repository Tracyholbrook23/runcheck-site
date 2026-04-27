"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface IridescentPhoneProps {
  src: string;
  alt: string;
  /** Tailwind / CSS classes applied to the <img> for sizing etc. */
  className?: string;
}

/**
 * Wraps a phone-mockup image with:
 *  - Mouse-tracked 3-D perspective tilt (spring-animated)
 *  - Iridescent gradient overlay that shifts hue as the cursor moves
 *  - Specular highlight dot that follows the cursor
 *  - Dynamic drop-shadow that deepens on hover
 */
export function IridescentPhone({ src, alt, className = "" }: IridescentPhoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tilt angles (degrees)
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  // Glow position in % (for gradient + specular)
  const [glow, setGlow]       = useState({ x: 50, y: 50 });
  // Raw normalised mouse position (-1 → 1) used for hue shift
  const [norm, setNorm]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0–1
    const py = (e.clientY - rect.top)  / rect.height;  // 0–1
    const nx = (px - 0.5) * 2;  // -1 to 1
    const ny = (py - 0.5) * 2;  // -1 to 1

    setTilt({ x: -ny * 15, y: nx * 15 });
    setGlow({ x: px * 100, y: py * 100 });
    setNorm({ x: nx, y: ny });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
    setNorm({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  // Iridescent gradient parameters — shift with cursor
  const angle = 135 + norm.x * 35 + norm.y * 20;
  const h1    = 25  + norm.x * 30;   // orange / gold
  const h2    = 200 + norm.y * 50;   // blue / cyan
  const h3    = 270 + norm.x * 25;   // violet / purple

  // Shadow deepens and shifts slightly with tilt
  const shadowY  = 40 + norm.y * 18;
  const shadowSz = 120 + Math.abs(norm.y) * 40;
  const glowSz   = hovered ? "80px" : "60px";
  const glowAlpha = hovered ? "0.42" : "0.20";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "900px", display: "inline-block" }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.7 }}
        style={{ transformStyle: "preserve-3d", position: "relative", display: "inline-block" }}
      >
        {/* ── Phone image ───────────────────────────────────── */}
        <img
          src={src}
          alt={alt}
          className={className}
          style={{
            filter: `drop-shadow(0 0 ${glowSz} rgba(249,115,22,${glowAlpha})) drop-shadow(0 ${shadowY}px ${shadowSz}px rgba(0,0,0,0.92))`,
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
            opacity: hovered ? 0.9 : 0.14,
            transition: "opacity 0.35s ease",
            background: `
              radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.22) 0%, transparent 52%),
              linear-gradient(${angle}deg,
                hsla(${h1}, 95%, 65%, 0.36) 0%,
                hsla(${h2}, 85%, 68%, 0.30) 33%,
                hsla(${h3}, 80%, 65%, 0.36) 66%,
                hsla(${h1 + 55}, 90%, 62%, 0.28) 100%
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
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.20) 0%, transparent 36%)`,
          }}
        />
      </motion.div>
    </div>
  );
}
