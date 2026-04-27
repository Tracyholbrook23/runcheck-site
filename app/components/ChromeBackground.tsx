"use client";

import { useEffect, useRef } from "react";

interface Blob {
  x: number; y: number;
  vx: number; vy: number;
  baseR: number;
  phase: number; phaseV: number;
  bri: number;
}

interface Ripple {
  x: number; y: number;
  r: number;
  life: number;
}

export function ChromeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const S = {
      mouse: { x: -9999, y: -9999 },
      blobs: [] as Blob[],
      ripples: [] as Ripple[],
      t: 0,
      W: 0, H: 0,
    };
    let raf = 0;

    const resize = () => {
      S.W = canvas.offsetWidth;
      S.H = canvas.offsetHeight;
      canvas.width  = S.W;
      canvas.height = S.H;
      initBlobs();
    };

    const initBlobs = () => {
      const { W, H } = S;
      const dim = Math.min(W, H);
      S.blobs = Array.from({ length: 14 }, (_, i) => ({
        x:  W  * (0.05 + Math.random() * 0.90),
        y:  H  * (0.05 + Math.random() * 0.90),
        vx: (Math.random() - 0.5) * 2.2,       // start with real velocity
        vy: (Math.random() - 0.5) * 2.2,
        baseR: dim * (0.14 + Math.random() * 0.26),
        phase:  Math.random() * Math.PI * 2,
        phaseV: 0.006 + Math.random() * 0.009,  // faster oscillation
        bri: 0.28 + Math.random() * 0.58,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      S.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx < 0 || cy < 0 || cx > S.W || cy > S.H) return;

      // shockwave: blast all blobs away from click point
      S.blobs.forEach(b => {
        const dx = b.x - cx;
        const dy = b.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const shockR = 520;
        if (dist < shockR) {
          const force = ((shockR - dist) / shockR) * 14;
          b.vx += (dx / dist) * force;
          b.vy += (dy / dist) * force;
        }
      });

      // ripple burst
      [0, 60, 140, 250].forEach((delay, i) => {
        setTimeout(() => {
          S.ripples.push({ x: cx, y: cy, r: i * 22, life: 1 - i * 0.18 });
        }, delay);
      });
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const draw = () => {
      const { W, H, blobs, ripples, mouse } = S;
      S.t += 0.007;
      const t = S.t;

      // ── trail clear — semi-transparent so fast blobs leave a mercury smear ──
      ctx.fillStyle = "rgba(5, 5, 10, 0.78)";
      ctx.fillRect(0, 0, W, H);

      // ── blobs ──────────────────────────────────────────────────────────────
      blobs.forEach((b, i) => {
        const dx   = mouse.x - b.x;
        const dy   = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // dual-mode mouse: repel < 160px, attract 160–480px
        const REPEL_R  = 160;
        const ATTRACT_R = 480;
        if (dist < REPEL_R) {
          const f = ((REPEL_R - dist) / REPEL_R) * 0.55;
          b.vx -= (dx / dist) * f;
          b.vy -= (dy / dist) * f;
        } else if (dist < ATTRACT_R) {
          const f = ((dist - REPEL_R) / (ATTRACT_R - REPEL_R)) * 0.18;
          b.vx += (dx / dist) * f;
          b.vy += (dy / dist) * f;
        }

        // turbulent organic drift — larger amplitude than before
        b.phase += b.phaseV;
        b.vx += Math.sin(b.phase * 1.37 + i * 0.9) * 0.055;
        b.vy += Math.cos(b.phase * 1.09 + i * 0.6) * 0.055;

        // less damping = more energy / movement
        b.vx *= 0.978;
        b.vy *= 0.978;

        // cap speed so it doesn't go insane after a shockwave
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed > 18) { b.vx = (b.vx / speed) * 18; b.vy = (b.vy / speed) * 18; }

        b.x += b.vx;
        b.y += b.vy;

        // boundary bounce (harder push)
        const m = b.baseR * 0.35;
        if (b.x < m)      { b.vx += 0.6; }
        if (b.x > W - m)  { b.vx -= 0.6; }
        if (b.y < m)      { b.vy += 0.6; }
        if (b.y > H - m)  { b.vy -= 0.6; }

        // pulsing + velocity-stretch so fast blobs look like they're stretching
        const pulse   = 1 + Math.sin(t * 2.1 + b.phase) * 0.09;
        const stretch = Math.min(speed * 0.06, 0.35);
        const angle   = Math.atan2(b.vy, b.vx);
        const rx = b.baseR * pulse * (1 + stretch);
        const ry = b.baseR * pulse * Math.max(0.65, 1 - stretch * 0.8);

        // chrome radial gradient (highlight offset in velocity direction)
        const hx = b.x + Math.cos(angle) * rx * 0.32 - Math.cos(angle) * rx * 0.64;
        const hy = b.y + Math.sin(angle) * ry * 0.32 - Math.sin(angle) * ry * 0.64;
        const g  = ctx.createRadialGradient(hx, hy, 0, b.x, b.y, rx);
        const v  = b.bri;

        g.addColorStop(0,    `rgba(${~~(228*v)},${~~(230*v)},${~~(240*v)}, 0.95)`);
        g.addColorStop(0.13, `rgba(${~~(172*v)},${~~(175*v)},${~~(188*v)}, 0.80)`);
        g.addColorStop(0.38, `rgba(${~~(88*v)}, ${~~(90*v)}, ${~~(100*v)}, 0.58)`);
        g.addColorStop(0.68, `rgba(${~~(26*v)}, ${~~(27*v)}, ${~~(32*v)},  0.28)`);
        g.addColorStop(1,    `rgba(3, 3, 7, 0)`);

        ctx.globalCompositeOperation = i === 0 ? "source-over" : "screen";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(b.x, b.y, rx, ry, angle, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── ripples ──────────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "screen";
      S.ripples = ripples.filter(r => r.life > 0.012);
      ripples.forEach(rp => {
        rp.r   += 5.5 + rp.r * 0.016;
        rp.life *= 0.958;

        const a = rp.life;

        // outer ring
        ctx.globalAlpha = a * 0.65;
        ctx.strokeStyle = "rgb(190,198,218)";
        ctx.lineWidth   = 1.6;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();

        // mid ring
        if (rp.r > 30) {
          ctx.globalAlpha = a * 0.38;
          ctx.lineWidth   = 1.0;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 0.60, 0, Math.PI * 2);
          ctx.stroke();
        }

        // inner fill glow while small
        if (rp.r < 80) {
          const gf = ctx.createRadialGradient(rp.x, rp.y, 0, rp.x, rp.y, rp.r * 0.55);
          gf.addColorStop(0, `rgba(205,215,235,${a * 0.28})`);
          gf.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalAlpha = 1;
          ctx.fillStyle   = gf;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, rp.r * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // ── cursor specular ──────────────────────────────────────────────────
      ctx.globalCompositeOperation = "screen";
      if (mouse.x > 0 && mouse.x < W && mouse.y > 0 && mouse.y < H) {
        const sp = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 130);
        sp.addColorStop(0,   "rgba(225,232,250, 0.11)");
        sp.addColorStop(0.5, "rgba(180,192,220, 0.05)");
        sp.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = sp;
        ctx.fillRect(0, 0, W, H);
      }

      // ── vignette ─────────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "multiply";
      const vig = ctx.createRadialGradient(W/2, H/2, H * 0.10, W/2, H/2, H * 0.90);
      vig.addColorStop(0, "rgba(255,255,255, 1)");
      vig.addColorStop(1, "rgba(0,0,0, 0.80)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
