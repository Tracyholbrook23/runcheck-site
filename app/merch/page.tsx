"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";

// ── Product catalog ──────────────────────────────────────────────────────
// Edit this list to add, remove, or reprice items. Once you have real
// product photos, drop them in /public/merch/ and set `image` to the path
// (e.g. "/merch/logo-tee-black.jpg") — the card will use the photo instead
// of the placeholder art automatically.
type Category = "Tee" | "Hat";

type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  tag?: string;
  description: string;
  image?: string;
  // Set this once a product is actually purchasable (e.g. a live Fourthwall
  // product URL). When present, the card shows a real "Buy now" link out to
  // that store instead of the "Get notified" waitlist button.
  buyUrl?: string;
};

const PRODUCTS: Product[] = [
  {
    id: "logo-tee-black",
    name: "RunCheck Logo Tee — Black",
    category: "Tee",
    price: 32,
    tag: "COMING SOON",
    description: "Heavyweight cotton tee with the RunCheck wordmark across the chest. Built for the gym and the walk there.",
  },
  {
    id: "logo-tee-white",
    name: "RunCheck Logo Tee — White",
    category: "Tee",
    price: 32,
    tag: "COMING SOON",
    description: "Same cut, same weight — clean white colorway with the logo up front.",
  },
  {
    id: "snapback",
    name: "RunCheck Snapback Hat — Black",
    category: "Hat",
    price: 30,
    tag: "IN STOCK",
    description: "Structured mid-profile snapback with an embroidered RunCheck logo. Same silhouette as our original run.",
    buyUrl: "https://runcheck-shop.fourthwall.com/products/runcheck-snapback-hat-black",
    image: "/merch/snapback-black.jpg",
  },
  {
    id: "dad-hat",
    name: "RunCheck Dad Hat",
    category: "Hat",
    price: 26,
    tag: "COMING SOON",
    description: "Low-profile, unstructured fit — for after the run.",
  },
];

const FILTERS: Array<{ label: string; value: Category | "All" }> = [
  { label: "All", value: "All" },
  { label: "Tees", value: "Tee" },
  { label: "Hats", value: "Hat" },
];

// ── Placeholder product art ──────────────────────────────────────────────
// Shown until a real photo is set on a product. Keeps the grid looking
// finished instead of empty boxes while photos are being shot.
function PlaceholderArt({ category }: { category: Category }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
      <div className="absolute w-56 h-56 rounded-full bg-orange-500/10 blur-3xl" />
      {category === "Tee" ? (
        <svg viewBox="0 0 64 64" className="relative w-24 h-24 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M20 8 L8 16 L14 26 L20 22 V56 H44 V22 L50 26 L56 16 L44 8 Q38 14 32 14 Q26 14 20 8 Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 64 64" className="relative w-24 h-24 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M8 40 Q8 18 32 16 Q56 18 56 40" />
          <path d="M8 40 Q32 48 56 40" />
          <circle cx="32" cy="18" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      )}
      <span className="absolute bottom-4 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
        Photo coming soon
      </span>
    </div>
  );
}

function ProductCard({ product, delay, onNotify }: { product: Product; delay: number; onNotify: () => void }) {
  return (
    <Reveal delay={delay} variant="scale">
      <motion.div
        whileHover={{ y: -4, borderColor: "rgba(249,115,22,.35)" }}
        transition={{ duration: 0.2 }}
        className="flex flex-col bg-[#0d0d0d] rounded-2xl border border-zinc-800 overflow-hidden h-full"
      >
        <div className="relative aspect-square w-full">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          ) : (
            <PlaceholderArt category={product.category} />
          )}
          {product.tag && (
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                product.buyUrl
                  ? "bg-orange-500/15 border-orange-500/40 text-orange-300"
                  : "bg-zinc-900/90 border-zinc-700 text-zinc-300"
              }`}
            >
              {product.tag}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3 p-6 flex-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1.5">
              {product.category === "Tee" ? "Tees" : "Hats"}
            </p>
            <h3 className="text-white font-bold text-lg leading-snug">{product.name}</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-6 flex-1">{product.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-white font-bold text-lg">${product.price}</span>
            {product.buyUrl ? (
              <a
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-sm font-bold transition-all hover:bg-zinc-100 group"
              >
                Buy now
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            ) : (
              <button
                onClick={onNotify}
                className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors group"
              >
                Get notified
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ── Waitlist form ─────────────────────────────────────────────────────────
// Posts to the existing /api/subscribe route (already wired to Klaviyo —
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
            You&rsquo;re on the list — we&rsquo;ll email you the second merch drops.
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
  const [filter, setFilter] = useState<Category | "All">("All");
  const products = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  function scrollToWaitlist() {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

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

          {/* ── Hero ─────────────────────────────────────────────── */}
          <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-20 overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <p className="mc-sub text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-5">Merch</p>
              <h1 className="mc-title text-5xl sm:text-6xl font-extrabold tracking-tighter leading-tight mb-6">
                RunCheck Gear
              </h1>
              <p className="mc-sub text-zinc-400 text-lg leading-8 max-w-md mx-auto">
                Tees and hats for the pickup basketball community. The snapback is live now — more drops coming soon.
              </p>
            </div>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Filters + grid ───────────────────────────────────── */}
          <section className="max-w-5xl mx-auto px-6 py-20 w-full">
            <div className="flex items-center justify-center gap-2 mb-12">
              {FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                    filter === value
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product, i) => (
                <ProductCard key={product.id} product={product} delay={i * 80} onNotify={scrollToWaitlist} />
              ))}
            </div>
          </section>

          <div className="w-full border-t border-zinc-800/60" />

          {/* ── Waitlist ─────────────────────────────────────────── */}
          <section className="max-w-4xl mx-auto px-6 py-24 w-full flex flex-col items-center text-center gap-8">
            <Reveal className="flex flex-col items-center gap-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500">Be first</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-lg">
                Get notified when merch drops
              </h2>
              <p className="text-zinc-400 text-base leading-8 max-w-md">
                No spam, just one email the moment tees and hats go live.
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
