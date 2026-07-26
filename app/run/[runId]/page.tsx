import type { Metadata } from "next";
import RunRedirectClient from "./RunRedirectClient";

/**
 * /run/[runId] — shared run landing page (2026-07-26)
 *
 * This is what RunDetailsScreen.js's "Share Outside RunCheck" button links
 * to (app repo: screens/RunDetailsScreen.js's handleShareRunExternally).
 * Built specifically so a PRIVATE (invite_only) run can be shared outside
 * the app — a text message, a group chat, social media — and still land
 * the recipient directly on that run with "Request to Join" available.
 * Works identically for a public run's link too.
 *
 * Mirrors app/post/[postId]/page.tsx exactly:
 *   1. Gives iMessage/Twitter/Slack/etc. something real to unfurl a link
 *      preview from (generic RunCheck branding — we don't have Firestore
 *      access from this site to pull the actual run's gym/time yet).
 *   2. Bounces the visitor into the app (Universal Link if installed,
 *      custom scheme fallback, then App Store) via RunRedirectClient.
 *
 * Actual routing to the specific run happens app-side — see App.js's
 * LINKING_CONFIG (`RunLink: 'run/:runId'`) and screens/RunLinkScreen.js,
 * which resolves the run doc and opens RunDetailsScreen with that run's
 * participant modal already up.
 */

export const metadata: Metadata = {
  title: "A run on RunCheck",
  description:
    "Someone shared a pickup basketball run with you on RunCheck. Open the app to see the details and request to join.",
  openGraph: {
    title: "RunCheck — Pickup Basketball",
    description:
      "Someone shared a run with you on RunCheck. Open the app to see it.",
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
    title: "RunCheck — Pickup Basketball",
    description:
      "Someone shared a run with you on RunCheck. Open the app to see it.",
    images: ["/runcheck-logo1.png"],
  },
};

export default async function RunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  return <RunRedirectClient runId={runId} />;
}
