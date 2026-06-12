"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ChromeBackground } from "../components/ChromeBackground";

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Image */}
        <motion.img
          src={src}
          alt={alt}
          className="relative z-10 max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// ── Tier data ────────────────────────────────────────────────────────────────

const TIERS = [
  {
    name: "Starter",
    color: "#60A5FA",
    badge: "⭐",
    price: "$10 / mo",
    billing: "$20 for 3 months",
    perks: [
      "Listed in the Partner Marketplace by category",
      "Profile page with offer, description & contact links",
      "Show up in Browse by Category results",
      "Basic analytics: profile views & offer views",
    ],
  },
  {
    name: "Growth",
    color: "#F97316",
    badge: "🔥",
    price: "$25 / mo",
    billing: "$50 for 3 months",
    highlight: true,
    perks: [
      "Everything in Starter, plus:",
      "Featured offer card on the Marketplace home screen",
      "Higher placement in all category lists",
      "Full analytics dashboard: clicks, calls, directions, promo reveals",
      "Monthly performance report with engagement funnel",
      "Logo displayed at top of marketplace",
    ],
  },
  {
    name: "Exclusive",
    color: "#FFD700",
    badge: "👑",
    price: "$50 / mo",
    billing: "$90 for 3 months",
    perks: [
      "Everything in Growth, plus:",
      "One push notification/month to users in your city",
      "City-level exclusivity in your category (no competitor listed)",
      "First placement when the app opens",
      "Dedicated RunCheck co-marketing on social media",
      "Direct access to the RunCheck team for campaign planning",
    ],
  },
];

// ── Analytics stat cards ─────────────────────────────────────────────────────

const STATS = [
  { value: "12,480", label: "Marketplace visits tracked", icon: "👀", color: "#60A5FA" },
  { value: "1,847",  label: "Profile views (demo partner)", icon: "📍", color: "#F97316" },
  { value: "934",    label: "Offer views recorded", icon: "🏷️", color: "#34D399" },
  { value: "412",    label: "Website clicks driven", icon: "🌐", color: "#A78BFA" },
  { value: "341",    label: "Promo code reveals", icon: "📋", color: "#FBBF24" },
  { value: "203",    label: "Directions clicks", icon: "📍", color: "#2DD4BF" },
];

// ── What you get breakdown ───────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: "👀",
    title: "Be Seen Every Time Players Open RunCheck",
    desc: "Your brand lives inside the Player Perks section on the home screen. Every time a player opens the app to find a run, your offer is right there — not buried in a search result, not competing with a feed algorithm.",
    img: "/sponsor-assets/seen-3.png",
    alt: "RunCheck home screen showing Player Perks section",
  },
  {
    icon: "📲",
    title: "Your Own Profile in the Partner Marketplace",
    desc: "Sponsors get a full partner profile page inside RunCheck: logo, tagline, description, exclusive offer, and direct action buttons — website, Instagram, phone, email, and directions. Players tap directly from the app into your world.",
    img: "/sponsor-assets/seen-5.png",
    alt: "RunCheck partner profile page",
  },
  {
    icon: "🏪",
    title: "Category Placement in the Marketplace",
    desc: "Players browse the Marketplace by category — Gyms, Trainers, Leagues, Recovery, Barbers, Food, Apparel, and more. Your business shows up exactly where the right audience is looking.",
    img: "/sponsor-assets/seen-1.png",
    alt: "RunCheck Partner Marketplace category browse",
  },
  {
    icon: "📊",
    title: "See Real Results From Your Sponsorship",
    desc: "No guessing. Premium and Exclusive sponsors get access to a live analytics dashboard showing profile views, offer clicks, website visits, phone calls, Instagram taps, promo reveals, and more — tracked per month with a 6-month trend chart.",
    img: "/sponsor-assets/growth.png",
    alt: "RunCheck Partner Analytics dashboard",
  },
  {
    icon: "📞",
    title: "Drive Calls, Emails & Social Media Traffic",
    desc: "Every partner profile includes call-to-action buttons players can tap instantly: call your number, send you an email, follow on Instagram, get directions, or visit your website. High-intent actions tracked in real time.",
    img: "/sponsor-assets/drive.png",
    alt: "RunCheck partner profile action buttons",
  },
];

// ── Categories you can sponsor ───────────────────────────────────────────────

