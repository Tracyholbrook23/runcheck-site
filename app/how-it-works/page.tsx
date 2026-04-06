"use client";

import { motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { FAQ } from "../components/FAQ";

const PRIVACY_URL = "/privacy";

export default function HowItWorks() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .hw-title{animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .1s both}
        .hw-sub  {animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .25s both}
      `}</style>
      <div className="bg-black text-white flex flex-col min-h-screen">
        <Nav activePath="/how-it-works" />

        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-36 pb-20 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
            style={{background:"radial-gradient(ellipse,rgba(249,115,22,.4) 0%,transparent 70%)"}} />
          <div className="relative z-10 max-w-xl">
            <p className="hw-sub text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-4">How it works</p>
            <h1 className="hw-title text-5xl sm:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
              From your couch<br />to the court
            </h1>
            <p className="hw-sub text-zinc-400 text-base leading-7 max-w-md mx-auto">
              RunCheck makes finding a pickup game as easy as opening your phone. Here&apos;s how it all fits together.
            </p>
          </div>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* Steps */}
        <section className="max-w-3xl mx-auto px-6 py-24 flex flex-col gap-6">
          <Reveal><p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-8">The flow</p></Reveal>
          {[
            {step:"01",icon:"🗺️",title:"Open the app and browse nearby courts",desc:"RunCheck shows every tracked basketball court near you on a map. Orange pins mean there\'s an active run happening right now. Green pins mean the court is available.",detail:"Filter by court type (indoor/outdoor), access (free or membership), city, and run level."},
            {step:"02",icon:"👀",title:"See who\'s playing and what\'s going on",desc:"Tap any court to see the run details: how many players have checked in, what level the run is, and when the first player arrived.",detail:"You can also follow courts you play at regularly to stay notified when a run starts."},
            {step:"03",icon:"📍",title:"Check in when you arrive",desc:"When you get to the gym, tap Check In Here. RunCheck uses GPS to confirm you\'re actually at the court — no ghosts, no fake check-ins.",detail:"Your check-in shows up live for everyone browsing that court."},
            {step:"04",icon:"🏀",title:"Start a run or join one",desc:"Post an Open Run so other nearby players can find you and join. Set the level and let other players come to you.",detail:"Premium users can also create Private Runs (invite-only) or Paid Runs (charge entry, collect earnings)."},
            {step:"05",icon:"📅",title:"Plan a visit for later",desc:"Not going today? Schedule when you plan to play. When enough players pick the same court and time window, a run naturally forms — before anyone even shows up.",detail:"This solves the cold-start problem: courts can show future demand, not just current activity."},
          ].map(({step,icon,title,desc,detail},i)=>(
            <Reveal key={step} delay={i*80}>
              <motion.div whileHover={{x:4}} transition={{duration:.2}}
                className="flex flex-col sm:flex-row gap-5 bg-[#0d0d0d] rounded-2xl p-7 border border-zinc-800 border-l-4 border-l-orange-500">
                <div className="flex-shrink-0 flex flex-col items-center sm:items-start gap-1 sm:w-16">
                  <span className="text-3xl">{icon}</span>
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{step}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-6">{desc}</p>
                  <p className="text-sm text-zinc-600 leading-6 italic">{detail}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 py-24 flex flex-col gap-10 w-full">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Common questions</h2>
          </Reveal>
          <Reveal delay={100}><FAQ /></Reveal>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* CTA */}
        <section className="flex flex-col items-center text-center px-6 py-24 gap-6">
          <Reveal className="flex flex-col items-center gap-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to run?</h2>
            <p className="text-zinc-400 text-base max-w-sm leading-7">Join the waitlist and be first to know when RunCheck launches in Austin.</p>
            <a href="/#waitlist" className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-9 py-4 text-base font-bold text-white transition-all shadow-[0_0_32px_rgba(249,115,22,.3)]">Join the Waitlist →</a>
          </Reveal>
        </section>

        <Footer />
      </div>
    </>
  );
}
