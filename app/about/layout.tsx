import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — RunCheck | Built by a Player, for Players",
  description: "Meet the founder of RunCheck and learn why we're building the app that solves the #1 problem in pickup basketball: showing up to an empty gym.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
