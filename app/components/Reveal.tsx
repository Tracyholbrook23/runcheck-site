"use client";

import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: {
    opacity: 0.999,
    y: 20,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
      viewport={{ once: true, amount: 0.01 }}
      custom={delay}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
