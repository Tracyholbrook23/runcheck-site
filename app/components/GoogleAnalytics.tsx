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
        <div className="cookie-basketball" role="dialog" aria-label="Analytics cookie choices">
          <div className="cookie-basketball-content">
            <p className="cookie-basketball-title">Help us improve RunCheck</p>
            <p className="cookie-basketball-copy">
              With your permission, Google Analytics measures visits and how people use this website. We do not use it for advertising.
            </p>
            <div className="cookie-basketball-actions">
              <button type="button" onClick={() => choose("accepted")} className="cookie-accept">Accept analytics</button>
              <button type="button" onClick={() => choose("rejected")} className="cookie-reject">Reject analytics</button>
              <a href="/privacy#analytics-cookies" className="cookie-learn">Learn more</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