const CATEGORIES = [
  { icon: "🏋️", label: "Gyms & Fitness" },
  { icon: "🏀", label: "Trainers & Coaches" },
  { icon: "🏆", label: "Leagues & Tournaments" },
  { icon: "💆", label: "Recovery & Wellness" },
  { icon: "✂️", label: "Barbers" },
  { icon: "📹", label: "Sports Media" },
  { icon: "🍔", label: "Food & Drink" },
  { icon: "👟", label: "Apparel & Gear" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Sponsors() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox(null);

  const [form, setForm] = useState({
    businessName: "", contactName: "", email: "", phone: "",
    category: "", otherCategory: "", tier: "", city: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function setField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const payload = {
        ...form,
        category: form.category === "Other" && form.otherCategory.trim()
          ? `Other: ${form.otherCategory.trim()}`
          : form.category,
      };
      const res = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setFormStatus("success");
      setForm({ businessName: "", contactName: "", email: "", phone: "", category: "", otherCategory: "", tier: "", city: "" });
    } catch {
      setFormStatus("error");
    }
  }

  function scrollToForm() {
    document.getElementById("sponsor-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sp-title { animation: fadeUp .85s cubic-bezier(.16,1,.3,1) .1s both; }
        .sp-sub   { animation: fadeUp .85s cubic-bezier(.16,1,.3,1) .25s both; }
        .sp-cta   { animation: fadeUp .85s cubic-bezier(.16,1,.3,1) .4s both; }
        .tier-highlight {
          background: linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.04) 100%);
        }
        .phone-img {
          width: 100%;
          max-width: 420px;
          border-radius: 24px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06);
        }
      `}</style>

      <div className="bg-black text-white min-h-screen relative">
        <ChromeBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Nav activePath="/sponsors" />

          {/* ── Hero ──────────────────────────────────────────────────── */}
          <section className="relative flex flex-col items-center justify-center text-center px-6 pt-44 pb-28 overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <p className="sp-sub text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-5">
                Partner with RunCheck
              </p>
              <h1 className="sp-title text-5xl sm:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
                Put your brand in front<br className="hidden sm:block" /> of Austin's hoopers
              </h1>
              <p className="sp-sub text-zinc-400 text-lg leading-8 max-w-xl mx-auto mb-10">
                RunCheck is the pickup basketball app launching in Austin. We're opening a limited number of sponsor spots to local businesses who want to reach an active, engaged, sports-obsessed audience.
              </p>
              <div className="sp-cta flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:hello@theruncheck.app?subject=RunCheck Sponsorship Inquiry"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-10 py-4 text-base font-bold text-white transition-all shadow-[0_0_32px_rgba(249,115,22,.35)] hover:shadow-[0_0_48px_rgba(249,115,22,.5)]"
                >
                  Get Sponsor Info →
                </a>
                <a
                  href="https://instagram.com/run.check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700 hover:border-zinc-500 px-8 py-4 text-base font-medium text-zinc-300 hover:text-white transition-all"
                >
                  DM Us on Instagram
                </a>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── "Looking for Sponsors" visual ─────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full flex flex-col lg:flex-row items-center gap-14">
            <Reveal className="flex-shrink-0 flex justify-center w-full lg:w-auto">
              <img
                src="/sponsor-assets/looking.png"
                alt="RunCheck — Looking for Sponsors"
                className="phone-img cursor-zoom-in"
                style={{ maxWidth: 380 }}
                onClick={() => openLightbox("/sponsor-assets/looking.png", "RunCheck — Looking for Sponsors")}
              />
            </Reveal>
            <Reveal delay={100} className="flex flex-col gap-6 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">Why sponsor RunCheck</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                Real players. Real runs.<br />Real results.
              </h2>
              <p className="text-zinc-400 text-base leading-8">
                Pickup basketball players are some of the most loyal, community-driven athletes around. They show up multiple times a week, spend money on their game, and trust recommendations from within the culture. RunCheck puts your business directly inside that culture — not as an ad they skip, but as a partner they actually want.
              </p>
              <p className="text-zinc-400 text-base leading-8">
                We're not selling banner ads. We're giving sponsors a real presence inside an app that players open every time they want to find a run. That's high-frequency, high-intent exposure to a hyper-local audience that's hard to reach anywhere else.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">Launching in Austin — limited spots available</p>
              </div>
            </Reveal>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Stats ─────────────────────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">The numbers</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">
                Every action tracked. Every click counted.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {STATS.map(({ value, label, icon, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#0d0d0d] rounded-2xl p-6 border border-zinc-800 flex flex-col gap-2"
                  >
                    <span className="text-2xl">{icon}</span>
                    <p className="text-3xl font-extrabold tracking-tight" style={{ color }}>{value}</p>
                    <p className="text-zinc-500 text-sm leading-5">{label}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-xs text-zinc-600 mt-6 text-center">
                Sample data from the RunCheck analytics dashboard. Premium & Exclusive sponsors get full access to their own live metrics.
              </p>
            </Reveal>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Benefits (alternating layout with phone screenshots) ───── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full flex flex-col gap-28">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">What you get</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Everything a sponsor needs to win
              </h2>
            </Reveal>

            {BENEFITS.map(({ icon, title, desc, img, alt }, i) => (
              <Reveal key={title} delay={80}>
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-16`}>
                  {/* Phone screenshot */}
                  <div className="flex-shrink-0 flex justify-center w-full lg:w-auto">
                    <img
                      src={img}
                      alt={alt}
                      className="phone-img cursor-zoom-in"
                      onClick={() => openLightbox(img, alt)}
                    />
                  </div>
                  {/* Text */}
                  <div className="flex flex-col gap-4 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-xl flex-shrink-0">
                      {icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">{title}</h3>
                    <p className="text-zinc-400 text-base leading-8">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Marketplace screenshot gallery ─────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Inside the app</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">
                The Partner Marketplace
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex gap-6 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
                {[
                  { src: "/sponsor-assets/seen-1.png", caption: "Browse by category" },
                  { src: "/sponsor-assets/seen-2.png", caption: "Featured offers" },
                  { src: "/sponsor-assets/seen-4.png", caption: "Category results" },
                  { src: "/sponsor-assets/seen-5.png", caption: "Full partner profile" },
                ].map(({ src, caption }) => (
                  <div key={src} className="flex flex-col items-center gap-3 flex-shrink-0 snap-start" style={{ width: "clamp(260px, 36vw, 400px)" }}>
                    <img
                      src={src}
                      alt={caption}
                      className="w-full rounded-2xl cursor-zoom-in"
                      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}
                      onClick={() => openLightbox(src, caption)}
                    />
                    <p className="text-zinc-500 text-sm text-center">{caption}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Categories ────────────────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Who should sponsor</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                We work with any local business that serves athletes
              </h2>
              <p className="text-zinc-400 text-base leading-8 max-w-2xl mb-10">
                If your customers play sports, stay active, or spend time in the community — RunCheck puts you in the right room.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES.map(({ icon, label }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 bg-[#0d0d0d] rounded-xl p-4 border border-zinc-800"
                  >
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <p className="text-sm font-semibold text-zinc-300">{label}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Tiers ─────────────────────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Sponsorship tiers</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Pick the level that fits your goals
              </h2>
              <p className="text-zinc-400 text-base leading-8 max-w-xl mb-12">
                Simple, transparent pricing. Every sponsor gets a real presence — not just a logo in a corner.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TIERS.map(({ name, color, badge, price, billing, highlight, perks }) => (
                <Reveal key={name} delay={80}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22 }}
                    className={`relative flex flex-col gap-5 rounded-2xl p-7 border h-full ${
                      highlight
                        ? "tier-highlight border-orange-500/50"
                        : "bg-[#0d0d0d] border-zinc-800"
                    }`}
                  >
                    {highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-orange-500 text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{badge}</span>
                      <div>
                        <p className="text-2xl font-extrabold tracking-tight" style={{ color }}>
                          {price}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">or {billing}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight -mt-2">{name}</h3>
                    <div className="w-full h-px" style={{ backgroundColor: `${color}30` }} />
                    <ul className="flex flex-col gap-3">
                      {perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${color}20` }}>
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5L7 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="text-sm text-zinc-400 leading-6">{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-4">
                      <button
                        onClick={scrollToForm}
                        className="block w-full text-center rounded-full py-3 text-sm font-bold transition-all cursor-pointer"
                        style={{
                          backgroundColor: highlight ? "#F97316" : "transparent",
                          color: highlight ? "#fff" : color,
                          border: highlight ? "none" : `1.5px solid ${color}`,
                        }}
                      >
                        Get Started →
                      </button>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── How it works for sponsors ─────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Getting started</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-12">
                Up and running in three steps
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Reach out",
                  desc: "DM us on Instagram or send an email. We'll walk you through the options and find the right fit for your business.",
                },
                {
                  step: "02",
                  title: "We build your profile",
                  desc: "You send us your logo, offer, description, and links. We set up your Partner Marketplace profile and get it live.",
                },
                {
                  step: "03",
                  title: "Players start finding you",
                  desc: "Your business is live in the app. Players see your offer, tap your profile, and take action — and you can watch the analytics in real time.",
                },
              ].map(({ step, title, desc }) => (
                <Reveal key={step} delay={80}>
                  <div className="flex flex-col gap-4 bg-[#0d0d0d] rounded-2xl p-7 border border-zinc-800 h-full">
                    <p className="text-4xl font-extrabold tracking-tighter text-orange-500/30">{step}</p>
                    <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
                    <p className="text-sm text-zinc-400 leading-7">{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Sponsor Intake Form ───────────────────────────────────── */}
          <section id="sponsor-form" className="max-w-2xl mx-auto px-6 py-20 w-full">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Apply to become a sponsor</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Tell us about your business
              </h2>
              <p className="text-zinc-400 text-base leading-8 mb-10">
                Fill out the form below and we'll follow up within 24–48 hours to get you set up.
              </p>
            </Reveal>

            {formStatus === "success" ? (
              <Reveal>
                <div className="bg-[#0d0d0d] border border-green-500/40 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center text-3xl">✅</div>
                  <h3 className="text-2xl font-extrabold tracking-tight">We got your info!</h3>
                  <p className="text-zinc-400 text-base leading-7 max-w-sm">
                    Thanks for reaching out. We'll follow up at your email within 24–48 hours.
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={80}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Row 1: business + contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Business Name *</label>
                      <input
                        type="text"
                        required
                        value={form.businessName}
                        onChange={(e) => setField("businessName", e.target.value)}
                        placeholder="Austin Hoops Co."
                        className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={form.contactName}
                        onChange={(e) => setField("contactName", e.target.value)}
                        placeholder="Your name"
                        className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: email + phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setField("email", e.target.value)}
                        placeholder="you@business.com"
                        className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        placeholder="(512) 555-0100"
                        className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 3: category + tier */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Business Category *</label>
                      <select
                        required
                        value={form.category}
                        onChange={(e) => setField("category", e.target.value)}
                        className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/60 transition-colors appearance-none"
                      >
                        <option value="" disabled>Select a category</option>
                        <option value="Gyms & Fitness">Gyms & Fitness</option>
                        <option value="Trainers & Coaches">Trainers & Coaches</option>
                        <option value="Leagues & Tournaments">Leagues & Tournaments</option>
                        <option value="Recovery & Wellness">Recovery & Wellness</option>
                        <option value="Barbers">Barbers</option>
                        <option value="Sports Media">Sports Media</option>
                        <option value="Food & Drink">Food & Drink</option>
                        <option value="Apparel & Gear">Apparel & Gear</option>
                        <option value="Other">Other</option>
                      </select>
                      {form.category === "Other" && (
                        <input
                          type="text"
                          required
                          value={form.otherCategory}
                          onChange={(e) => setField("otherCategory", e.target.value)}
                          placeholder="Describe your business type"
                          className="mt-2 bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Tier Interest *</label>
                      <select
                        required
                        value={form.tier}
                        onChange={(e) => setField("tier", e.target.value)}
                        className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/60 transition-colors appearance-none"
                      >
                        <option value="" disabled>Select a tier</option>
                        <option value="Starter ($10/mo)">⭐ Starter — $10/mo</option>
                        <option value="Growth ($25/mo)">🔥 Growth — $25/mo</option>
                        <option value="Exclusive ($50/mo)">👑 Exclusive — $50/mo</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: target city */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Target City *</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setField("city", e.target.value)}
                      placeholder="Austin, TX"
                      className="bg-[#0d0d0d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
                    />
                  </div>

                  {formStatus === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Try emailing us directly at hello@theruncheck.app.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed px-10 py-4 text-base font-bold text-white transition-all shadow-[0_0_32px_rgba(249,115,22,.3)] hover:shadow-[0_0_48px_rgba(249,115,22,.45)] mt-2"
                  >
                    {formStatus === "submitting" ? "Sending…" : "Submit Inquiry →"}
                  </button>
                </form>
              </Reveal>
            )}
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Final CTA ─────────────────────────────────────────────── */}
          <section className="flex flex-col items-center text-center px-6 py-28 gap-7">
            <Reveal className="flex flex-col items-center gap-6 max-w-2xl">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-3xl">
                🏀
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to reach Austin's<br className="hidden sm:block" /> basketball community?
              </h2>
              <p className="text-zinc-400 text-base leading-8 max-w-lg">
                Spots are limited. We're keeping the sponsor list small so every partner gets real visibility — not lost in a crowd. If this sounds like your kind of marketing, let's talk.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="mailto:hello@theruncheck.app?subject=RunCheck Sponsorship Inquiry"
                  className="inline-flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 px-10 py-4 text-base font-bold text-white transition-all shadow-[0_0_32px_rgba(249,115,22,.35)] hover:shadow-[0_0_48px_rgba(249,115,22,.5)]"
                >
                  Email Us to Get Started →
                </a>
                <a
                  href="https://instagram.com/run.check"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-700 hover:border-zinc-500 px-8 py-4 text-base font-medium text-zinc-300 hover:text-white transition-all"
                >
                  DM on Instagram
                </a>
              </div>
              <p className="text-xs text-zinc-600 pt-2">
                🏀 Austin, TX · RunCheck is currently in pre-launch · Sponsorship locked in before launch = best placement
              </p>
            </Reveal>
          </section>

          <Footer />
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />}
    </>
  );
}
