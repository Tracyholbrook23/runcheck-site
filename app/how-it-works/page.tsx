"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const steps = [
  {
    step: "01", label: "Browse",
    title: "Open the app and browse nearby courts",
    mockup: "/mockups/nearby-courts-map.png",
    alt: "RunCheck — Nearby courts map screen",
    detail: {
      headline: "Every court near you, live.",
      body: "RunCheck shows every tracked basketball court near you on a map. Orange pins mean there’s an active run happening right now. Green pins mean the court is available but quiet. See at a glance where the action is — without calling anyone or driving over to check.",
      note: "Filter by court type (indoor/outdoor), access (free or membership), city, and run level.",
    },
  },
  {
    step: "02", label: "See what’s happening",
    title: "See who’s playing and what’s going on",
    mockup: "/mockups/find-a-run.png",
    alt: "RunCheck — Find a Run screen",
    detail: {
      headline: "Real info, before you leave.",
      body: "Tap any court to see the run details: how many players have checked in, what level the run is, and when the first player arrived. No more showing up to an empty gym or a run way above your level.",
      note: "You can also follow courts you play at regularly to stay notified when a run starts.",
    },
  },
  {
    step: "03", label: "Check in",
    title: "Check in when you arrive",
    mockup: "/mockups/court-detail.png",
    alt: "RunCheck — Court detail screen",
    detail: {
      headline: "Let the court know you’re there.",
      body: "When you get to the gym, tap Check In Here. RunCheck uses GPS to confirm you’re actually at the court — no ghosts, no fake check-ins. Your check-in shows up live for everyone browsing that court.",
      note: "Your check-in shows up live for everyone browsing that court.",
    },
  },
  {
    step: "04", label: "Run or plan",
    title: "Start a run or join one",
    mockup: "/mockups/plan-a-visit.png",
    alt: "RunCheck — Plan a Run screen",
    detail: {
      headline: "Your crew, coordinated.",
      body: "Post an Open Run so other nearby players can find you and join. Set the level and let other players come to you. Or use Plan a Run to schedule a future game, invite specific players, and see who’s confirmed before tip-off.",
      note: "Planned runs send reminders to confirmed players so no one flakes.",
    },
  },
  {
    step: "05", label: "Know your players",
    title: "See who you’re running with",
    mockup: "/mockups/activity-feed.png",
    alt: "RunCheck — Activity feed screen",
    detail: {
      headline: "No more mystery players.",
      body: "Before you step on the court, see who else is checked in. Browse player profiles, positions, and activity history. RunCheck’s reliability system shows you who actually shows up vs. who ghosts. Run with people you can trust.",
      note: "Players earn reputation badges based on their real show-up rate.",
    },
  },
];

