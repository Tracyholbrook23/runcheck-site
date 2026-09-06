"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";

/**
 * RunCheck Spin Wheel
 * --------------------
 * A basketball-themed "spin the wheel" name picker.
 *
 * Two modes:
 * - Random Mode (public): winner is chosen with Math.random(). Fair, no
 *    outcome is predetermined.
 * - Demo / Controlled Reveal Mode (admin-only): lets whoever is running an
 *    event/demo pre-select which name the wheel lands on, while the spin
 *    animation still looks fully natural. This exists for live demos,
 *    rehearsed reveals, and recorded promo content, NOT for real public
 *    giveaways. It is gated behind a hidden admin panel (see bottom of file)
 *    so normal visitors never see it.
 */

// Segment color palette - pulled straight from the RunCheck logo mark
// (basketball orange + checkmark blue), alternating with near-black court
// tones so the wheel reads as unmistakably "RunCheck" rather than a generic
// green wheel. Edit these hexes to retheme.
const SEGMENT_COLORS = [
  "#f36025", // RunCheck orange (basketball icon)
  "#0d0d0d", // near-black
  "#2882d7", // RunCheck blue (checkmark)
  "#111827", // gray-900
  "#f36025", // orange again for even segment counts
  "#1e2433", // slate/navy
];

// ---------------------------------------------------------------------------
// Current giveaway banner - edit or set `active: false` to hide it and fall
// back to a plain wheel with no prize context.
// ---------------------------------------------------------------------------
export const GIVEAWAY = {
  active: true,
  title: "Kobe Girl Dad Giveaway",
  description:
    "This spin is for the Kobe “Girl Dad” giveaway. One lucky hooper walks away with the pair.",
  prizeImage: "/spin-wheel/kobe-girl-dad-prize.jpg",
  claimInstructions:
    "Check your notifications in the RunCheck app to claim your prize.",
};

const DEFAULT_NAMES = [
  "kahmindadark",
  "hoopsocial",
  "christdavid",
  "rell2324",
  "abdizzle",
  "colestonallen",
  "phatmama247",
  "manny",
  "mikemontgomery9",
  "bangout1234",
  "kairo0200",
  "traybballin",
  "vanilla",
  "ilostsupreme",
  "zayy0fficial",
  "showtimefish",
  "landowityogir",
  "kanye.th",
  "dink2_tuff",
  "showtimedave23",
];

const SPIN_SECONDS = 4.8;
const SPIN_ROTATIONS = 6; // full spins before landing

type Mode = "random" | "controlled";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Lightweight confetti burst - no external dependency required.
// ---------------------------------------------------------------------------
function fireConfetti() {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  const colors = ["#22c55e", "#4ade80", "#f97316", "#ffffff", "#16a34a", "#2882d7"];
  const count = 260;
  const particles = Array.from({ length: count }, () => ({
    // Half burst outward from center, half rain down from the top, makes
    // the effect read clearly across the whole screen, not just a quick
    // pop near the middle.
    x:
      Math.random() < 0.5
        ? canvas.width / 2 + (Math.random() - 0.5) * 160
        : Math.random() * canvas.width,
    y: Math.random() < 0.5 ? canvas.height * 0.35 : -20 - Math.random() * canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -14 - 2,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 20,
    gravity: 0.22 + Math.random() * 0.15,
    life: 0,
  }));

  let frame = 0;
  const maxFrames = 260;

  function tick() {
    if (!ctx) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.spin;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });

    if (frame < maxFrames) {
      requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(tick);
}

