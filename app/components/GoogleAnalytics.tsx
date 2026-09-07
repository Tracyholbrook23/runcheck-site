"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_KEY = "runcheck-analytics-consent";

type Consent = "accepted" | "rejected" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const [consent, setConsent] = useState<Consent>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "rejected") {
      queueMicrotask(() => setConsent(saved));
    }

    const openSettings = () => setShowSettings(true);
    window.addEventListener("runcheck:cookie-settings", openSettings);
    return () => window.removeEventListener("runcheck:cookie-settings", openSettings);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    if (consent !== "accepted" || !GA_MEASUREMENT_ID || !window.gtag) return;
    window.gtag("event", "page_view", {
      page_location: `${window.location.origin}${pathname}`,
      page_path: pathname,
      page_title: document.title,
    });
  }, [consent, pathname]);

  const choose = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    if (value === "rejected") {
      document.cookie.split(";").forEach((cookie) => {
        const name = cookie.split("=")[0]?.trim();
        if (name?.startsWith("_ga")) {
          document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
        }
      });
    }
    setConsent(value);
    setShowSettings(false);
  };

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                send_page_view: false,
                allow_google_signals: false,
                allow_ad_personalization_signals: false
              });
              gtag('event', 'page_view', {
                page_location: window.location.origin + ${JSON.stringify(pathname)},
                page_path: ${JSON.stringify(pathname)},
                page_title: document.title
              });
            `}
          </Script>
        </>
      )}

      {(consent === null || showSettings) && (
        <div className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white shadow-2xl" role="dialog" aria-label="Analytics cookie choices">
          <p className="font-bold">Help us improve RunCheck</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            With your permission, Google Analytics measures visits and how people use this website. We do not use it for advertising.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose("accepted")} className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-orange-400">Accept analytics</button>
            <button type="button" onClick={() => choose("rejected")} className="rounded-full border border-zinc-600 px-5 py-2.5 text-sm font-bold hover:border-zinc-400">Reject analytics</button>
            <a href="/privacy#analytics-cookies" className="self-center text-sm text-zinc-300 underline underline-offset-4 hover:text-white">Learn more</a>
          </div>
        </div>
      )}
    </>
  );
}
