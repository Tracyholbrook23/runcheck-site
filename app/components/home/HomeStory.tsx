"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Footer } from "../Footer";
import type { CourtScene, BallRect } from "./courtScene";

/*
 * The homepage as one continuous shot. A basketball on the court in the hero
 * is the same ball that drops into the phone, lands on a run card, and comes
 * back as the logo at the end. Every scene is driven by eased scroll progress
 * from a single requestAnimationFrame loop.
 */

const APP_STORE_URL = "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";

const NAV_LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Partners", href: "/sponsors" },
  { label: "Updates", href: "/updates" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
];

const SCREENS = [
  { left: "FIND", right: "A RUN", img: "/home/phone-find-a-run.webp", note: "Every gym near you, with how many are playing right now." },
  { left: "LIVE", right: "NOW", img: "/home/phone-live-runs.webp", note: "Runs forming near you and who started them." },
  { left: "THE", right: "MAP", img: "/home/phone-map-screen.webp", note: "On fire, poppin, active or dead. One look at the whole city." },
  { left: "CHECK", right: "IN", img: "/home/phone-court-checkin.webp", note: "Walk in, tap check in, and the count goes up for everybody." },
];

const CREW = ["MH", "TM", "CH", "JD", "TB", "DR", "MK", "NR", "CJ", "AS"];

const WORLDS = [
  { id: "casual", label: "Casual", word: "CASUAL", photo: "/photos/rr/rr-iso.webp", pos: "50% 50%", gym: "Clay Madsen Recreation Center", when: "Tonight, 9:00 PM", going: 9, line: "Run it back, no pressure." },
  { id: "balanced", label: "Balanced", word: "BALANCED", photo: "/photos/rr/rr-shootaround.webp", pos: "50% 62%", gym: "Hutto Family YMCA", when: "Tonight, 8:30 PM", going: 11, line: "Good runs, even teams." },
  { id: "competitive", label: "Competitive", word: "COMPETITIVE", photo: "/photos/rr/rr-jumper.webp", pos: "50% 40%", gym: "Gregory Gymnasium", when: "Tonight, 6:00 PM", going: 14, line: "Bring your game. Call your fouls." },
] as const;

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

function AppleMark() {
  return (
    <svg viewBox="0 0 814 1000" aria-hidden="true">
      <path d="M788 341c-6 4-108 62-108 190 0 149 130 201 134 203-1 3-21 72-69 142-43 62-87 123-155 123s-86-40-164-40c-76 0-104 41-166 41S155 922 105 832C46 791 0 664 0 541c0-205 133-313 265-313 70 0 128 43 171 43 40 0 107-47 184-47zM632 131c32-40 54-96 54-152 0-8-1-16-2-23-51 2-112 34-149 76-29 32-55 88-55 145 0 9 1 17 2 20 3 1 8 1 14 1 46 0 101-31 136-67z" />
    </svg>
  );
}

function StoreButton({ label = "Download on the App Store" }: { label?: string }) {
  return (
    <a className="rc-action" href={APP_STORE_URL} target="_blank" rel="noreferrer">
      <AppleMark />
      {label}
    </a>
  );
}