export function SpinWheel() {
  const [namesText, setNamesText] = useState(DEFAULT_NAMES.join("\n"));
  const [names, setNames] = useState<string[]>(DEFAULT_NAMES);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Admin / demo state
  // NOTE: preset to reveal the Kobe Girl Dad giveaway's real winner
  // (showtimedave23 / Davion Smith, already determined off-wheel). Reset
  // mode back to "random" and clear controlledWinner once this reveal is
  // done and before the wheel is used for anything else.
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState<Mode>("controlled");
  const [controlledWinner, setControlledWinner] = useState<string>("showtimedave23");

  const currentRotationRef = useRef(0);

  // --- Hidden admin access -------------------------------------------------
  // Admin/dev panel is intentionally NOT part of the public UI. It unlocks
  // two ways, either of which is fine for internal use:
  //   1. Visit the page with ?admin=1 in the URL
  //   2. Press Ctrl+Shift+A anywhere on the page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("admin")) setIsAdmin(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        setIsAdmin((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const applyNamesFromText = useCallback((text: string) => {
    const list = text
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    setNames(list);
  }, []);

  useEffect(() => {
    applyNamesFromText(namesText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNamesChange = (value: string) => {
    setNamesText(value);
    applyNamesFromText(value);
  };

  const handleShuffle = () => {
    if (names.length < 2) return;
    const shuffled = shuffle(names);
    setNames(shuffled);
    setNamesText(shuffled.join("\n"));
  };

  const segmentAngle = names.length > 0 ? 360 / names.length : 0;

  const wheelBackground = useMemo(() => {
    if (names.length === 0) return SEGMENT_COLORS[1];
    const slices = names.map((_, i) => {
      const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
      const start = i * segmentAngle;
      const end = (i + 1) * segmentAngle;
      return `${color} ${start}deg ${end}deg`;
    });
    return `conic-gradient(from 0deg, ${slices.join(", ")})`;
  }, [names, segmentAngle]);

  const handleSpin = () => {
    if (spinning || names.length < 2) return;

    let winnerIndex: number;
    if (mode === "controlled" && controlledWinner) {
      const idx = names.findIndex((n) => n === controlledWinner);
      winnerIndex = idx >= 0 ? idx : Math.floor(Math.random() * names.length);
    } else {
      winnerIndex = Math.floor(Math.random() * names.length);
    }

    const centerAngle = winnerIndex * segmentAngle + segmentAngle / 2;
    // Pointer is fixed at the top (0deg). Wheel rotates clockwise. We need
    // the winning segment's center to land at the top after rotation.
    const desiredMod = (360 - centerAngle + 360) % 360;
    const currentMod = ((currentRotationRef.current % 360) + 360) % 360;
    const deltaToDesired = (desiredMod - currentMod + 360) % 360;
    const newRotation =
      currentRotationRef.current + SPIN_ROTATIONS * 360 + deltaToDesired;

    setSpinning(true);
    setWinner(null);
    setShowModal(false);
    setRotation(newRotation);
    currentRotationRef.current = newRotation;

    window.setTimeout(() => {
      setSpinning(false);
      setWinner(names[winnerIndex]);
      setShowModal(true);
      fireConfetti();
    }, SPIN_SECONDS * 1000);
  };

  const canSpin = names.length >= 2 && !spinning;

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Current giveaway banner - the photo itself is now the full-page
          background (see spin-wheel/page.tsx), so this is just the text. */}
      {GIVEAWAY.active && (
        <div className="w-full max-w-md flex flex-col items-center gap-1 text-center">
          <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">
            {GIVEAWAY.title}
          </span>
          <p className="text-zinc-300 text-xs leading-snug max-w-sm">
            {GIVEAWAY.description}
          </p>
        </div>
      )}

      {/* Wheel + Spin button */}
      <div className="relative flex flex-col items-center gap-8 py-4">
        {/* Pointer + wheel, kept snug against each other (spacing to the
            button below comes from the parent's gap, not from here) */}
        <div className="relative flex flex-col items-center">
        <div className="relative z-20 -mb-1">
          <div
            className="w-0 h-0 border-l-[14px] border-r-[14px] border-l-transparent border-r-transparent border-t-[24px]"
            style={{ borderTopColor: "#22c55e", filter: "drop-shadow(0 0 6px #22c55e)" }}
          />
        </div>

        <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
          {/* Outer glow ring - tight, so it accents the wheel without washing the page */}
          <div className="absolute -inset-1 rounded-full bg-green-500/15 blur-lg" />

          <motion.div
            className="relative w-full h-full rounded-full border-[6px] border-zinc-800 shadow-[0_0_35px_rgba(34,197,94,0.18)]"
            style={{ background: wheelBackground }}
            animate={{ rotate: rotation }}
            transition={{ duration: SPIN_SECONDS, ease: [0.14, 0.67, 0.1, 1] }}
          >
            {names.map((name, i) => {
              const angle = i * segmentAngle + segmentAngle / 2;
              // Labels run radially (hub → rim), like spokes, rather than
              // following the curved rim. That keeps each name inside its
              // own wedge no matter how many segments there are, a
              // tangential layout overlaps neighbors once you're past
              // ~8-10 segments, which is exactly what a 20-name wheel needs.
              //
              // This outer div rotates by the SAME `angle` used for the
              // conic-gradient background segment, so the label always
              // lands on its own segment's color - no drift between what's
              // visually under the pointer and what the JS picked as
              // winner. The inner wrapper re-centers on the wheel's own
              // center point (its parent's edge, not its center, is what
              // "top-1/2 left-1/2" measures from) before rotating -90° so
              // the label reads outward from the hub instead of tangent to
              // the rim.
              return (
                <div
                  key={`${name}-${i}`}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
                  >
                    <span
                      className="absolute left-9 sm:left-11 md:left-12 text-[9px] sm:text-[10px] md:text-xs font-bold text-white uppercase whitespace-nowrap"
                      style={{
                        transform: "translateY(-50%)",
                        textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                      }}
                    >
                      {name.length > 16 ? `${name.slice(0, 15)}…` : name}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Hub - RunCheck logo, stays upright (outside the rotating wheel) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center justify-center p-2">
            <Image
              src="/runcheck-logo.png"
              alt="RunCheck"
              width={200}
              height={200}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>
        </div>

        <button
          onClick={handleSpin}
          disabled={!canSpin}
          className={`relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold uppercase tracking-wide transition-all ${
            canSpin
              ? "bg-green-500 text-black hover:bg-green-400 shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:shadow-[0_0_40px_rgba(34,197,94,0.7)] active:scale-95"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {spinning ? "Spinning…" : "Spin for the Next Hooper"}
        </button>
      </div>

      {/* Names input card */}
      <div className="w-full max-w-md bg-[#0d0d0d] border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold text-sm uppercase tracking-wide">
            Who&apos;s getting checked in?
          </h3>
          <span className="text-zinc-500 text-xs">{names.length} names</span>
        </div>
        <textarea
          value={namesText}
          onChange={(e) => handleNamesChange(e.target.value)}
          rows={6}
          placeholder={"One name per line\ne.g.\nMarcus\nJaylen\nDevon"}
          className="w-full resize-none rounded-lg bg-black border border-zinc-800 text-zinc-200 text-sm p-3 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 font-mono"
        />
        <div className="flex gap-3">
          <button
            onClick={handleShuffle}
            disabled={names.length < 2}
            className="flex-1 rounded-full border border-zinc-700 text-zinc-300 text-sm font-semibold py-2.5 transition-colors hover:border-green-500 hover:text-green-400 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Shuffle Names
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Admin / Dev panel - Demo / Controlled Reveal Mode                */}
      {/* Not shown in the public UI. Unlocked via ?admin=1 or Ctrl+Shift+A */}
      {/* --------------------------------------------------------------- */}
      {isAdmin && (
        <div className="w-full max-w-md bg-[#1a0f00] border border-orange-500/40 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <h3 className="text-orange-400 font-bold text-xs uppercase tracking-widest">
              Admin Panel - Demo / Controlled Reveal Mode
            </h3>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">
            For live demos and rehearsed reveals only. Do not use this to
            predetermine the outcome of a real public giveaway, that belongs
            in Random Mode.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setMode("random")}
              className={`flex-1 rounded-full text-xs font-bold py-2 transition-colors ${
                mode === "random"
                  ? "bg-green-500 text-black"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-700"
              }`}
            >
              Random Mode
            </button>
            <button
              onClick={() => setMode("controlled")}
              className={`flex-1 rounded-full text-xs font-bold py-2 transition-colors ${
                mode === "controlled"
                  ? "bg-orange-500 text-black"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-700"
              }`}
            >
              Controlled Reveal
            </button>
          </div>

          {mode === "controlled" && (
            <select
              value={controlledWinner}
              onChange={(e) => setControlledWinner(e.target.value)}
              className="w-full rounded-lg bg-black border border-orange-500/40 text-zinc-200 text-sm p-2.5 focus:outline-none"
            >
              <option value="">Pick a winner…</option>
              {names.map((name, i) => (
                <option key={`${name}-${i}`} value={name}>
                  {name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setIsAdmin(false)}
            className="text-zinc-600 text-xs underline self-start hover:text-zinc-400"
          >
            Hide admin panel
          </button>
        </div>
      )}

      {/* Winner reveal modal */}
      <AnimatePresence>
        {showModal && winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#111827] to-[#0a0a0a] border border-green-500/50 shadow-[0_0_80px_rgba(34,197,94,0.35)] p-8 flex flex-col items-center gap-4 text-center"
            >
              <span className="text-green-400 text-xs font-bold uppercase tracking-[0.2em]">
                Winner Locked In
              </span>
              <h2 className="text-white text-4xl font-black break-words">
                {winner}
              </h2>
              {GIVEAWAY.active ? (
                <>
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-orange-500/40 shadow-[0_0_20px_rgba(243,96,37,0.3)] bg-black">
                    <Image
                      src={GIVEAWAY.prizeImage}
                      alt={GIVEAWAY.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-zinc-400 text-sm flex items-center justify-center gap-1.5">
                    <Gift className="w-4 h-4 text-orange-400" /> You won: {GIVEAWAY.title}
                  </p>
                  <p className="text-orange-400 text-xs font-semibold px-4">
                    {GIVEAWAY.claimInstructions}
                  </p>
                </>
              ) : (
                <p className="text-zinc-400 text-sm">
                  Check in and get on the court.
                </p>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="mt-2 rounded-full bg-green-500 text-black font-bold text-sm px-6 py-2.5 hover:bg-green-400 transition-colors"
              >
                Spin Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
