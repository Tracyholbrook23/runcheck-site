import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { SpinWheel } from "../components/SpinWheel";

// Duplicated from SpinWheel.tsx's GIVEAWAY constant rather than imported —
// importing a plain constant from a "use client" file into this server
// component was silently evaluating stale/false on Vercel's Turbopack
// build, even across fresh deployments. Keep these two in sync by hand.
const GIVEAWAY_ACTIVE = true;
const GIVEAWAY_IMAGE = "/spin-wheel/kobe-girl-dad-prize.jpg";
const GIVEAWAY_TITLE = "Kobe Girl Dad Giveaway";

export const metadata: Metadata = {
  title: "RunCheck Spin Wheel — Pick the Next Hooper",
  description:
    "Enter names, spin the wheel, and reveal who's up next. RunCheck's basketball-themed spin wheel picker for pickup runs and events.",
};

export default function SpinWheelPage() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {GIVEAWAY_ACTIVE ? (
        <>
          {/* Prize photo as the full-page background — big, behind
              everything, with the wheel sitting on top of it. */}
          <div className="fixed inset-0">
            <Image
              src={GIVEAWAY_IMAGE}
              alt={GIVEAWAY_TITLE}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* Dark overlay so nav/text/wheel stay legible over a busy photo
                — darkest at the very top/bottom (nav, footer) and lightest
                in the middle where the wheel sits, so the photo still reads
                clearly as the page background. */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85" />
          </div>
        </>
      ) : (
        /* Court-inspired background texture — subtle, neutral gray lines */
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, #71717a 39px, #71717a 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #71717a 39px, #71717a 40px)",
          }}
        />
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Nav activePath="/spin-wheel" />

        <section className="flex flex-col items-center text-center px-6 pt-32 pb-6 gap-3">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-500">
              RunCheck Spin Wheel
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight">
              Spin for the next hooper.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-zinc-500 text-sm max-w-md">
              Drop in your names, give it a spin, and lock in a winner —
              built for pickup runs, giveaways, and event screens.
            </p>
          </Reveal>
        </section>

        <section className="flex-1 flex flex-col items-center px-6 pb-24">
          <Reveal delay={200}>
            <SpinWheel />
          </Reveal>
        </section>

        <Footer />
      </div>
    </div>
  );
}
