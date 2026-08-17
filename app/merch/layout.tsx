import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch - RunCheck | Tees & Hats",
  description: "Shop RunCheck gear: the embroidered snapback is in stock now, more tees and hats on the way. Join the list to get notified the second new drops launch.",
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
