"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

type Frame = (el: HTMLElement, r: DOMRect, vh: number) => void;

/* Runs a frame function on scroll and resize, at most once per animation frame. */
function useScrollFrame(ref: RefObject<HTMLElement | null>, frame: Frame) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh || r.top > vh * 2) return;
      frame(el, r, vh);
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    };
  }, [ref, frame]);
}

/* Hero: the photo drifts and darkens as you scroll past, and the text lifts away. */
const heroFrame: Frame = (el, r) => {
  el.style.setProperty("--p", clamp(-r.top / Math.max(1, r.height)).toFixed(4));
};

export function FullBleedHero({
  src,
  alt,
  pos = "50% 50%",
  short = false,
  children,
}: {
  src: string;
  alt: string;
  pos?: string;
  short?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollFrame(ref, heroFrame);
  return (
    <section ref={ref} className={`rc-fb-hero${short ? " is-short" : ""}`}>
      <div className="rc-fb-media">
        <Image src={src} alt={alt} fill sizes="100vw" preload style={{ objectPosition: pos }} />
      </div>
      <div className="rc-fb-shade" aria-hidden="true" />
      <div className="rc-fb-content">{children}</div>
    </section>
  );
}

/* Reveal: the photo opens from a rounded card to the full screen as it scrolls in. */
const revealFrame: Frame = (el, r, vh) => {
  const e = ease(clamp((vh - r.top) / vh));
  el.style.setProperty("--e", e.toFixed(4));
  el.style.setProperty("--t", seg(e, 0.55, 1).toFixed(4));
};

export function RevealPhoto({
  src,
  alt,
  pos = "50% 50%",
  href,
  label,
  children,
}: {
  src: string;
  alt: string;
  pos?: string;
  href?: string;
  label?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollFrame(ref, revealFrame);
  return (
    <section ref={ref} className="rc-reveal">
      <div className="rc-reveal-pin">
        <div className="rc-reveal-frame">
          <div className="rc-reveal-media">
            <Image src={src} alt={alt} fill sizes="100vw" style={{ objectPosition: pos }} />
          </div>
          <div className="rc-fb-shade is-bottom" aria-hidden="true" />
        </div>
        <div className="rc-reveal-content">{children}</div>
        {href ? <Link href={href} className="rc-reveal-link" aria-label={label} /> : null}
      </div>
    </section>
  );
}

/* Stack: each photo rises as a card and grows to full screen over the one before it. */
export type StackPanel = {
  src: string;
  alt: string;
  pos?: string;
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  href?: string;
  cta?: string;
};

const stackFrame: Frame = (el, r, vh) => {
  const panels = el.querySelectorAll<HTMLElement>(".rc-stack-panel");
  const n = panels.length;
  const u = clamp(-r.top / vh, 0, n - 0.5);
  const ks = Array.from(panels, (_, i) => (i === 0 ? 1 : ease(seg(u, i - 1 + 0.2, i))));
  panels.forEach((p, i) => {
    const k = ks[i];
    const out = i < n - 1 ? ks[i + 1] : 0;
    p.style.setProperty("--k", k.toFixed(4));
    p.style.setProperty("--out", out.toFixed(4));
    p.style.setProperty("--t", (seg(k, 0.65, 1) * (1 - seg(out, 0, 0.45))).toFixed(4));
  });
};

export function PhotoStack({ panels, label }: { panels: StackPanel[]; label: string }) {
  const ref = useRef<HTMLElement>(null);
  useScrollFrame(ref, stackFrame);
  return (
    <section ref={ref} className="rc-stack" aria-label={label} style={{ "--n": panels.length } as CSSProperties}>
      <div className="rc-stack-pin">
        {panels.map((p, i) => (
          <div
            key={p.src}
            className="rc-stack-panel"
            style={{ zIndex: i + 1, "--k": i === 0 ? 1 : 0, "--t": i === 0 ? 1 : 0 } as CSSProperties}
          >
            <div className="rc-stack-media">
              <Image src={p.src} alt={p.alt} fill sizes="100vw" style={{ objectPosition: p.pos ?? "50% 50%" }} />
            </div>
            <div className="rc-fb-shade is-bottom" aria-hidden="true" />
            <div className="rc-stack-dim" aria-hidden="true" />
            <div className="rc-stack-copy">
              {p.eyebrow ? <p className="rc-fb-eyebrow">{p.eyebrow}</p> : null}
              <h2 className="rc-fb-title">{p.title}</h2>
              {p.body ? <p className="rc-fb-body">{p.body}</p> : null}
              {p.href && p.cta ? (
                <Link href={p.href} className="rc-fb-cta">
                  {p.cta}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