export function HomeStory() {
  const stageA = useRef<HTMLElement>(null);
  const stageB = useRef<HTMLElement>(null);
  const stageC = useRef<HTMLElement>(null);
  const pinA = useRef<HTMLDivElement>(null);
  const pinB = useRef<HTMLDivElement>(null);
  const pinC = useRef<HTMLDivElement>(null);
  const dimA = useRef<HTMLDivElement>(null);
  const dimB = useRef<HTMLDivElement>(null);
  const dimC = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const poster = useRef<HTMLImageElement>(null);
  const heroUi = useRef<HTMLDivElement>(null);
  const phoneScene = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const badgeSlot = useRef<HTMLSpanElement>(null);
  const bContent = useRef<HTMLDivElement>(null);
  const cardSlot = useRef<HTMLSpanElement>(null);
  const crew = useRef<HTMLDivElement>(null);
  const crewCount = useRef<HTMLSpanElement>(null);
  const cHead = useRef<HTMLDivElement>(null);
  const cStrip = useRef<HTMLDivElement>(null);
  const freeRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLElement>(null);
  const endWord = useRef<HTMLDivElement>(null);
  const endBall = useRef<HTMLDivElement>(null);
  const travel = useRef<HTMLImageElement>(null);
  const floatBar = useRef<HTMLDivElement>(null);

  const [world, setWorld] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const [prevWorld, setPrevWorld] = useState(0);
  const busy = useRef(false);

  const pickWorld = useCallback(
    (i: number) => {
      if (i === world || busy.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setPrevWorld(world);
        setWorld(i);
        return;
      }
      busy.current = true;
      setPhase("out");
      window.setTimeout(() => {
        setPrevWorld(world);
        setWorld(i);
        setPhase("in");
        window.setTimeout(() => {
          setPhase("idle");
          busy.current = false;
        }, 900);
      }, 320);
    },
    [world]
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrowQuery = window.matchMedia("(max-width: 800px)");
    let scene: CourtScene | null = null;
    let sceneDrawn = false;
    let alive = true;
    let raf = 0;
    let last = performance.now();
    const start = last;
    let mouseX = 0;
    let mouseY = 0;
    const cur = { a: 0, b: 0, landB: 0, c: 0, landC: 0, landD: 0 };
    let lastRect: BallRect = { x: innerWidth * 0.6, y: innerHeight * 0.5, r: 120 };
    let screenIdx = -1;
    let crewN = -1;
    let lastDive = -1;
    let lastShow = true;

    import("./courtScene").then(({ createCourtScene }) => {
      if (!alive || !canvas.current) return;
      scene = createCourtScene(canvas.current, { narrow: narrowQuery.matches });
      const draw = () => {
        scene?.update({ dive: 0, mouseX: 0, mouseY: 0, time: 0 });
        sceneDrawn = true;
        canvas.current?.classList.add("is-ready");
        poster.current?.classList.add("is-hidden");
      };
      // Anton has to be loaded before the headline is painted onto the court.
      (document.fonts?.load ? document.fonts.load("100px Anton") : Promise.resolve()).then(() => scene?.ready.then(draw));
    });

    const onMove = (e: PointerEvent) => {
      mouseX = (e.clientX / innerWidth) * 2 - 1;
      mouseY = (e.clientY / innerHeight) * 2 - 1;
    };
    const onResize = () => scene?.resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    const progress = (el: HTMLElement | null) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - innerHeight));
    };
    const landing = (el: HTMLElement | null) => {
      if (!el) return 0;
      return clamp(1 - el.getBoundingClientRect().top / innerHeight);
    };
    const rectOf = (el: HTMLElement | null): BallRect => {
      if (!el) return lastRect;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r.width / 2 };
    };
    const recede = (pin: HTMLDivElement | null, dim: HTMLDivElement | null, k: number, top = 0) => {
      if (!pin || !dim) return;
      const e = ease(clamp(k / 0.6));
      pin.style.transform = e > 0 ? `scale(${1 - 0.06 * e})` : "";
      const r = 28 * e;
      pin.style.borderRadius = `${Math.max(top, r)}px ${Math.max(top, r)}px ${r}px ${r}px`;
      dim.style.opacity = String(0.55 * e);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const chase = reduced ? 1 : 1 - Math.pow(0.88, dt * 60);
      const time = reduced ? 0 : (now - start) / 1000;

      cur.a += (progress(stageA.current) * 5.2 - cur.a) * chase;
      cur.landB += (landing(stageB.current) - cur.landB) * chase;
      cur.b += (progress(stageB.current) * 2.6 - cur.b) * chase;
      cur.landC += (landing(stageC.current) - cur.landC) * chase;
      cur.c += (progress(stageC.current) - cur.c) * chase;
      cur.landD += (landing(freeRef.current) - cur.landD) * chase;
      const t = cur.a;

      // Hero: the camera dives to the ball, then the court fades out behind it.
      const dive = seg(t, 0.3, 1.5);
      const courtFade = seg(t, 1.5, 1.85);
      if (scene && sceneDrawn && courtFade < 1) {
        const showBall = t < 1.58;
        const moving = !reduced || Math.abs(dive - lastDive) > 0.0005 || showBall !== lastShow;
        if (moving) {
          scene.update({ dive, mouseX: reduced ? 0 : mouseX, mouseY: reduced ? 0 : mouseY, time, showBall });
          if (showBall) {
            const r = scene.ballRect();
            lastRect = { x: r.x, y: r.y, r: r.r * 1.04 };
          }
          lastDive = dive;
          lastShow = showBall;
        }
      }
      if (canvas.current) canvas.current.style.opacity = sceneDrawn ? String(1 - courtFade) : "0";
      if (poster.current) poster.current.style.opacity = sceneDrawn ? "0" : String(1 - courtFade);
      if (heroUi.current) {
        const k = seg(t, 0.28, 0.75);
        heroUi.current.style.opacity = String(1 - k);
        heroUi.current.style.transform = `translateY(${-30 * ease(k)}px)`;
        heroUi.current.style.pointerEvents = k > 0.5 ? "none" : "";
      }

      // Phone: rises in, the ball drops onto it, then four screens cycle.
      const phoneIn = ease(seg(t, 1.5, 2.1));
      if (phoneScene.current) {
        phoneScene.current.style.opacity = String(phoneIn);
        phoneScene.current.style.visibility = phoneIn > 0.001 ? "visible" : "hidden";
      }
      if (phone.current) phone.current.style.transform = `translateY(${(1 - phoneIn) * 55}vh) rotate(${(1 - phoneIn) * -6}deg)`;
      const idx = Math.min(SCREENS.length - 1, Math.max(0, Math.floor((t - 2.25) / 0.5)));
      if (idx !== screenIdx && phoneScene.current) {
        screenIdx = idx;
        phoneScene.current.dataset.screen = String(idx);
      }

      // Sheet B lands over the phone; sheet C lands over B.
      recede(pinA.current, dimA.current, cur.landB);
      recede(pinB.current, dimB.current, cur.landC, 40);
      recede(pinC.current, dimC.current, cur.landD, 40);
      if (bContent.current) {
        const k = ease(seg(cur.landB, 0.78, 1));
        bContent.current.style.opacity = String(k);
        bContent.current.style.transform = `translateY(${(1 - k) * 60}px)`;
      }
      const n = Math.round(lerp(2, 10, seg(cur.b, 0.15, 1.7)));
      if (n !== crewN && crew.current && crewCount.current) {
        crewN = n;
        Array.from(crew.current.children).forEach((c, i) => c.classList.toggle("is-in", i < n));
        crewCount.current.textContent = `${n}/10 IN`;
      }

      // The travelling ball: one element, measured rect to rect every frame.
      const tr = travel.current;
      if (tr) {
        let p: BallRect = lastRect;
        let o = seg(t, 1.42, 1.56);
        const toPhone = ease(seg(t, 1.6, 2.2));
        if (toPhone > 0) {
          const b = rectOf(badgeSlot.current);
          p = { x: lerp(p.x, b.x, toPhone), y: lerp(p.y, b.y, toPhone), r: lerp(p.r, b.r, toPhone) };
        }
        const toCard = ease(seg(cur.landB, 0.55, 1));
        if (toCard > 0) {
          const c = rectOf(cardSlot.current);
          p = { x: lerp(p.x, c.x, toCard), y: lerp(p.y, c.y, toCard), r: lerp(p.r, c.r, toCard) };
        }
        const docked = toCard >= 0.999;
        if (docked) o = 0;
        cardSlot.current?.classList.toggle("is-docked", docked);
        const spin = t * 140 + cur.landB * 220;
        tr.style.opacity = String(o);
        tr.style.transform = `translate(${p.x - p.r}px, ${p.y - p.r}px) rotate(${spin}deg)`;
        tr.style.width = tr.style.height = `${p.r * 2}px`;
      }

      // Scene switcher: the strip zooms in, measured against the space under the heading.
      if (pinC.current && cHead.current && cStrip.current) {
        const zoom = ease(seg(cur.c, 0.05, 0.6));
        const content = ease(seg(cur.landC, 0.78, 1));
        cHead.current.style.transform = `scale(${lerp(1, 0.86, zoom)})`;
        cHead.current.style.opacity = String(content);
        const headH = cHead.current.getBoundingClientRect().height;
        const free = pinC.current.clientHeight - headH - (innerWidth < 800 ? 150 : 190);
        const fit = Math.min(1, free / Math.max(1, cStrip.current.offsetHeight));
        cStrip.current.style.transform = `translateY(${(1 - content) * 80}px) scale(${lerp(0.84, 1, zoom) * fit})`;
        cStrip.current.style.opacity = String(content);
      }

      // Free and End: content rises as it fades in.
      if (freeRef.current) {
        const k = ease(seg(1 - freeRef.current.getBoundingClientRect().top / innerHeight, 0.15, 0.6));
        freeRef.current.style.setProperty("--rise", String(k));
      }
      if (endRef.current && endWord.current && endBall.current) {
        const r = endRef.current.getBoundingClientRect();
        const k = clamp(1 - r.top / innerHeight);
        endWord.current.style.transform = `translateX(${lerp(5, -5, clamp((innerHeight - r.top) / (innerHeight + r.height)))}%)`;
        endBall.current.style.setProperty("--drop", String(ease(seg(k, 0.35, 0.8))));
        endBall.current.style.setProperty("--check", String(ease(seg(k, 0.75, 1))));
        if (floatBar.current) {
          const show = t > 1.75 && k < 0.45;
          floatBar.current.classList.toggle("is-on", show);
        }
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
      scene?.dispose();
    };
  }, []);

  const w = WORLDS[world];

  return (
    <main className="rc-home">
      <header className="rc-nav">
        <Link href="/" className="rc-nav-logo" aria-label="RunCheck home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/runcheck-logo.png" alt="" width={64} height={64} />
        </Link>
        <nav className="rc-glass rc-nav-links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      <section ref={stageA} className="rc-stage rc-stage-a" aria-label="Know the run before you go">
        <div ref={pinA} className="rc-pin rc-pin-a">
          <picture>
            <source media="(max-width: 800px)" srcSet="/home/hero-poster-phone.webp" />
            <img ref={poster} className="rc-poster" src="/home/hero-poster.webp" alt="" fetchPriority="high" />
          </picture>
          <canvas ref={canvas} className="rc-court" aria-hidden="true" />
          <div ref={heroUi} className="rc-hero-ui">
            <h1 className="rc-hero-title">
              Know the run.
              <br />
              Before you go.
            </h1>
            <div className="rc-glass rc-hero-card">
              <p>See who&apos;s checked in, where the game is, and when it tips off. Before you leave the house.</p>
              <StoreButton />
            </div>
          </div>

          <div ref={phoneScene} className="rc-phone-scene" data-screen="0">
            <div className="rc-flank rc-flank-l" aria-hidden="true">
              {SCREENS.map((s, i) => (
                <span key={s.left} data-i={i}>
                  {s.left}
                </span>
              ))}
            </div>
            <div ref={phone} className="rc-phone">
              {SCREENS.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={s.img} src={s.img} alt={i === 0 ? "RunCheck app screens" : ""} data-i={i} loading="lazy" />
              ))}
              <span ref={badgeSlot} className="rc-badge-slot" aria-hidden="true">
                <span className="rc-live-ring" />
              </span>
            </div>
            <div className="rc-flank rc-flank-r" aria-hidden="true">
              {SCREENS.map((s, i) => (
                <span key={s.right} data-i={i}>
                  {s.right}
                </span>
              ))}
            </div>
            <p className="rc-phone-lede">No more pulling up to an empty gym.</p>
            <div className="rc-phone-notes">
              {SCREENS.map((s, i) => (
                <p key={s.note} data-i={i}>
                  {s.note}
                </p>
              ))}
            </div>
          </div>
          <div ref={dimA} className="rc-dim" />
        </div>
      </section>

      <section ref={stageB} className="rc-stage rc-sheet rc-stage-b">
        <div ref={pinB} className="rc-pin rc-pin-b">
          <div ref={bContent} className="rc-b-content">
            <div className="rc-b-copy">
              <h2>
                Start a run.
                <br />
                The crew pulls up.
              </h2>
              <p>Pick the gym, set the time, drop it in the group chat. Everybody sees who&apos;s in before anybody drives over.</p>
            </div>
            <article className="rc-run-card">
              <header>
                <span ref={cardSlot} className="rc-card-slot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/home/ball.webp" alt="" />
                </span>
                <div>
                  <strong>Tonight, 8:30 PM</strong>
                  <span>Clay Madsen Recreation Center</span>
                </div>
                <em>Competitive</em>
              </header>
              <div ref={crew} className="rc-crew">
                {CREW.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              <footer>
                <span ref={crewCount} className="rc-stamp">
                  2/10 IN
                </span>
                <span>Round Rock, TX</span>
              </footer>
            </article>
          </div>
          <div ref={dimB} className="rc-dim" />
        </div>
      </section>

      <section ref={stageC} className="rc-stage rc-sheet rc-stage-c" data-world={w.id} data-phase={phase}>
        <div ref={pinC} className="rc-pin rc-pin-c">
          <div className="rc-worlds" aria-hidden="true">
            {WORLDS.map((x, i) => (
              <div
                key={x.id}
                className={`rc-world-bg${i === world ? " is-active" : ""}${i === prevWorld && i !== world ? " is-leaving" : ""}`}
                style={{ backgroundImage: `url(${x.photo})`, backgroundPosition: x.pos }}
              />
            ))}
            <div className="rc-world-shade" />
          </div>
          <div ref={cHead} className="rc-c-head">
            <h2>
              Find your
              <br />
              kind of run.
            </h2>
            <div className="rc-glass rc-world-buttons" role="tablist" aria-label="Run level">
              {WORLDS.map((x, i) => (
                <button key={x.id} role="tab" aria-selected={i === world} className={i === world ? "is-on" : ""} onClick={() => pickWorld(i)}>
                  {x.label}
                </button>
              ))}
            </div>
          </div>
          <div ref={cStrip} className="rc-strip">
            <div className="rc-strip-word">{w.word}</div>
            <article className="rc-strip-card" key={`${w.id}-card`}>
              <em>{w.label}</em>
              <strong>{w.gym}</strong>
              <span>{w.when}</span>
              <span className="rc-stamp">{w.going} GOING</span>
            </article>
            <p className="rc-strip-line" key={`${w.id}-line`}>
              {w.line}
            </p>
          </div>
          <div ref={dimC} className="rc-dim" />
        </div>
      </section>

      <section ref={freeRef} className="rc-sheet rc-free">
        <h2>
          Free.
          <br />
          For every hooper.
        </h2>
        <div className="rc-board">
          <p>
            <strong>100+</strong>
            <span>Courts mapped</span>
          </p>
          <p>
            <strong>FREE</strong>
            <span>To download</span>
          </p>
          <p>
            <strong>ATX</strong>
            <span>Where it starts</span>
          </p>
        </div>
        <div className="rc-free-foot">
          <p>No paywall to see the runs. Download it, check in, hoop.</p>
          <p>
            Gyms and local brands keep the runs going.{" "}
            <Link href="/sponsors" className="rc-text-link">
              Partner with RunCheck
            </Link>
          </p>
        </div>
      </section>

      <section ref={endRef} className="rc-end">
        <div className="rc-end-lockup" aria-hidden="true">
          <div ref={endBall} className="rc-end-ball">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rc-end-ball-img" src="/home/ball.webp" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="rc-end-check" src="/home/logo-check.webp" alt="" />
          </div>
          <div ref={endWord} className="rc-end-word">
            <span>RUN</span>CHECK
          </div>
        </div>
        <h2 className="rc-end-line">Know the run before you go.</h2>
        <StoreButton />
      </section>

      <Footer />

      <div ref={floatBar} className="rc-glass rc-float">
        <span>Free on iPhone</span>
        <a className="rc-action rc-action-sm" href={APP_STORE_URL} target="_blank" rel="noreferrer">
          Get the app
        </a>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={travel} className="rc-travel" src="/home/ball.webp" alt="" aria-hidden="true" />
    </main>
  );
}
