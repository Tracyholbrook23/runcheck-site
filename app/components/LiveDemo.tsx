"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Run = {
  id: number;
  name: string;
  city: string;
  type: "Indoor" | "Outdoor";
  players: number;
  active: boolean;
  level: "Casual" | "Balanced" | "Competitive";
};

const INITIAL_RUNS: Run[] = [
  { id: 1, name: "Austin Rec Center",        city: "Austin",       type: "Indoor",   players: 12, active: true,  level: "Competitive" },
  { id: 2, name: "Clay Madsen Rec",          city: "Round Rock",   type: "Indoor",   players: 8,  active: true,  level: "Balanced"    },
  { id: 3, name: "Brushy Creek Sports Park", city: "Cedar Park",   type: "Outdoor",  players: 5,  active: true,  level: "Casual"      },
  { id: 4, name: "Pflugerville Park",        city: "Pflugerville", type: "Outdoor",  players: 0,  active: false, level: "Casual"      },
  { id: 5, name: "Maplewood Park",           city: "Austin",       type: "Outdoor",  players: 3,  active: true,  level: "Casual"      },
];

const LEVEL_COLORS: Record<string, string> = {
  Casual:      "text-green-400  border-green-500/40",
  Balanced:    "text-blue-400   border-blue-500/40",
  Competitive: "text-orange-400 border-orange-500/40",
};

type Notification = { id: number; text: string };

export function LiveDemo() {
  const [runs, setRuns] = useState<Run[]>(INITIAL_RUNS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifId, setNotifId] = useState(0);
  const [totalCheckins, setTotalCheckins] = useState(
    INITIAL_RUNS.reduce((s, r) => s + r.players, 0)
  );

  function addNotif(text: string) {
    const id = notifId + 1;
    setNotifId(id);
    setNotifications((n) => [...n.slice(-2), { id, text }]);
    setTimeout(() => {
      setNotifications((n) => n.filter((x) => x.id !== id));
    }, 3500);
  }

  useEffect(() => {
    const EVENTS = [
      () => {
        setRuns((prev) =>
          prev.map((r) =>
            r.id === 1 ? { ...r, players: r.players + 1 } : r
          )
        );
        setTotalCheckins((t) => t + 1);
        addNotif("🏀 New player checked in at Austin Rec Center");
      },
      () => {
        setRuns((prev) =>
          prev.map((r) =>
            r.id === 2 ? { ...r, players: r.players + 1 } : r
          )
        );
        setTotalCheckins((t) => t + 1);
        addNotif("📍 Player joined Clay Madsen Rec");
      },
      () => {
        setRuns((prev) =>
          prev.map((r) =>
            r.id === 4 ? { ...r, players: 2, active: true } : r
          )
        );
        setTotalCheckins((t) => t + 2);
        addNotif("🟠 New run started at Pflugerville Park");
      },
      () => {
        setRuns((prev) =>
          prev.map((r) =>
            r.id === 1 ? { ...r, players: Math.max(r.players - 1, 10) } : r
          )
        );
      },
      () => {
        setRuns((prev) =>
          prev.map((r) =>
            r.id === 3 ? { ...r, players: r.players + 1 } : r
          )
        );
        setTotalCheckins((t) => t + 1);
        addNotif("🌳 Player checked in at Brushy Creek");
      },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      EVENTS[idx % EVENTS.length]();
      idx++;
    }, 2800);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Header bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80] animate-pulse" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-widest">
            Live — updating in real time
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-orange-400 font-extrabold text-sm">{totalCheckins}</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest">total check-ins</span>
        </div>
      </div>

      {/* Run list */}
      <div className="flex flex-col gap-2.5">
        <AnimatePresence mode="popLayout">
          {runs.map((run) => (
            <motion.div
              key={run.id}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-4 rounded-2xl p-4 border border-zinc-800/80 bg-[#111] ${
                run.active
                  ? "border-l-2 border-l-orange-500"
                  : "border-l-2 border-l-zinc-700"
              }`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-lg flex-shrink-0 border border-zinc-800">
                🏀
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white text-sm font-bold truncate">{run.name}</p>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-widest border rounded-full px-2 py-0.5 ${LEVEL_COLORS[run.level]}`}
                  >
                    {run.level}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs mt-0.5">
                  {run.city} · {run.type}
                </p>
              </div>

              {/* Player count — animates on change */}
              <div className="flex flex-col items-end flex-shrink-0">
                <motion.span
                  key={run.players}
                  initial={{ scale: 1.4, color: "#f97316" }}
                  animate={{ scale: 1, color: run.active ? "#fb923c" : "#52525b" }}
                  transition={{ duration: 0.4 }}
                  className="text-lg font-extrabold leading-none"
                >
                  {run.active ? run.players : "—"}
                </motion.span>
                <span className="text-[9px] text-zinc-600 uppercase tracking-widest">
                  {run.active ? "checked in" : "no run"}
                </span>
              </div>

              {/* Status dot */}
              <span
                className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  run.active
                    ? "bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.6)]"
                    : "bg-zinc-700"
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
