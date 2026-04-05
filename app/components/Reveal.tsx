"use client";

import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.97,
    filter: "blur(4px)",
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: delay / 1000,
    },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
