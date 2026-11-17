"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is RunCheck free?",
    a: "Yes. The app is free to download, and finding runs, checking in, browsing courts and planning runs are all free. Some runs are paid runs, where the host charges a set price to cover the gym. You only pay for those if you join one.",
  },
  {
    q: "How do GPS check-ins work?",
    a: "When you tap Check In, RunCheck uses your device's GPS to confirm you're physically near the court, usually within a few hundred feet. This prevents fake check-ins and keeps the data accurate for everyone.",
  },
  {
    q: "What if I show up and no one is there?",
    a: "Check the player count before you leave. If it shows zero, there's no active run. You can also use Plan a Run to schedule ahead, so courts show upcoming interest before anyone checks in.",
  },
  {
    q: "Can I find games near me even if I just moved to a new city?",
    a: "RunCheck is starting in Austin and Round Rock, Texas, with more cities on the way. If you're in the Austin area, you'll see every tracked court near you, with real-time player counts for active runs.",
  },
  {
    q: "Can I start my own run?",
    a: "Yes. You can post an Open Run so other nearby players can see it and join you. Set the level (Casual, Balanced, Competitive), the time, and you're good. If you rent a gym, you can apply to host paid runs, where players pay their share in the app.",
  },
  {
    q: "What is a Reliability Score?",
    a: "It tracks your attendance rate, whether you show up when you've planned a visit or started a run. A higher score builds trust in the community and shows you're not a ghost.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
      {FAQS.map(({ q, a }, i) => {
        const isOpen = open === i;
        return (
          <div
            key={q}
            className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
              isOpen ? "border-zinc-700 bg-[#111]" : "border-zinc-800 bg-[#0d0d0d]"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
            >
              <span className="text-sm font-semibold text-white">{q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 text-orange-500 text-lg font-light leading-none"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-zinc-400 leading-7">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
