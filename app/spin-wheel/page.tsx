import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { SpinWheel } from "../components/SpinWheel";

export const metadata: Metadata = {
  title: "RunCheck Spin Wheel — Pick the Next Hooper",
  description:
    "Enter names, spin the wheel, and reveal who's up next. RunCheck's basketball-themed spin wheel picker for pickup runs and events.",
};

export default function SpinWheelPage() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Court-inspired background texture — subtle, neutral gray lines */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, #71717a 39px, #71717a 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #71717a 39px, #71717a 40px)",
        }}
      />

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
