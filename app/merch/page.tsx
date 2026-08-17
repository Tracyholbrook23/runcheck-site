"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

// Product gallery images. Order controls thumbnail order, first image is
// the default view shown on load.
const GALLERY = [
  { src: "/merch/snapback-black.jpg", alt: "RunCheck Snapback, front view" },
  { src: "/merch/snapback-black-model.jpg", alt: "RunCheck Snapback worn on model" },
  { src: "/merch/snapback-black-back.jpg", alt: "RunCheck Snapback, back view with strap" },
];

const DETAILS = [
  "Structured mid-profile fit with a curved brim",
  "RunCheck logo, embroidered, not printed",
  "Adjustable snapback strap, one size fits most",
  "Black colorway, matches the original run made at Lids",
];

const BUY_URL = "https://runcheck-shop.fourthwall.com/products/runcheck-snapback-hat-black";

function ProductGallery() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#0d0d0d] border border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none z-10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={GALLERY[active].src}
              alt={GALLERY[active].alt}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-3">
        {GALLERY.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setActive(i)}
            aria-label={`Show ${img.alt}`}
            className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
              active === i ? "border-orange-500" : "border-zinc-800 opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProductSpotlight() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-8 pb-24 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <Reveal variant="scale">
          <ProductGallery />
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col gap-6 lg:pt-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/40 text-orange-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                In stock now
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3">
                RunCheck Snapback
              </h1>
              <p className="text-zinc-400 text-lg leading-8">
                The same black snapback from the original run, now open to everyone. Structured
                mid-profile fit with a curved brim and the RunCheck logo stitched across the front.
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-white">$30</span>
              <span className="text-sm text-zinc-500">one size, adjustable strap</span>
            </div>

            <a
              href={BUY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-8 py-4 text-base font-bold transition-all hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98] group w-full sm:w-auto"
            >
              Buy now
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <div className="border-t border-zinc-800 pt-6 flex flex-col gap-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Details</p>
              <ul className="flex flex-col gap-2.5">
                {DETAILS.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 text-sm text-zinc-300">
                    <svg viewBox="0 0 20 20" className="w-4 h-4 mt-0.5 shrink-0 text-orange-500" fill="currentColor">
                      <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Posts to the existing /api/subscribe route (already wired to Klaviyo,
// see app/api/subscribe/route.ts), so signups land in the same list
// infrastructure used elsewhere on the site.
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div id="waitlist" className="scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 justify-center bg-orange-500/10 border border-orange-500/25 text-orange-300 rounded-full px-6 py-4 text-sm font-semibold max-w-md mx-auto"
          >
            You&rsquo;re on the list, we&rsquo;ll email you the second new gear drops.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 bg-[#0d0d0d] border border-zinc-800 rounded-full px-5 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 bg-white text-black rounded-full px-6 py-3.5 text-sm font-bold transition-all hover:bg-zinc-100 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "Joining…" : "Notify me"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p className="text-center text-sm text-red-400 mt-3">{errorMsg}</p>
      )}
    </div>
  );
}

export default function Merch() {
  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        .mc-title{animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .1s both}
        .mc-sub  {animation:fadeUp .85s cubic-bezier(.16,1,.3,1) .25s both}
      `}</style>
      <div className="bg-black text-white min-h-screen relative">
        <div className="relative z-10 flex flex-col min-h-screen">
          <Nav activePath="/merch" />

          {/* Hero */}
          <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-16 overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <p className="mc-sub text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-5">Merch</p>
              <h2 className="mc-title text-5xl sm:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
                RunCheck Gear
              </h2>
              <p className="mc-sub text-zinc-400 text-lg leading-8 max-w-md mx-auto">
                Gear for the pickup basketball community, made to actually wear on the court and off it.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          <ProductSpotlight />

          <div className="w-full border-t border-zinc-800/60" />

          {/* Waitlist */}
          <section className="max-w-4xl mx-auto px-6 py-24 w-full flex flex-col items-center text-center gap-8">
            <Reveal className="flex flex-col items-center gap-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">Be first</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-lg">
                Get notified when new gear drops
              </h2>
              <p className="text-zinc-400 text-base leading-8 max-w-md">
                No spam, just one email the moment new tees and hats go live.
              </p>
            </Reveal>
            <Reveal delay={100} className="w-full">
              <WaitlistForm />
            </Reveal>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
}
