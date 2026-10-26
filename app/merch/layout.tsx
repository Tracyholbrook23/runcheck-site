import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch - RunCheck | Tees & Hats",
  description: "Shop RunCheck gear: the embroidered snapback in black, tan, and white, plus the new RunCheck Logo Tee in black, orange, and white. Join the list to hear about new drops first.",
};

export default function MerchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
