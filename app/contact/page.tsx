"use client";

import { motion } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

const PRIVACY_URL = "/privacy";

const contactMethods = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@theruncheck.app",
    href: "mailto:hello@theruncheck.app",
    desc: "Best for general inquiries, partnerships, or feedback.",
    cta: "Send an email",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "(517) 944-1431",
    href: "tel:+15179441431",
    desc: "Prefer to talk? Give us a call during business hours.",
    cta: "Call now",
  },
  {
    icon: "🔒",
    label: "Privacy Policy",
    value: "View our Privacy Policy",
    href: PRIVACY_URL,
    desc: "Learn how we handle your data and protect your privacy.",
    cta: "Read privacy policy",
    },
];

export default function Contact() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .ct-title{animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .1s both}
        .ct-sub  {animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .25s both}
      `}</style>
      <div className="bg-black text-white flex flex-col min-h-screen">
        <Nav activePath="/contact" />

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-25"
            style={{background:"radial-gradient(ellipse,rgba(249,115,22,.45) 0%,transparent 70%)"}} />
          <div className="relative z-10 max-w-xl">
            <p className="ct-sub text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-5">Contact</p>
            <h1 className="ct-title text-5xl sm:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
              Get in touch
            </h1>
            <p className="ct-sub text-zinc-400 text-lg leading-8 max-w-md mx-auto">
              Have a question, idea, or just want to talk ball? We'd love to hear from you.
            </p>
          </div>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* ── Contact cards ────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {contactMethods.map(({ icon, label, value, href, desc, cta }, i) => (
              <Reveal key={label} delay={i * 100}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(249,115,22,.35)" }}
                  transition={{ duration: .2 }}
                  className="flex flex-col gap-5 bg-[#0d0d0d] rounded-2xl p-7 border border-zinc-800 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-2xl">
                    {icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">{label}</p>
                    <p className="text-white font-bold text-base">{value}</p>
                  </div>
                  <p className="text-sm text-zinc-400 leading-6 flex-1">{desc}</p>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors group"
                  >
                    {cta}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="w-full border-t border-zinc-800/60" />

        {/* ── Also find us ─────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 py-20 w-full flex flex-col gap-8">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-3">Based in</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Austin, Texas</h2>
            <p className="text-zinc-400 text-base leading-8 max-w-lg mt-4">
              RunCheck is built in Austin, TX — home to some of the best pickup basketball communities in the country. We're local, we're players, and we're building for the culture.
            </p>
          </Reveal>
        </section>

        <Footer />
      </div>
    </>
  );
}
