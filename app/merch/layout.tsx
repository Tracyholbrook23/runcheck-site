import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch — RunCheck | Tees & Hats",
  description: "RunCheck merch is dropping soon — tees and hats for the pickup basketball community. Join the waitlist to get notified the second it launches.",
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
