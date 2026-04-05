"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Nav({ activePath = "/" }: { activePath?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 640) setMenuOpen(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-black/95 backdrop-blur-md border-b border-zinc-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <img src="/runcheck-logo.png" alt="RunCheck" className="h-16 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-7 text-base font-medium">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  activePath === href
                    ? "text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="#"
              className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 py-2.5 text-base transition-colors font-bold shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_32px_rgba(249,115,22,0.45)]"
            >
              Download
            </a>
          </div>

          {/* Mobile: download + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <a
              href="#"
              className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-4 py-2 text-sm font-bold transition-colors"
            >
              Download
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden sm:hidden border-t border-zinc-800/60"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {navLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 text-base font-medium transition-colors ${
                      activePath === href
                        ? "text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
