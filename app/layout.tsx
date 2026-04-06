import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "RunCheck — Pickup Basketball, Launching in Austin",
  description: "Never show up to an empty gym again. RunCheck is launching in Austin soon — join the waitlist for early access and exclusive league perks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
