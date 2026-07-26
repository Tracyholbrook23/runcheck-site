"use client";

/**
 * RunRedirectClient — client half of /run/[runId]
 *
 * iOS intercepts navigation to theruncheck.app/run/{id} and opens the
 * RunCheck app directly (if installed) via Universal Links / AASA — see
 * public/.well-known/apple-app-site-association's "/run/*" entry. This
 * client component is the fallback shown in a regular browser when:
 *   - The app is not installed, OR
 *   - Universal Links fail to activate (e.g. first launch before AASA caches)
 *
 * On load it immediately tries the custom URL scheme (runcheck://run/{id}).
 * If the app opens, the user leaves this page. If not, after 2 seconds it
 * redirects to the App Store. Mirrors app/post/[postId]/PostRedirectClient.tsx
 * exactly (same pattern, just a different scheme path and copy).
 */

import { useEffect } from "react";
import Image from "next/image";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";

export default function RunRedirectClient({ runId }: { runId: string }) {
  useEffect(() => {
    // Try to open the app via custom URL scheme.
    // Works in Safari. In Gmail/Messages in-app browsers, Universal Links
    // handle it before this page even loads — this is purely a
    // belt-and-suspenders fallback, same as /open and /post.
    window.location.href = `runcheck://run/${runId}`;

    // If still here after 2 s, the app isn't installed — send to App Store.
    const timer = setTimeout(() => {
      window.location.href = APP_STORE_URL;
    }, 2000);

    return () => clearTimeout(timer);
  }, [runId]);

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
      <Image
        src="/runcheck-logo1.png"
        alt="RunCheck"
        width={120}
        height={120}
        priority
        style={{ marginBottom: 32, borderRadius: 24 }}
      />

      <p style={{ fontSize: 18, color: "#888", marginTop: 0 }}>
        Opening this run in RunCheck…
      </p>

      <p style={{ fontSize: 13, color: "#444", marginTop: 24, lineHeight: 1.6 }}>
        Don&apos;t have RunCheck yet? You&apos;ll be redirected to the App
        Store to get it.
      </p>
    </div>
  );
}
