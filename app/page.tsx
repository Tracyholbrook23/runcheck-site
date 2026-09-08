"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowUpRight, MapPin, Users, Zap } from "lucide-react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

const APP_STORE_URL = "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";

function StoreButton({ dark = false }: { dark?: boolean }) {
  return <a className={`era-store-button ${dark ? "is-dark" : ""}`} href={APP_STORE_URL} target="_blank" rel="noreferrer">
    <svg viewBox="0 0 814 1000" aria-hidden="true"><path d="M788 341c-6 4-108 62-108 190 0 149 130 201 134 203-1 3-21 72-69 142-43 62-87 123-155 123s-86-40-164-40c-76 0-104 41-166 41S155 922 105 832C46 791 0 664 0 541c0-205 133-313 265-313 70 0 128 43 171 43 40 0 107-47 184-47zM632 131c32-40 54-96 54-152 0-8-1-16-2-23-51 2-112 34-149 76-29 32-55 88-55 145 0 9 1 17 2 20 3 1 8 1 14 1 46 0 101-31 136-67z" /></svg>
    <span><small>Download on the</small>App Store</span><ArrowUpRight aria-hidden="true" />
  </a>;
}

function Kicker({ children }: { children: React.ReactNode }) { return <p className="era-kicker"><span />{children}</p>; }

function LineReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={`era-line-mask ${className}`} initial="hidden" whileInView="show" viewport={{ amount: .35 }}>
    <motion.div variants={{ hidden: { y: "110%", rotate: 2 }, show: { y: 0, rotate: 0 } }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>{children}</motion.div>
  </motion.div>;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", reduced ? "0%" : "30%"]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduced ? 1 : 1.28]);
  const heroOpacity = useTransform(heroProgress, [0, .72], [1, 0]);
  const { scrollYProgress: processProgress } = useScroll({ target: processRef, offset: ["start end", "end start"] });
  const phoneRotate = useTransform(processProgress, [0, .5, 1], [-8, 0, 7]);
  const phoneY = useTransform(processProgress, [0, 1], [90, -70]);
  const progress = useSpring(heroProgress, { stiffness: 90, damping: 22 });

  return <main className="era-home">
    <motion.div className="era-scroll-progress" style={{ scaleX: progress }} /><Nav activePath="/" />
    <section ref={heroRef} className="era-hero">
      <motion.div className="era-hero-glow" style={{ y: heroY, scale: heroScale }} />
      <motion.div className="era-hero-inner" style={{ opacity: heroOpacity }}>
        <div className="era-hero-copy"><Kicker>Pickup basketball, finally connected</Kicker>
          <h1 aria-label="Know the run before you go"><LineReveal>Know the run.</LineReveal><LineReveal className="era-serif">Before you go.</LineReveal></h1>
          <div className="era-hero-bottom"><p>See who&apos;s checked in, where the game is, and when it tips off—before you ever leave the house.</p><StoreButton /></div>
        </div>
        <motion.div className="era-hero-phone" initial={{ opacity: 0, y: 80, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: -2 }} transition={{ duration: 1.2, delay: .25, ease: [.16, 1, .3, 1] }}>
          <span className="era-orbit" /><Image src="/mockups/live-runs.png" alt="RunCheck live runs screen" width={1080} height={1920} priority /><div className="era-live-pill"><span />Live in Austin</div>
        </motion.div>
      </motion.div>
      <a href="#why" className="era-scroll-cue"><ArrowDown />Scroll to check in</a>
    </section>

    <section id="why" className="era-manifesto"><div className="era-section-number">01</div><Kicker>The problem</Kicker>
      <h2><LineReveal>Empty gyms waste time.</LineReveal><LineReveal className="era-serif">Good runs shouldn&apos;t be luck.</LineReveal></h2>
      <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .5 }} transition={{ duration: .8 }}>RunCheck turns word-of-mouth into a live signal. Open the map. See the players. Make the call.</motion.p>
    </section>

    <section ref={processRef} className="era-process"><div className="era-process-sticky">
      <div className="era-process-copy"><div className="era-section-number">02</div><Kicker>One look tells you everything</Kicker><h2>From “maybe”<br /><em>to game on.</em></h2>
        <div className="era-steps">{[
          [MapPin, "Find the court", "Discover active runs around you, not outdated listings."],
          [Users, "Read the room", "See the check-ins and know if the game fits before you pull up."],
          [Zap, "Make it live", "Check in, invite your crew, and turn a court into a run."],
        ].map(([Icon, title, copy], index) => { const StepIcon = Icon as typeof MapPin; return <motion.article key={String(title)} initial={{ opacity: .25, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: .8 }} transition={{ duration: .55 }}><span>0{index + 1}</span><StepIcon /><div><h3>{String(title)}</h3><p>{String(copy)}</p></div></motion.article>; })}</div>
      </div>
      <motion.div className="era-process-visual" style={{ rotate: phoneRotate, y: phoneY }}><div className="era-court-lines" aria-hidden="true" /><Image src="/mockups/find-a-run.png" alt="Find a pickup game near you in RunCheck" width={1080} height={1920} /></motion.div>
    </div></section>

    <section className="era-culture"><div className="era-culture-track" aria-hidden="true">THE CITY IS YOUR COURT · THE CITY IS YOUR COURT ·</div><div className="era-culture-grid">
      <div className="era-culture-image"><Image src="/mockups/plan-a-run.png" alt="Plan a Run in RunCheck" width={1080} height={1920} /></div>
      <div className="era-culture-copy"><div className="era-section-number">03</div><Kicker>Built for the way ballers move</Kicker><h2>Plan less.<br /><em>Play more.</em></h2><p>Create a run in seconds. Set the time, invite your people, and give every player one place to know what&apos;s happening.</p><Link href="/how-it-works" className="era-text-link">See how it works <ArrowUpRight /></Link></div>
    </div></section>

    <section className="era-proof"><Kicker>Made for the local game</Kicker><div className="era-proof-row"><p><strong>100+</strong><span>courts mapped</span></p><p><strong>0</strong><span>wasted trips</span></p><p><strong>Free</strong><span>for every player</span></p></div><p className="era-proof-note">Starting in Austin, Texas. Built to travel wherever the next run takes us.</p></section>
    <section className="era-final"><div className="era-final-ball" aria-hidden="true"><span /><span /><span /></div><Kicker>Your next run is already forming</Kicker><h2><LineReveal>Don&apos;t miss it.</LineReveal></h2><p>Know before you go.</p><StoreButton dark /></section>
    <Footer />
  </main>;
}
