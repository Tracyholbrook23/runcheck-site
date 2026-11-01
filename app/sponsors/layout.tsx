import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner with RunCheck | Our Partners",
  description:
    "RunCheck is the free pickup basketball app for Austin hoopers. Meet our partners and tell us about your business if you want to be one.",
};

export default function SponsorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