// ── Modal: side-by-side, height-anchored phone, zero distortion ───────────────
function DetailModal({
  step,
  onClose,
}: {
  step: (typeof steps)[number];
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.93, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 28 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors text-sm font-bold"
          >
            ✕
          </button>
          <div className="flex flex-col sm:flex-row items-stretch">
            {/* Left: text */}
            <div className="sm:w-[44%] flex-shrink-0 flex flex-col justify-center gap-4 px-7 pt-10 pb-7 sm:py-10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                Step {step.step} · {step.label}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {step.detail.headline}
              </h2>
              <p className="text-sm leading-6 text-zinc-400">{step.detail.body}</p>
              <p className="text-xs text-zinc-600 italic">{step.detail.note}</p>
            </div>
            {/* Right: phone — height-only sizing, w-auto preserves ratio */}
            <div className="flex-1 bg-zinc-950/60 flex items-end justify-center pt-6 px-4 overflow-hidden">
              <img
                src={step.mockup}
                alt={step.alt}
                className="h-[400px] sm:h-[520px] w-auto object-contain max-w-none
                           [filter:drop-shadow(0_0_50px_rgba(249,115,22,0.28))_drop-shadow(0_-10px_40px_rgba(0,0,0,0.7))]"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <div className="bg-black text-white flex flex-col min-h-screen">
        <Nav activePath="/how-it-works" />

        {/* Headline */}
        <section className="flex flex-col items-center text-center px-6 pt-32 pb-8 gap-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
            How it works
          </p>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight">
            From couch to court in under a minute.
          </h1>
          <p className="text-zinc-600 text-sm">Scroll to see each step →</p>
        </section>

        {/* Horizontal showcase card row */}
        <section className="w-full pb-24">
          {/* Hint text */}
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-zinc-700 mb-8">
            Tap any card to learn more
          </p>

          {/* Scroll track */}
          <div className="w-full overflow-x-auto pl-6 sm:pl-10 lg:pl-16 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-4 [scroll-snap-type:x_mandatory]">
              {steps.map((step, i) => (
                <motion.button
                  key={step.step}
                  onClick={() => setActiveStep(i)}
                  className="
                    group flex-shrink-0 w-[300px] sm:w-[348px]
                    flex flex-col
                    bg-zinc-900 border border-zinc-800
                    rounded-3xl overflow-hidden
                    cursor-pointer text-left
                    [scroll-snap-align:start]
                    hover:border-zinc-700
                    transition-colors duration-300
                  "
                  initial={{ opacity: 0, y: 24 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                >
                  {/* Card header — text sits at top */}
                  <div className="px-6 pt-6 pb-4 flex flex-col gap-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-orange-500">
                      {step.step} &mdash; {step.label}
                    </p>
                    <p className="text-[15px] font-extrabold text-white leading-snug">
                      {step.detail.headline}
                    </p>
                    <p className="text-[12px] text-zinc-400 leading-relaxed">
                      {step.title}
                    </p>
                  </div>

                  {/* Phone — small top padding lifts it slightly from the gap */}
                  <div className="flex-1 flex items-end justify-center px-6 pt-2 overflow-hidden">
                    <img
                      src={step.mockup}
                      alt={step.alt}
                      className="
                        h-[440px] sm:h-[500px] w-auto object-contain max-w-none
                        [filter:drop-shadow(0_-6px_28px_rgba(249,115,22,0.14))_drop-shadow(0_16px_40px_rgba(0,0,0,0.9))]
                        group-hover:[filter:drop-shadow(0_-6px_48px_rgba(249,115,22,0.32))_drop-shadow(0_20px_50px_rgba(0,0,0,0.95))]
                        transition-all duration-500
                      "
                    />
                  </div>
                </motion.button>
              ))}

              {/* Trailing spacer */}
              <div className="w-6 sm:w-10 lg:w-16 flex-shrink-0" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── More Ways — secondary feature cards ───────────────────── */}
        <section className="w-full pb-24">

          {/* Sub-header — smaller than main headline, same visual language */}
          <div className="flex flex-col items-center text-center px-6 pb-10 gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
              Built for the full experience
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              More ways to stay in the game
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mt-1">
              RunCheck isn&apos;t just about finding runs — it&apos;s built for the full experience.
            </p>
          </div>

          {/* Scroll track — identical structure to the step cards above */}
          <div className="w-full overflow-x-auto pl-6 sm:pl-10 lg:pl-16 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex gap-4 [scroll-snap-type:x_mandatory]">

              {[
                {
                  label: "01 — Connect",
                  headline: "Stay connected with your runs",
                  desc: "Chat with players before you arrive or coordinate in real time with run chats.",
                  mockup: "/mockups/messaging.png",
                  alt: "RunCheck — Messaging screen",
                },
                {
                  label: "02 — Compete",
                  headline: "Earn your reputation",
                  desc: "Climb the leaderboard, build your rank, and show the court you're consistent.",
                  mockup: "/mockups/leaderboard.png",
                  alt: "RunCheck — Leaderboard screen",
                },
                {
                  label: "03 — Find Your Game",
                  headline: "Filter your perfect run",
                  desc: "Search by skill level, court type, location, and more to find games that match your vibe.",
                  mockup: "/mockups/filters.png",
                  alt: "RunCheck — Filters screen",
                },
                {
                  label: "04 — Your Crew",
                  headline: "See where your friends play",
                  desc: "Add friends and stay in the loop with where your crew is running.",
                  mockup: "/mockups/friends.png",
                  alt: "RunCheck — Friends screen",
                },
                {
                  label: "05 — Show Your Game",
                  headline: "Build your player profile",
                  desc: "Post clips, track your activity, and build your presence on the court.",
                  mockup: "/mockups/clips.png",
                  alt: "RunCheck — Clips and profile screen",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  className="
                    group flex-shrink-0 w-[300px] sm:w-[348px]
                    flex flex-col
                    bg-zinc-900 border border-zinc-800
                    rounded-3xl overflow-hidden
                    text-left [scroll-snap-align:start]
                    hover:border-zinc-700
                    transition-colors duration-300
                  "
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  viewport={{ once: true, amount: 0.01 }}
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                >
                  {/* Card header */}
                  <div className="px-6 pt-6 pb-4 flex flex-col gap-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-orange-500">
                      {card.label}
                    </p>
                    <p className="text-[15px] font-extrabold text-white leading-snug">
                      {card.headline}
                    </p>
                    <p className="text-[12px] text-zinc-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Phone — slightly smaller than the step cards, glow slightly toned down */}
                  <div className="flex-1 flex items-end justify-center px-6 pt-2 overflow-hidden">
                    <img
                      src={card.mockup}
                      alt={card.alt}
                      className="
                        h-[400px] sm:h-[460px] w-auto object-contain max-w-none
                        [filter:drop-shadow(0_-6px_28px_rgba(249,115,22,0.10))_drop-shadow(0_16px_40px_rgba(0,0,0,0.9))]
                        group-hover:[filter:drop-shadow(0_-6px_48px_rgba(249,115,22,0.28))_drop-shadow(0_20px_50px_rgba(0,0,0,0.95))]
                        transition-all duration-500
                      "
                    />
                  </div>
                </motion.div>
              ))}

              {/* Trailing spacer — matches existing section */}
              <div className="w-6 sm:w-10 lg:w-16 flex-shrink-0" aria-hidden="true" />

            </div>
          </div>

        </section>

        <Footer />
      </div>

      {activeStep !== null && (
        <DetailModal
          step={steps[activeStep]}
          onClose={() => setActiveStep(null)}
        />
      )}
    </>
  );
}
