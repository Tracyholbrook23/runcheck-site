"use client";

import { motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ChromeBackground } from "../components/ChromeBackground";

export default function About() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .au-title{animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .1s both}
        .au-sub  {animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .25s both}
      `}</style>
      <div className="bg-black text-white min-h-screen relative">
        <ChromeBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
        <Nav activePath="/about" />

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <p className="au-sub text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-5">About RunCheck</p>
            <h1 className="au-title text-5xl sm:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
              We built RunCheck<br />because we hated<br />empty gyms
            </h1>
            <p className="au-sub text-zinc-400 text-lg leading-8 max-w-lg mx-auto">
              Every pickup player has done it — driven across town, walked into an empty gym, and driven back home. RunCheck exists to end that.
            </p>
          </div>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* ── Mission & Vision ─────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-24 w-full grid grid-cols-1 sm:grid-cols-2 gap-12">
          <Reveal>
            <div className="flex flex-col gap-5 h-full bg-[#0d0d0d] rounded-2xl p-8 border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-xl">🎯</div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">Our Mission</p>
              <h2 className="text-2xl font-extrabold tracking-tight leading-snug">Make pickup basketball accessible for everyone</h2>
              <p className="text-zinc-400 text-base leading-8">
                Pickup basketball is one of the purest forms of the game. No refs, no fees, no politics — just run. But finding a good game has always been hit or miss. RunCheck builds the layer of real-time information the pickup community has always been missing, so any player, anywhere, can find a game.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-5 h-full bg-[#0d0d0d] rounded-2xl p-8 border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-xl">🔭</div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">Our Vision</p>
              <h2 className="text-2xl font-extrabold tracking-tight leading-snug">A world where no hooper ever shows up to an empty court</h2>
              <p className="text-zinc-400 text-base leading-8">
                We envision a future where pickup basketball has the same infrastructure as organized sports — where players can see live court activity, connect with their community, and trust that the run is real before they leave home.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-24 w-full flex flex-col gap-10">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">What we stand for</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Built on four beliefs</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {icon:"🏀",label:"The game comes first",desc:"Every decision we make is for the player on the court, not the product manager."},
                {icon:"📍",label:"Transparency",desc:"You should always know what's actually happening at a gym before you show up."},
                {icon:"🤝",label:"Community",desc:"RunCheck works because players show up, check in, and contribute info that helps everyone."},
                {icon:"⚡",label:"No fluff",desc:"We build what players actually need. Fewer features, more usefulness."},
              ].map(({icon,label,desc})=>(
                <motion.div key={label} whileHover={{x:4}} transition={{duration:.2}}
                  className="flex items-start gap-4 bg-[#111] rounded-2xl p-6 border border-zinc-800">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                  <div><p className="font-bold text-base mb-1.5">{label}</p><p className="text-sm text-zinc-400 leading-6">{desc}</p></div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* ── Founder ──────────────────────────────────────────── */}
        <section className="w-full">
          <Reveal>
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Large photo */}
              <div className="relative lg:w-1/2 min-h-[420px] lg:min-h-[600px] overflow-hidden bg-zinc-900">
                <img
                  src="/founder.jpg"
                  alt="Tracy Holbrook, Founder of RunCheck"
                  className="w-full h-full object-cover object-center"
                />
                {/* subtle gradient fade to right on desktop */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-32"
                  style={{background:"linear-gradient(to right, transparent, black)"}} />
              </div>

              {/* Story text */}
              <div className="lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 py-16 gap-6 bg-black">
                <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">The Builder</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Tracy Holbrook
                </h2>
                <p className="text-orange-400 font-semibold text-lg">Founder, RunCheck</p>
                <div className="w-12 h-0.5 bg-orange-500/50 rounded-full" />
                <p className="text-zinc-300 text-base leading-8">
                  Growing up, pickup basketball was everything. It wasn't organized, it wasn't scheduled — it was just people who loved the game finding each other and running. But that magic always came with a real frustration: you never knew if a game was actually happening until you were already there.
                </p>
                <p className="text-zinc-400 text-base leading-8">
                  I drove to more empty gyms than I can count. I'd show up with my bag, lace up, and look around at four walls and a locked door. That feeling — that wasted trip — is what planted the seed. Not a startup idea. Just a problem I was tired of living with.
                </p>
                <p className="text-zinc-400 text-base leading-8">
                  I built RunCheck for every player who's made that drive and turned around. For the hooper who just moved to a new city and doesn't know anyone. For the guy who gets one free hour after work and can't afford to waste it. This is the app I always wished someone had built. So I built it myself.
                </p>
                <p className="text-xs text-zinc-600 mt-2">🏀 Austin, TX · Built for the culture</p>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="flex flex-col items-center text-center px-6 py-24 gap-6">
          <Reveal className="flex flex-col items-center gap-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Join the run</h2>
            <p className="text-zinc-400 text-base max-w-sm leading-7">Get early access when RunCheck launches in Austin — sign up for the waitlist.</p>
            <a href="/#waitlist" className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-10 py-4 text-base font-bold text-white transition-all shadow-[0_0_32px_rgba(249,115,22,.3)]">Join the Waitlist →</a>
          </Reveal>
        </section>

        <Footer />
        </div>{/* end z-10 */}
      </div>
    </>
  );
}
