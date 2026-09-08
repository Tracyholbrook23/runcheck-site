import type { Metadata, Viewport } from "next";
import Script from "next/script";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "RunCheck - Know the Run Before You Go",
  description: "Find live pickup basketball runs near you, see who's checked in, and know when the game tips off.",
  metadataBase: new URL("https://www.theruncheck.app"),
  openGraph: {
    title: "RunCheck - Know the Run Before You Go",
    description: "Never show up to an empty gym again. RunCheck lets you see who's playing, where the run is, and when it tips off, before you leave the house.",
    url: "https://www.theruncheck.app",
    siteName: "RunCheck",
    type: "website",
    images: [
      {
        url: "/runcheck-logo1.png",
        width: 1024,
        height: 1024,
        alt: "RunCheck Pickup Basketball App",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "RunCheck - Know the Run Before You Go",
    description: "Find live pickup basketball runs near you and see who's checked in before you leave.",
    images: ["/runcheck-logo1.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RunCheck",
  url: "https://www.theruncheck.app",
  image: "https://www.theruncheck.app/runcheck-logo1.png",
  description:
    "RunCheck lets you see who's playing, where the run is, and when it tips off, before you leave the house. Launching in Austin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}

        {/* Klaviyo onsite tracking, loads on every page, non-blocking */}
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=X9v6kc"
          strategy="afterInteractive"
        />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
