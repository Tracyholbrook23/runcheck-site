"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";

const APP_STORE_URL = "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/sponsors" },
  { label: "Updates", href: "/updates" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
];


/**
 * Ambient scroll feedback: the mark spins at a slow resting speed and
 * spins up in proportion to scroll velocity, easing back down once the
 * page settles -- same "always live" signal used for the nav mark in the
 * Era Residence scroll-choreography reference.
 */
function SpinningMark() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 110, damping: 28, mass: 0.5 });
  const rotate = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const dt = delta / 1000;
    const idleDegPerSec = 14; // gentle rest spin
    const boost = Math.min(Math.abs(smoothVelocity.get()) * 0.06, 340); // spins up on hard flicks
    rotate.set(rotate.get() + (idleDegPerSec + boost) * dt);
  });

  return (
    <motion.div style={{ rotate: reduced ? 0 : rotate }} className="rc-gnav-mark">
      <Image src="/runcheck-logo.png" alt="RunCheck" width={512} height={512} priority />
    </motion.div>
  );
}

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
    <nav className={`rc-gnav${scrolled ? " is-scrolled" : ""}`} aria-label="Main">
      <div className="rc-gnav-row">
        <Link href="/" className="rc-gnav-logo" aria-label="RunCheck home">
          <SpinningMark />
        </Link>

        <div className="rc-gnav-right">
          <div className="rc-gnav-glass rc-gnav-links">
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} className={activePath === href ? "is-active" : ""} aria-current={activePath === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </div>
          <a className="rc-gnav-action" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 814 1000" aria-hidden="true">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.8 0 663.6 0 541.1c0-204.8 133.4-313.1 264.8-313.1 70.2 0 128.6 42.8 170.8 42.8 40.4 0 107-46.7 183.9-46.7zm-155.9-210.1c31.8-39.7 54.3-95.7 54.3-151.7 0-8.1-.6-16.2-2-23.1-51.2 1.9-112.3 34.2-149.2 75.8-28.5 32.4-55.1 88.4-55.1 145.5 0 8.7 1.4 17.4 2 20.1 3.2.6 8.4 1.3 13.6 1.3 46.1 0 101.3-30.9 136.4-67.9z" />
            </svg>
            <span className="rc-gnav-action-long">Download the App</span>
            <span className="rc-gnav-action-short">Get the app</span>
          </a>
          <button className="rc-gnav-glass rc-gnav-burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span className={menuOpen ? "is-open" : ""} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="rc-gnav-glass rc-gnav-menu"
          >
            {navLinks.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={activePath === href ? "is-active" : ""}>
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
