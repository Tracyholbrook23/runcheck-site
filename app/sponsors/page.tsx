"use client";

/**
 * /sponsors - "Partner with RunCheck"
 *
 * 2026-11-01: The paid Player Perks marketplace (tiers, featured offers,
 * category browse) is on hold. The app now shows a simple "Our Partners"
 * section, so this page matches it: current partners, what a partner gets
 * today, and an interest form. No pricing on the page; options are shared
 * after we talk. The app links here at /sponsors#partner-form.
 */

import { useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import {
  Home,
  Smartphone,
  BarChart3,
  Dumbbell,
  Trophy,
  HeartPulse,
  Shirt,
  GraduationCap,
  Store,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

// ── Current partners (matches the "partners" collection in Firestore) ─────────
// Logos are copies saved in public/partner-logos.

const PARTNERS = [
  {
    name: "Chill-Wil Air",
    tagline: "Comfort You Can Afford. Service You Can Trust.",
    about: "Commercial and residential HVAC and electrical services throughout Texas.",
    logo: "/partner-logos/chill-wil-air.jpg",
    url: "https://chillwilair.com",
  },
  {
    name: "D-Choice Retail",
    tagline: "Your Everyday Essentials, All In One Place.",
    about: "Groceries, household essentials, beauty products, electronics and more at competitive prices.",
    logo: "/partner-logos/d-choice-retail.png",
    url: "https://d-choiceretail.com",
  },
];

// ── What a partner gets today (keep in sync with the app) ─────────────────────

const BENEFITS = [
  {
    icon: Home,
    title: "A spot on the home screen",
    desc: "Partners are listed in the Our Partners section on the RunCheck home screen, the first thing players see when they open the app to find a run.",
  },
  {
    icon: Smartphone,
    title: "Your own page in the app",
    desc: "Logo, photos, a short about section, and buttons that send players straight to your website, phone, email, Instagram or directions.",
  },
  {
    icon: BarChart3,
    title: "Real numbers",
    desc: "We track views of your page and every tap on those buttons, and we share the results with you so you can see what the partnership is doing.",
  },
];

const WHO = [
  { icon: Dumbbell, label: "Gyms and trainers" },
  { icon: Trophy, label: "Leagues and tournaments" },
  { icon: HeartPulse, label: "Recovery and wellness" },
  { icon: Shirt, label: "Basketball brands and gear" },
  { icon: GraduationCap, label: "Training programs and apps" },
  { icon: Store, label: "Local businesses" },
];

const STEPS = [
  { step: "01", title: "Tell us about your business", desc: "Fill out the form below. It takes about a minute." },
  { step: "02", title: "We talk", desc: "We reach out within a few days to learn about your business and walk you through how it works." },
  { step: "03", title: "You go live", desc: "We build your page in the app and put you in front of players." },
];

const CATEGORIES = [
  "Gym or fitness",
  "Trainer or coach",
  "League or tournament",
  "Recovery or wellness",
  "Basketball brand or gear",
  "Training program or app",
  "Food and drink",
  "Barber",
  "Other local business",
];

const inputClass =
  "bg-zinc-900 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/60 transition";
const labelClass = "text-xs font-semibold text-zinc-400 uppercase tracking-widest";

export default function Sponsors() {
  const empty = { businessName: "", contactName: "", email: "", phone: "", category: "", website: "", city: "", message: "" };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const setField = (field: keyof typeof empty, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/sponsor-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm(empty);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="era-subpage bg-black text-white min-h-screen relative">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Nav activePath="/sponsors" />

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="flex flex-col items-center text-center px-6 pt-44 pb-24">
          <Reveal className="max-w-3xl flex flex-col items-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-5">Partner with RunCheck</p>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
              Back the hoopers<br className="hidden sm:block" /> in your city
            </h1>
            <p className="text-zinc-400 text-lg leading-8 max-w-xl mb-10">
              RunCheck is the free app Austin players use to find pickup runs. Our partners live inside the app, so
              the players who show up every week can find them, call them and visit them.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#partner-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-400 px-10 py-4 text-base font-bold text-white transition-colors"
              >
                Become a partner <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
              <a
                href="https://instagram.com/run.check"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 hover:bg-zinc-800 px-8 py-4 text-base font-semibold text-white transition-colors"
              >
                DM us on Instagram
              </a>
            </div>
          </Reveal>
        </section>

        {/* ── Our partners ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16 w-full">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Our partners</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">The businesses behind RunCheck</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PARTNERS.map((p) => (
              <Reveal key={p.name} delay={80}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-5 bg-zinc-900 hover:bg-zinc-800/80 rounded-3xl p-7 h-full transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.logo} alt={`${p.name} logo`} className="w-16 h-16 rounded-2xl object-cover bg-white flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="text-xl font-extrabold tracking-tight">{p.name}</h3>
                      <p className="text-sm text-zinc-400 leading-6">{p.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 leading-7">{p.about}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-bold text-orange-400 group-hover:text-orange-300">
                    Visit website <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── What partners get ─────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16 w-full">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">What partners get</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">A real presence, not a banner ad</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <Reveal key={title} delay={80}>
                <div className="flex flex-col gap-4 bg-zinc-900 rounded-3xl p-7 h-full">
                  <div className="w-11 h-11 rounded-2xl bg-orange-500 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-7">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Who we work with ──────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16 w-full">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Who we work with</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Local businesses and basketball brands</h2>
            <p className="text-zinc-400 text-base leading-8 max-w-2xl mb-10">
              If your customers play ball, train, or spend time in the community, you belong in front of RunCheck players.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {WHO.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 bg-zinc-900 rounded-2xl p-4">
                  <Icon className="w-5 h-5 flex-shrink-0 text-orange-400" strokeWidth={1.75} />
                  <p className="text-sm font-semibold text-zinc-300">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── How it works ──────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-16 w-full">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">Three simple steps</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STEPS.map(({ step, title, desc }) => (
              <Reveal key={step} delay={80}>
                <div className="flex flex-col gap-3 bg-zinc-900 rounded-3xl p-7 h-full">
                  <p className="text-4xl font-extrabold tracking-tighter text-orange-500">{step}</p>
                  <h3 className="text-xl font-extrabold tracking-tight">{title}</h3>
                  <p className="text-sm text-zinc-400 leading-7">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Interest form ─────────────────────────────────────────── */}
        <section id="partner-form" className="max-w-2xl mx-auto px-6 py-20 w-full scroll-mt-24">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-2">Become a partner</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">Tell us about your business</h2>
            <p className="text-zinc-400 text-base leading-8 mb-10">
              We will follow up within a few days to talk through options. No commitment.
            </p>
          </Reveal>

          {status === "success" ? (
            <div className="bg-zinc-900 rounded-3xl p-10 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-green-400" strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">We got your info!</h3>
              <p className="text-zinc-400 text-base leading-7 max-w-sm">Thanks for reaching out. We will be in touch at your email soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Business name *</label>
                  <input type="text" required value={form.businessName} onChange={(e) => setField("businessName", e.target.value)} placeholder="Austin Hoops Co." className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Your name *</label>
                  <input type="text" required value={form.contactName} onChange={(e) => setField("contactName", e.target.value)} placeholder="First and last name" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@business.com" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="(512) 555-0100" className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Type of business *</label>
                  <select required value={form.category} onChange={(e) => setField("category", e.target.value)} className={`${inputClass} appearance-none`}>
                    <option value="" disabled>Select one</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className={labelClass}>City or area *</label>
                  <input type="text" required value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder="Austin, TX or Online" className={inputClass} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Website or Instagram</label>
                <input type="text" value={form.website} onChange={(e) => setField("website", e.target.value)} placeholder="yourbusiness.com or @yourbusiness" className={inputClass} />
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClass}>Anything else?</label>
                <textarea rows={4} value={form.message} onChange={(e) => setField("message", e.target.value)} placeholder="What you do and what you are hoping to get out of a partnership" className={`${inputClass} resize-none`} />
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm">Something went wrong. You can email us directly at hello@theruncheck.app.</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-60 disabled:cursor-not-allowed px-10 py-4 text-base font-bold text-white transition-colors mt-2"
              >
                {status === "submitting" ? "Sending..." : (<>Send <ArrowRight className="w-4 h-4" strokeWidth={2.5} /></>)}
              </button>
            </form>
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}
