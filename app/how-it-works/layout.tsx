import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — RunCheck | Find a Pickup Basketball Run",
  description: "See who's playing, check where the run is, and show up at the right time. RunCheck makes finding pickup basketball simple, live, and reliable.",
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
