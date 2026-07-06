"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Spin Wheel", href: "/spin-wheel" },
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
            <Image src="/runcheck-logo.png" alt="RunCheck" width={512} height={512} priority className="h-16 w-auto" />
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
              href="https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <svg viewBox="0 0 814 1000" className="w-4 h-4 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.8 0 663.6 0 541.1c0-204.8 133.4-313.1 264.8-313.1 70.2 0 128.6 42.8 170.8 42.8 40.4 0 107-46.7 183.9-46.7zm-155.9-210.1c31.8-39.7 54.3-95.7 54.3-151.7 0-8.1-.6-16.2-2-23.1-51.2 1.9-112.3 34.2-149.2 75.8-28.5 32.4-55.1 88.4-55.1 145.5 0 8.7 1.4 17.4 2 20.1 3.2.6 8.4 1.3 13.6 1.3 46.1 0 101.3-30.9 136.4-67.9z"/>
              </svg>
              Download the App
            </a>
          </div>

          {/* Mobile: download + hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <a
              href="https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black rounded-full px-4 py-2 text-sm font-bold transition-all hover:bg-zinc-100"
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
