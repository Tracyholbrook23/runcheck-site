"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Reveal } from "./components/Reveal";
import { LiveDemo } from "./components/LiveDemo";
import { FAQ } from "./components/FAQ";

const PRIVACY_URL =
  "https://gray-marlin-55c.notion.site/RunCheck-Privacy-Policy-3280818539eb80168b7cc7dd061f3d09";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-3">{children}</p>;
}
function Divider() {
  return <div className="w-full border-t border-zinc-800/60" />;
}

// ── Email capture ──────────────────────────────────────────────────────────────
// To connect an email service, replace the body of `submitEmail` with your
// integration (e.g. a POST to your Klaviyo list or Mailchimp audience endpoint).
// Both sections on this page call the same function.
async function submitEmail(email: string): Promise<void> {
  // TODO: swap this console.log for your real API call, e.g.:
  // await fetch("https://a.klaviyo.com/api/profiles/", { method:"POST", ... })
  console.log("Early access signup:", email);
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [earlyEmail, setEarlyEmail] = useState("");
  const [earlyEmailSent, setEarlyEmailSent] = useState(false);
  const [earlyEmailLoading, setEarlyEmailLoading] = useState(false);

  function handleEmailSubmit(e: React.FormEvent) { e.preventDefault(); if (email.trim()) setEmailSent(true); }

  async function handleEarlyAccess(e: React.FormEvent) {
    e.preventDefault();
    if (!earlyEmail.trim()) return;
    setEarlyEmailLoading(true);
    await submitEmail(earlyEmail);
    setEarlyEmailLoading(false);
    setEarlyEmailSent(true);
  }

  return (
    <>
      <style>{`
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes glowPulse { 0%,100%{opacity:.18;transform:translate(-50%,-50%) scale(1)} 50%{opacity:.32;transform:translate(-50%,-50%) scale(1.12)} }
        @keyframes pinBounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-10px)} 70%{transform:translateY(-5px)} }
        .anim-title{animation:heroFadeUp .85s cubic-bezier(.16,1,.3,1) .05s both}
        .anim-badge{animation:heroFadeUp .85s cubic-bezier(.16,1,.3,1) .15s both}
        .anim-tag  {animation:heroFadeUp .85s cubic-bezier(.16,1,.3,1) .28s both}
        .anim-desc {animation:heroFadeUp .85s cubic-bezier(.16,1,.3,1) .42s both}
        .anim-btns {animation:heroFadeUp .85s cubic-bezier(.16,1,.3,1) .55s both}
        .anim-stats{animation:heroFadeIn 1s ease 1.0s both}
        .anim-phone{animation:heroFadeUp 1.1s cubic-bezier(.16,1,.3,1) .35s both}
        .anim-glow {animation:glowPulse 5s ease-in-out infinite}
        .anim-pin-1{animation:pinBounce 3s ease-in-out .2s infinite}
        .anim-pin-2{animation:pinBounce 3s ease-in-out .8s infinite}
        .anim-pin-3{animation:pinBounce 3s ease-in-out 1.4s infinite}
        .feat{transition:border-color .2s,transform .2s,box-shadow .2s}
        .feat:hover{border-color:rgba(249,115,22,.35);transform:translateY(-2px);box-shadow:0 8px 32px rgba(249,115,22,.06)}
      `}</style>

      <div className="bg-black text-white flex flex-col">
        <Nav activePath="/" />

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen overflow-hidden w-full">
          {/* Video — true full-bleed, no max-width constraint */}
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
            src="/hero.mp4"
          />
          {/* Overlay */}
          <div className="absolute inset-0 z-0" style={{background:"linear-gradient(to right, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.25) 100%)"}} />
          <div className="anim-glow pointer-events-none absolute top-1/2 left-1/4 w-[700px] h-[700px] rounded-full z-0"
            style={{background:"radial-gradient(ellipse,rgba(249,115,22,.18) 0%,transparent 70%)"}} />
          {/* Inner content wrapper keeps content centered and padded */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-24 pb-32 flex flex-col lg:flex-row items-center justify-center gap-16">

          {/* Copy */}
          <div className="flex flex-col gap-6 max-w-xl text-center lg:text-left items-center lg:items-start">
            <div className="anim-badge inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]" />
              Now live in Austin &amp; surrounding areas
            </div>
            <h1 className="anim-title leading-none">
              <img src="/runcheck-logo.png" alt="RunCheck" className="h-[clamp(5rem,14vw,10rem)] w-auto" />
            </h1>
            <p className="anim-tag text-2xl sm:text-3xl font-semibold text-orange-400 leading-snug">Find pickup basketball runs near you</p>
            <p className="anim-desc text-lg leading-8 text-zinc-300 max-w-lg">
              Stop wasting trips to empty gyms. See who&apos;s checked in, where the run is, and when it tips off — before you ever leave the house.
            </p>
            <div className="anim-btns flex items-center gap-3">
              <a href="#" className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-10 py-4 text-base font-bold text-white transition-all shadow-[0_0_32px_rgba(249,115,22,.3)] hover:shadow-[0_0_48px_rgba(249,115,22,.45)]">Download App</a>
            </div>
            <div className="anim-stats flex items-center gap-8 mt-1">
              {[["100+","Courts"],["Live","Check-ins"],["Real-time","Runs"]].map(([v,l])=>(
                <div key={l} className="flex flex-col items-center lg:items-start gap-0.5">
                  <span className="text-lg font-extrabold text-orange-400 leading-none">{v}</span>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-600">{l}</span>
                </div>
              ))}
            </div>
            <p className="anim-stats text-xs text-zinc-600 flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block" />
              Starting in Austin, TX — <span className="text-zinc-500">more cities coming soon</span>
            </p>
          </div>

          {/* Phone */}
          <div className="anim-phone flex-shrink-0 hidden sm:block">
            <div className="absolute -top-6 -right-4 anim-pin-1 z-20 flex flex-col items-center">
              <div className="w-9 h-9 rounded-full bg-orange-500 border-2 border-orange-300 flex items-center justify-center shadow-[0_0_16px_rgba(249,115,22,.6)]"><span className="text-white text-xs font-bold">8</span></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-orange-500" />
            </div>
            <div className="absolute top-12 -left-8 anim-pin-2 z-20 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-300 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,.5)]"><span className="text-white text-[10px] font-bold">—</span></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-green-500" />
            </div>
            <div className="absolute bottom-20 -right-6 anim-pin-3 z-20 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-orange-300 flex items-center justify-center shadow-[0_0_12px_rgba(249,115,22,.5)]"><span className="text-white text-[10px] font-bold">12</span></div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-orange-500" />
            </div>
            <div className="w-[240px] sm:w-[270px] rounded-[44px] bg-zinc-900 border-2 border-zinc-700 shadow-[0_0_100px_rgba(249,115,22,.12)] overflow-hidden relative">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
              <div className="bg-black rounded-[40px] overflow-hidden pt-12 pb-6 px-4 flex flex-col gap-3 min-h-[500px]">
                <div className="flex items-center justify-between px-1 mt-1">
                  <div><p className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Live Runs</p><p className="text-white font-extrabold text-sm">Find a Run</p></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" /><span className="text-[9px] text-zinc-500">Near You</span></div>
                </div>
                <div className="flex items-center gap-2 bg-zinc-900 rounded-xl px-3 py-2 border border-zinc-800">
                  <span className="text-zinc-500 text-xs">🔍</span><span className="text-zinc-600 text-[11px]">Search courts...</span>
                </div>
                {[{name:"Clay Madsen Rec",city:"Round Rock",players:8,active:true},{name:"Austin Rec Center",city:"Austin",players:12,active:true},{name:"Brushy Creek Park",city:"Cedar Park",players:0,active:false},{name:"Pflugerville Park",city:"Pflugerville",players:5,active:true}].map(r=>(
                  <div key={r.name} className={"flex items-center gap-3 bg-[#141414] rounded-xl p-3 border border-zinc-800/80 "+(r.active?"border-l-2 border-l-orange-500":"border-l-2 border-l-zinc-700")}>
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm flex-shrink-0">🏀</div>
                    <div className="flex-1 min-w-0"><p className="text-white text-[11px] font-semibold truncate">{r.name}</p><p className="text-zinc-500 text-[9px]">{r.city}</p></div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className={"w-1.5 h-1.5 rounded-full "+(r.active?"bg-orange-400":"bg-zinc-600")} />
                      <span className={"text-[10px] font-bold "+(r.active?"text-orange-400":"text-zinc-500")}>{r.active?r.players+" in":"No run"}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full bg-orange-500 rounded-xl py-2.5 text-white text-[11px] font-bold mt-auto">Check In Here</button>
              </div>
            </div>
          </div>
          </div>{/* end inner content wrapper */}
        </section>

        {/* ══ MAP SECTION ══════════════════════════════════════ */}
        <section className="w-full border-y border-zinc-800/60 bg-zinc-950">
          <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-10 items-stretch">

            {/* Map */}
            <div className="relative lg:w-3/5 min-h-[380px] rounded-2xl overflow-hidden border border-zinc-800 flex-shrink-0" style={{background:"#1a1f2e"}}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                {/* Base fill */}
                <rect width="600" height="380" fill="#1a1f2e"/>

                {/* Park / green areas */}
                <rect x="320" y="180" width="90" height="60" rx="4" fill="#1e2d1e"/>
                <rect x="30" y="260" width="70" height="50" rx="4" fill="#1e2d1e"/>
                <rect x="440" y="60" width="60" height="40" rx="4" fill="#1e2d1e"/>

                {/* Water */}
                <path d="M0 310 Q80 300 160 315 Q240 330 320 310 Q400 295 480 310 Q540 320 600 305 L600 380 L0 380Z" fill="#111827" opacity="0.9"/>
                <path d="M0 325 Q100 315 200 328 Q300 340 400 325 Q500 312 600 322" fill="none" stroke="#1e3a5f" strokeWidth="1.5"/>

                {/* Major roads - arterials */}
                {/* Horizontal major */}
                <line x1="0" y1="155" x2="600" y2="155" stroke="#2d3748" strokeWidth="10"/>
                <line x1="0" y1="155" x2="600" y2="155" stroke="#374151" strokeWidth="7"/>
                {/* Vertical major */}
                <line x1="195" y1="0" x2="195" y2="380" stroke="#2d3748" strokeWidth="10"/>
                <line x1="195" y1="0" x2="195" y2="380" stroke="#374151" strokeWidth="7"/>
                {/* Diagonal arterial - like MoPac */}
                <path d="M120 0 Q150 80 165 155 Q178 230 170 380" fill="none" stroke="#374151" strokeWidth="8"/>
                {/* Another diagonal */}
                <path d="M600 100 Q520 140 460 155 Q380 170 300 200 Q220 230 160 310" fill="none" stroke="#374151" strokeWidth="6"/>

                {/* Secondary roads */}
                <line x1="0" y1="80" x2="600" y2="80" stroke="#252d3d" strokeWidth="4"/>
                <line x1="0" y1="240" x2="600" y2="240" stroke="#252d3d" strokeWidth="4"/>
                <line x1="0" y1="295" x2="600" y2="295" stroke="#252d3d" strokeWidth="3"/>
                <line x1="320" y1="0" x2="320" y2="380" stroke="#252d3d" strokeWidth="4"/>
                <line x1="450" y1="0" x2="450" y2="295" stroke="#252d3d" strokeWidth="4"/>
                <line x1="80" y1="0" x2="80" y2="380" stroke="#252d3d" strokeWidth="3"/>

                {/* Tertiary / local streets */}
                <line x1="0" y1="115" x2="600" y2="115" stroke="#1f2937" strokeWidth="2"/>
                <line x1="0" y1="195" x2="600" y2="195" stroke="#1f2937" strokeWidth="2"/>
                <line x1="0" y1="265" x2="600" y2="265" stroke="#1f2937" strokeWidth="2"/>
                <line x1="255" y1="0" x2="255" y2="380" stroke="#1f2937" strokeWidth="2"/>
                <line x1="385" y1="0" x2="385" y2="295" stroke="#1f2937" strokeWidth="2"/>
                <line x1="520" y1="0" x2="520" y2="295" stroke="#1f2937" strokeWidth="2"/>
                <line x1="130" y1="0" x2="130" y2="155" stroke="#1f2937" strokeWidth="2"/>
                <line x1="130" y1="155" x2="130" y2="380" stroke="#1f2937" strokeWidth="2"/>

                {/* Road center dashes on major roads */}
                <line x1="0" y1="155" x2="600" y2="155" stroke="#4b5563" strokeWidth="1" strokeDasharray="12 8"/>
                <line x1="195" y1="0" x2="195" y2="380" stroke="#4b5563" strokeWidth="1" strokeDasharray="12 8"/>

                {/* City blocks - subtle shading */}
                <rect x="81" y="81" width="48" height="33" fill="#1e2433" opacity="0.6"/>
                <rect x="81" y="116" width="48" height="38" fill="#1d2332" opacity="0.6"/>
                <rect x="131" y="81" width="63" height="33" fill="#1e2433" opacity="0.6"/>
                <rect x="131" y="116" width="63" height="38" fill="#1d2332" opacity="0.6"/>
                <rect x="196" y="81" width="58" height="33" fill="#1e2433" opacity="0.6"/>
                <rect x="196" y="116" width="58" height="38" fill="#1d2332" opacity="0.6"/>
                <rect x="256" y="81" width="63" height="33" fill="#1e2433" opacity="0.6"/>
                <rect x="256" y="116" width="63" height="38" fill="#1d2332" opacity="0.6"/>
                <rect x="321" y="81" width="63" height="33" fill="#1e2433" opacity="0.6"/>
                <rect x="386" y="81" width="63" height="33" fill="#1e2433" opacity="0.6"/>
                <rect x="196" y="196" width="58" height="43" fill="#1e2433" opacity="0.6"/>
                <rect x="256" y="196" width="63" height="43" fill="#1d2332" opacity="0.6"/>
                <rect x="321" y="196" width="63" height="43" fill="#1e2433" opacity="0.6"/>
                <rect x="386" y="196" width="63" height="43" fill="#1d2332" opacity="0.6"/>
                <rect x="451" y="156" width="68" height="38" fill="#1e2433" opacity="0.6"/>
                <rect x="451" y="196" width="68" height="43" fill="#1d2332" opacity="0.6"/>
                <rect x="196" y="241" width="58" height="23" fill="#1e2433" opacity="0.6"/>
                <rect x="256" y="241" width="63" height="23" fill="#1d2332" opacity="0.6"/>
                <rect x="321" y="241" width="63" height="23" fill="#1e2433" opacity="0.6"/>
                <rect x="386" y="241" width="63" height="23" fill="#1d2332" opacity="0.6"/>
                <rect x="81" y="156" width="48" height="38" fill="#1e2433" opacity="0.6"/>
                <rect x="131" y="156" width="63" height="38" fill="#1d2332" opacity="0.6"/>
                <rect x="81" y="196" width="48" height="43" fill="#1e2433" opacity="0.6"/>
                <rect x="131" y="196" width="63" height="43" fill="#1d2332" opacity="0.6"/>

                {/* Park trees dots */}
                <circle cx="340" cy="200" r="3" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="355" cy="210" r="2" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="370" cy="198" r="3" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="345" cy="222" r="2" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="390" cy="205" r="3" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="50" cy="275" r="3" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="65" cy="285" r="2" fill="#2d4a2d" opacity="0.8"/>
                <circle cx="75" cy="270" r="3" fill="#2d4a2d" opacity="0.8"/>

                {/* Street labels */}
                <text x="200" y="148" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">W 6TH ST</text>
                <text x="200" y="148" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">W 6TH ST</text>
                <text x="420" y="148" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">E 6TH ST</text>
                <text x="10" y="148" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">W 6TH ST</text>
                <text x="199" y="30" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5" writingMode="tb">CONGRESS AVE</text>
                <text x="322" y="30" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5" writingMode="tb">LAMAR BLVD</text>
                <text x="10" y="76" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">MLK JR BLVD</text>
                <text x="10" y="237" fontSize="7" fill="#6b7280" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.5">BEN WHITE BLVD</text>
                <text x="333" y="192" fontSize="6" fill="#4ade80" fontFamily="sans-serif" fontWeight="600">PARK</text>
                <text x="38" y="280" fontSize="6" fill="#4ade80" fontFamily="sans-serif" fontWeight="600">PARK</text>
              </svg>

              {/* Area label */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-1.5 flex items-center gap-2 z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Austin, TX — Live</span>
              </div>

              {/* Gym pins */}
              <div className="absolute z-20" style={{left:"29%",top:"36%"}}>
                <div className="relative flex flex-col items-center group cursor-pointer">
                  <div className="w-9 h-9 rounded-full bg-orange-500 border-2 border-orange-200 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,.8)] text-white text-[11px] font-bold">12</div>
                  <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[9px] border-l-transparent border-r-transparent border-t-orange-500" />
                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-zinc-900/95 border border-zinc-600 rounded-lg px-3 py-2 text-[11px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                    <p className="font-bold">Austin Rec Center</p><p className="text-orange-400 text-[10px]">12 players · Competitive</p>
                  </div>
                </div>
              </div>

              <div className="absolute z-20" style={{left:"68%",top:"15%"}}>
                <div className="relative flex flex-col items-center group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-orange-500 border-2 border-orange-200 flex items-center justify-center shadow-[0_0_16px_rgba(249,115,22,.7)] text-white text-[10px] font-bold">8</div>
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[8px] border-l-transparent border-r-transparent border-t-orange-500" />
                  <div className="absolute bottom-13 left-1/2 -translate-x-1/2 bg-zinc-900/95 border border-zinc-600 rounded-lg px-3 py-2 text-[11px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                    <p className="font-bold">Clay Madsen Rec</p><p className="text-orange-400 text-[10px]">8 players · Balanced</p>
                  </div>
                </div>
              </div>

              <div className="absolute z-20" style={{left:"78%",top:"58%"}}>
                <div className="relative flex flex-col items-center group cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-orange-400 border border-orange-200 flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,.5)] text-white text-[9px] font-bold">3</div>
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[7px] border-l-transparent border-r-transparent border-t-orange-400" />
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-zinc-900/95 border border-zinc-600 rounded-lg px-3 py-2 text-[11px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                    <p className="font-bold">Brushy Creek Park</p><p className="text-orange-400 text-[10px]">3 players · Casual</p>
                  </div>
                </div>
              </div>

              <div className="absolute z-20" style={{left:"50%",top:"68%"}}>
                <div className="relative flex flex-col items-center group cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-zinc-700 border border-zinc-500 flex items-center justify-center text-zinc-400 text-[9px] font-bold">—</div>
                  <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[7px] border-l-transparent border-r-transparent border-t-zinc-700" />
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-zinc-900/95 border border-zinc-600 rounded-lg px-3 py-2 text-[11px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-30">
                    <p className="font-bold">Pflugerville Park</p><p className="text-zinc-500 text-[10px]">No active run</p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-2.5 flex flex-col gap-1.5 z-10">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,.5)]" /><span className="text-[9px] text-zinc-400">Active run</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-zinc-700" /><span className="text-[9px] text-zinc-400">No run yet</span></div>
                <div className="flex items-center gap-2"><span className="font-bold text-orange-400 text-[9px]">12</span><span className="text-[9px] text-zinc-400">= players in</span></div>
              </div>
            </div>

            {/* Gym detail cards */}
            <div className="flex flex-col gap-3 flex-1 justify-center">
              <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1">Courts near you</p>
              {[
                {name:"Austin Rec Center",   city:"Austin",       players:12, level:"Competitive", active:true,  pct:90},
                {name:"Clay Madsen Rec",     city:"Round Rock",   players:8,  level:"Balanced",    active:true,  pct:60},
                {name:"Brushy Creek Park",   city:"Cedar Park",   players:3,  level:"Casual",      active:true,  pct:25},
                {name:"Pflugerville Park",   city:"Pflugerville", players:0,  level:"Casual",      active:false, pct:0},
              ].map(({name,city,players,level,active,pct})=>{
                const levelColor = level==="Competitive"?"text-orange-400 bg-orange-500/10 border-orange-500/30":level==="Balanced"?"text-blue-400 bg-blue-500/10 border-blue-500/30":"text-green-400 bg-green-500/10 border-green-500/30";
                const barColor  = level==="Competitive"?"bg-orange-500":level==="Balanced"?"bg-blue-500":"bg-green-500";
                return (
                  <div key={name} className="flex items-center gap-3 bg-[#111] border border-zinc-800 rounded-xl px-4 py-3">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active?"bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,.6)]":"bg-zinc-700"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div>
                          <p className="text-xs font-bold text-white truncate">{name}</p>
                          <p className="text-[10px] text-zinc-600">{city}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[9px] font-bold uppercase tracking-wide border rounded-full px-2 py-0.5 ${levelColor}`}>{level}</span>
                          <span className="text-sm font-extrabold text-orange-400 leading-none">{active?players:"—"}</span>
                        </div>
                      </div>
                      {/* Intensity meter */}
                      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${barColor}`} style={{width:`${pct}%`}} />
                      </div>
                    </div>
                  </div>
                );
              })}
              <p className="text-[10px] text-zinc-600 mt-1 flex items-center gap-1.5">
                <span>📍</span> GPS-verified check-ins only — so the player count is always accurate. No check-in without being physically at the court.
              </p>
            </div>
          </div>
        </section>

        {/* ══ SOCIAL PROOF ════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-16 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>Community</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Real players. Real runs.</h2>
            <p className="text-zinc-400 mt-4 text-base leading-7 max-w-md mx-auto">Players across Austin and the surrounding area are already using RunCheck to find their next game.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {[
              {quote:"Finally stopped wasting gas driving to empty gyms. I check RunCheck before I even put my shoes on.",name:"Marcus T.",location:"Austin, TX",level:"Competitive",avatar:"https://i.pravatar.cc/80?img=12"},
              {quote:"The check-in system is genius. You actually know the run is real before you show up.",name:"DeShawn R.",location:"Round Rock, TX",level:"Balanced",avatar:"https://i.pravatar.cc/80?img=33"},
              {quote:"Started a run at my local gym and within 20 min four more players checked in. This app is legit.",name:"Jordan K.",location:"Cedar Park, TX",level:"Casual",avatar:"https://i.pravatar.cc/80?img=52"},
            ].map(({quote,name,location,level,avatar},i)=>(
              <Reveal key={name} delay={i*100} className="h-full">
                <motion.div whileHover={{y:-4,borderColor:"rgba(249,115,22,.3)"}} transition={{duration:.2}}
                  className="h-full flex flex-col gap-4 bg-[#0d0d0d] rounded-2xl p-6 border border-zinc-800 text-left">
                  <div className="flex gap-0.5">{[0,1,2,3,4].map(j=><span key={j} className="text-orange-400 text-xs">★</span>)}</div>
                  <p className="text-sm leading-7 text-zinc-300 flex-1">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                    <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover border border-zinc-700 flex-shrink-0" />
                    <div><p className="text-xs font-semibold text-white">{name}</p><p className="text-[10px] text-zinc-600">{location} · {level}</p></div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ APP SCREENSHOTS ══════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-16 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>The app</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">See it in action</h2>
            <p className="text-zinc-400 mt-4 text-base leading-7 max-w-md mx-auto">A clean, fast mobile experience built around one goal: getting you to the right run.</p>
          </Reveal>
          <div className="flex flex-col sm:flex-row items-end justify-center gap-6 w-full">
            {[{label:"Home",tall:false},{label:"Find a Run",tall:true},{label:"Check In",tall:false}].map(({label,tall},i)=>(
              <Reveal key={label} delay={i*100}>
                <div className="flex flex-col items-center gap-3">
                  <div className={"w-[160px] rounded-[28px] bg-zinc-900 border-2 border-zinc-700 overflow-hidden shadow-[0_0_40px_rgba(249,115,22,.08)] flex flex-col"+(tall?"":" opacity-90")} style={{height:"320px"}}>
                    <div className="h-5 bg-black flex items-center justify-center flex-shrink-0"><div className="w-12 h-3 bg-zinc-900 rounded-full" /></div>
                    <div className="flex-1 bg-black flex items-center justify-center">
                      <div className="text-center px-3"><span className="text-3xl">📱</span><p className="text-zinc-700 text-[9px] mt-2 uppercase tracking-widest">Screenshot<br />coming soon</p></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 border-dashed rounded-2xl px-6 py-4 text-sm text-zinc-500 max-w-lg text-center mx-auto">
              <span className="text-xl flex-shrink-0">📸</span>
              <p>Send real app screenshots and I&apos;ll swap these placeholders in immediately.</p>
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ══ HOW IT WORKS ════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-16 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>How it works</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Three steps to your next run</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {[{step:"01",icon:"👀",title:"See who\'s playing",desc:"Browse active runs and see how many players have checked in at each court — live."},{step:"02",icon:"📍",title:"Check where the run is",desc:"Every run is pinned to a real location: indoor gym, outdoor park, or neighborhood court."},{step:"03",icon:"⏰",title:"Show up at the right time",desc:"See live check-in times so you always arrive when the game is actually going."}].map(({step,icon,title,desc},i)=>(
              <Reveal key={step} delay={i*100} className="h-full">
                <motion.div whileHover={{y:-3}} transition={{duration:.2}} className="h-full flex flex-col gap-4 bg-[#111] rounded-2xl p-7 border border-zinc-800 border-l-4 border-l-orange-500 text-left">
                  <div className="flex items-center gap-3"><span className="text-3xl">{icon}</span><span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">Step {step}</span></div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-sm leading-6 text-zinc-400">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ LIVE DEMO ════════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-14 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>Live demo</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Runs are happening right now</h2>
            <p className="text-zinc-400 mt-4 text-base leading-7 max-w-md mx-auto">This is what it looks like. Player counts update in real time as people check in.</p>
          </Reveal>
          <Reveal delay={100} className="w-full"><LiveDemo /></Reveal>
        </section>

        <Divider />

        {/* ══ RUN LEVELS ══════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-12 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>Set the vibe</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Find a run that matches your level</h2>
            <p className="text-zinc-400 mt-4 text-base leading-7 max-w-md mx-auto">Filter by run level so you always end up in a game that fits.</p>
          </Reveal>
          <Reveal delay={100} className="w-full">
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-3xl mx-auto w-full">
              {[{emoji:"😊",label:"Casual",desc:"Just for fun. Laid-back energy, all skill levels welcome.",color:"border-zinc-700 hover:border-zinc-500",tc:"text-zinc-300"},{emoji:"🤝",label:"Balanced",desc:"Competitive but friendly. Good pace, decent level.",color:"border-zinc-700 hover:border-zinc-500",tc:"text-zinc-300"},{emoji:"🔥",label:"Competitive",desc:"High intensity. Come ready to ball or sit down.",color:"border-orange-500",tc:"text-orange-400",active:true}].map(({emoji,label,desc,color,tc,active})=>(
                <motion.div key={label} whileHover={{y:-4}} transition={{duration:.2}} className={"flex-1 flex flex-col items-center gap-3 rounded-2xl p-6 border-2 bg-[#0d0d0d] transition-colors cursor-default "+color}>
                  <span className="text-4xl">{emoji}</span>
                  <span className={"text-base font-bold "+tc}>{label}</span>
                  <p className="text-sm text-zinc-500 leading-6">{desc}</p>
                  {active&&<span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-orange-500 border border-orange-500/50 rounded-full px-3 py-0.5">Most Popular</span>}
                </motion.div>
              ))}
            </div>
          </Reveal>
        </section>

        <Divider />

        {/* ══ WHY RUNCHECK ════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-16 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>Why RunCheck</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Built for players, by players</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {[{icon:"🚫",title:"Avoid empty gyms",desc:"Never drive across town to an empty floor again. Know before you go."},{icon:"🔥",title:"Find better runs",desc:"Filter by court type, access, city, and level. Find games that match your vibe."},{icon:"⚡",title:"Save time",desc:"Less scouting, more hooping. Find your run in seconds."}].map(({icon,title,desc},i)=>(
              <Reveal key={title} delay={i*100} className="h-full">
                <div className="feat h-full flex flex-col items-center gap-4 rounded-2xl p-7 border border-zinc-800 bg-[#0d0d0d]">
                  <span className="text-5xl">{icon}</span><h3 className="text-lg font-bold">{title}</h3><p className="text-sm leading-6 text-zinc-400">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ FEATURES GRID ════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-16 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>Features</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Everything you need to ball out</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            {[{icon:"📍",title:"GPS Check-in",desc:"Confirms you\'re physically at the gym before letting you check in. No ghosts."},{icon:"🗺️",title:"Nearby Courts Map",desc:"See all courts near you on a map. Orange = active run. Green = no run yet."},{icon:"📅",title:"Plan a Visit",desc:"Schedule when you plan to play. When enough players pick the same time, a run forms."},{icon:"🏆",title:"Leaderboard",desc:"Weekly and all-time boards track who\'s putting in the most work."},{icon:"📊",title:"Reliability Score",desc:"Your attendance rate and no-show history — stay accountable to the run."},{icon:"💬",title:"Direct Messages",desc:"Message players in your runs. Coordinate, trash talk, or find a next run."}].map(({icon,title,desc},i)=>(
              <Reveal key={title} delay={(i%2)*80} className="h-full">
                <div className="feat h-full flex items-start gap-4 text-left bg-[#0d0d0d] rounded-2xl p-6 border border-zinc-800">
                  <span className="text-2xl mt-0.5 flex-shrink-0">{icon}</span>
                  <div><h3 className="font-bold text-base mb-1.5">{title}</h3><p className="text-sm text-zinc-400 leading-6">{desc}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══ FAQ ══════════════════════════════════════════════ */}
        <section className="flex flex-col items-center text-center px-6 py-28 gap-14 max-w-5xl mx-auto w-full">
          <Reveal><SectionLabel>FAQ</SectionLabel>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Common questions</h2>
          </Reveal>
          <Reveal delay={100} className="w-full"><FAQ /></Reveal>
        </section>

        <Divider />

        {/* ══ EMAIL CAPTURE ════════════════════════════════════ */}
        <section className="relative flex flex-col items-center text-center px-6 py-28 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{background:"radial-gradient(ellipse at center,rgba(249,115,22,.07) 0%,transparent 70%)"}} />
          <Reveal className="relative z-10 flex flex-col items-center gap-5 w-full max-w-lg">
            <SectionLabel>Early access</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Be the first to know when<br /><span className="text-orange-400">RunCheck launches</span>
            </h2>
            <p className="text-zinc-400 text-base leading-7 max-w-sm">
              Join early players and get access before everyone else.
            </p>

            {earlyEmailSent ? (
              <motion.div
                initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.3}}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-full px-7 py-4 text-sm text-green-400 font-semibold"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                You&apos;re on the list — we&apos;ll be in touch!
              </motion.div>
            ) : (
              <form onSubmit={handleEarlyAccess} className="flex flex-col sm:flex-row gap-3 w-full mt-1">
                <motion.input
                  whileFocus={{borderColor:"rgba(249,115,22,.6)",boxShadow:"0 0 0 3px rgba(249,115,22,.12)"}}
                  transition={{duration:.15}}
                  type="email"
                  value={earlyEmail}
                  onChange={e => setEarlyEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-4 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
                />
                <motion.button
                  whileHover={{scale:1.03,boxShadow:"0 0 28px rgba(249,115,22,.45)"}}
                  whileTap={{scale:.97}}
                  transition={{duration:.15}}
                  type="submit"
                  disabled={earlyEmailLoading}
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full px-7 py-4 text-sm transition-colors flex-shrink-0 shadow-[0_0_20px_rgba(249,115,22,.25)] disabled:opacity-60"
                >
                  {earlyEmailLoading ? "Sending…" : "Get early access"}
                </motion.button>
              </form>
            )}
            <p className="text-[10px] text-zinc-600">No spam. Just your spot in line.</p>
          </Reveal>
        </section>

        <Divider />

        {/* ══ FINAL CTA ════════════════════════════════════════ */}
        <section className="relative flex flex-col items-center text-center px-6 py-36 gap-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{background:"radial-gradient(ellipse at center,rgba(249,115,22,.1) 0%,transparent 65%)"}} />
          <Reveal className="relative z-10 flex flex-col items-center gap-6 max-w-xl">
            <span className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 rounded-full px-4 py-1.5 text-xs font-semibold text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316] animate-pulse" />
              Runs are happening right now
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-tight">
              Don&apos;t show up to<br /><span className="text-orange-400">empty gyms</span> again
            </h2>
            <p className="text-zinc-400 text-base leading-7 max-w-sm">Download RunCheck and always know where the run is — before you leave the house.</p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              {emailSent?(
                <div className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3.5 text-sm text-green-400 font-semibold">✓ You&apos;re on the list</div>
              ):(
                <>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-5 py-3.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors" />
                  <button type="submit" className="bg-white text-black font-bold rounded-full px-6 py-3.5 text-sm hover:bg-zinc-200 transition-colors flex-shrink-0">Notify me</button>
                </>
              )}
            </form>
            <a href="#" className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-10 py-4 text-base font-bold text-white transition-all shadow-[0_0_40px_rgba(249,115,22,.3)] hover:shadow-[0_0_60px_rgba(249,115,22,.45)]">
              Download App
            </a>
          </Reveal>
        </section>

        <Footer />
      </div>
    </>
  );
}
