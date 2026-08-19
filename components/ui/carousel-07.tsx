"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface Slide {
  image: string;
  title: string;
}

// RunCheck app screens — pulled from /public/mockups (already-framed phone cutouts)
const slides: Slide[] = [
  { image: "/mockups/live-runs.png", title: "Live Runs" },
  { image: "/mockups/plan-a-run.png", title: "Plan a Run" },
  { image: "/mockups/map-screen.png", title: "Find Courts" },
  { image: "/mockups/player-profiles.png", title: "Player Profiles" },
  { image: "/mockups/reliability.png", title: "Reliability Score" },
  { image: "/mockups/find-a-run.png", title: "Find a Run" },
  { image: "/mockups/court-checkin.png", title: "Court Check-In" },
  { image: "/mockups/messaging.png", title: "Messaging" },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 100,
      yMultiplier: 16,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }
  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 150,
      yMultiplier: 22,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }
  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 190,
    yMultiplier: 28,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

const CarouselStacked = () => {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);
  const dragMoved = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const total = slides.length;

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth],
  );

  const handleDragStart = () => {
    startProgress.current = scrollProgress.get();
    dragMoved.current = false;
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;
    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;
    let totalShift = Math.round(distanceShift + velocityShift);
    totalShift = Math.max(-3, Math.min(3, totalShift));
    const target = Math.round(startProgress.current) + totalShift;
    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
    });
    // Reset for the next interaction — otherwise a tap right after a drag
    // stays blocked forever, since a clean tap never re-fires onDragStart.
    dragMoved.current = false;
  };

  // A tap on the drag surface — figure out which card sits closest to the
  // tap point (using the same offset math each Card uses to position itself)
  // and open that one. Ignored if the pointer actually dragged first.
  const handleTap = (point: { x: number; y: number }) => {
    if (dragMoved.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const tapX = point.x - (rect.left + rect.width / 2);
    const p = scrollProgress.get();
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < total; i++) {
      let diff = (i - p) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      const cardX = diff * config.xMultiplier;
      const dist = Math.abs(cardX - tapX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setActiveIndex(closest);
  };

  // Lock body scroll while the lightbox is open, and wire up Escape / arrow keys.
  React.useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? i : (i + 1) % total));
      if (e.key === "ArrowLeft") setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total));
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, total]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-6 sm:py-10 overflow-hidden select-none">
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl h-[26rem] sm:h-[32rem] lg:h-[36rem] flex items-center justify-center"
      >
        {/* Transparent drag + tap surface */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            if (Math.abs(info.offset.x) > 4) dragMoved.current = true;
            const delta = -info.delta.x / config.sensitivity;
            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          onTap={(_, info) => handleTap(info.point)}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />
        {slides.map((slide, i) => (
          <Card
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-zinc-500 uppercase tracking-widest">
        Drag to explore &middot; tap a screen to zoom in
      </p>

      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onPrev={() => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total))}
            onNext={() => setActiveIndex((i) => (i === null ? i : (i + 1) % total))}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface CardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

const Card = ({ slide, index, total, progress, config }: CardProps) => {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => o * config.xMultiplier);
  const rotate = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return o * config.rotationMultiplier;
  });
  const y = useTransform(offset, (o) => {
    const absO = Math.abs(o);
    if (absO < 0.05) return 0;
    return absO * config.yMultiplier;
  });
  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction,
  );
  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0],
  );
  const zIndex = useTransform(offset, (o) =>
    Math.round(100 - Math.abs(o) * 10),
  );
  const glow = useTransform(offset, (o) =>
    Math.max(0, 1 - Math.abs(o) * 0.6),
  );
  const captionOpacity = useTransform(offset, [-0.5, 0, 0.5], [0, 1, 0]);
  const filter = useTransform(
    glow,
    (g) =>
      `drop-shadow(0 -6px ${18 + g * 24}px rgba(249,115,22,${(0.12 + g * 0.28).toFixed(2)})) drop-shadow(0 16px 40px rgba(0,0,0,0.92))`,
  );

  return (
    <motion.div
      style={{ x, rotate, y, scale, opacity, zIndex }}
      className={cn(
        "absolute flex flex-col items-center pointer-events-none",
        "w-40 sm:w-56 lg:w-64",
      )}
    >
      <motion.div style={{ filter }}>
        <Image
          src={slide.image}
          alt={slide.title}
          width={1170}
          height={2532}
          className="h-56 sm:h-80 lg:h-[26rem] w-auto object-contain select-none"
          priority={index === 0}
        />
      </motion.div>
      <motion.p
        style={{ opacity: captionOpacity }}
        className="mt-3 text-sm sm:text-base font-bold text-white text-center drop-shadow-md"
      >
        {slide.title}
      </motion.p>
    </motion.div>
  );
};

interface LightboxProps {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ index, onClose, onPrev, onNext }: LightboxProps) => {
  const slide = slides[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={slide.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm px-4 py-10"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous screen"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next screen"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.div
        key={slide.image}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center max-h-full"
      >
        <Image
          src={slide.image}
          alt={slide.title}
          width={1170}
          height={2532}
          className="h-[70vh] sm:h-[80vh] w-auto object-contain [filter:drop-shadow(0_20px_60px_rgba(0,0,0,0.9))]"
        />
        <p className="mt-4 text-base sm:text-lg font-bold text-white text-center">
          {slide.title}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CarouselStacked;
