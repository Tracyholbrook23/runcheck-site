import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — RunCheck | Get in Touch",
  description: "Have a question, idea, or partnership inquiry? Reach out to the RunCheck team — we're based in Austin, TX and always happy to talk ball.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
