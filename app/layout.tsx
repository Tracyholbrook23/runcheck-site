import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "RunCheck — Pickup Basketball, Launching in Austin",
  description: "Never show up to an empty gym again. RunCheck is launching in Austin soon — join the waitlist for early access.",
  metadataBase: new URL("https://www.theruncheck.app"),
  openGraph: {
    title: "RunCheck — Pickup Basketball, Launching in Austin",
    description: "Never show up to an empty gym again. RunCheck lets you see who's playing, where the run is, and when it tips off — before you leave the house.",
    url: "https://www.theruncheck.app",
    siteName: "RunCheck",
    type: "website",
    images: [
      {
        url: "/runcheck-logo1.png",
        width: 1024,
        height: 1024,
        alt: "RunCheck — Pickup Basketball App",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "RunCheck — Pickup Basketball, Launching in Austin",
    description: "Never show up to an empty gym again. Join the waitlist for early access.",
    images: ["/runcheck-logo1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        {children}

        {/* Klaviyo onsite tracking — loads on every page, non-blocking */}
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=X9v6kc"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
