"use client";

/**
 * /open — Universal Link landing page
 *
 * iOS intercepts navigation to theruncheck.app/open and opens the RunCheck
 * app directly (if installed) via Universal Links / AASA.
 *
 * This page is the fallback shown in a regular browser when:
 *   - The app is not installed, OR
 *   - Universal Links fail to activate (e.g. first launch before AASA caches)
 *
 * On load it immediately tries the custom URL scheme (runcheck://verified).
 * If the app opens, the user leaves this page. If not, after 2 seconds it
 * redirects to the App Store.
 */

import { useEffect } from "react";

export default function OpenPage() {
  useEffect(() => {
    // Try to open the app via custom URL scheme.
    // Works in Safari. In Gmail WebView, Universal Links handle it before
    // this page even loads — this is purely a belt-and-suspenders fallback.
    window.location.href = "runcheck://verified";

    // If still here after 2 s, the app isn't installed — send to App Store.
    const timer = setTimeout(() => {
      window.location.href =
        "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#fff",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/runcheck-logo1.png"
        alt="RunCheck"
        style={{ width: 120, height: 120, marginBottom: 32, borderRadius: 24 }}
      />

      <p style={{ fontSize: 18, color: "#888", marginTop: 0 }}>
        Opening RunCheck…
      </p>

      <p style={{ fontSize: 13, color: "#444", marginTop: 24, lineHeight: 1.6 }}>
        If the app doesn&apos;t open, you&apos;ll be redirected to the App Store.
      </p>
    </div>
  );
}
