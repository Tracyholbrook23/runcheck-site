import type { Metadata } from "next";
import PostRedirectClient from "./PostRedirectClient";

/**
 * /post/[postId] — shared community post landing page
 *
 * This is what a RunCheck Community post's "Share" button links to
 * (see screens/CommunityFeedScreen.js / CommunityPostDetailScreen.js in the
 * app repo). It exists purely to:
 *   1. Give iMessage/Twitter/Slack/etc. something real to unfurl a link
 *      preview from (generic RunCheck branding — we don't have Firestore
 *      access from this site to pull the actual post content in yet).
 *   2. Bounce the visitor into the app (Universal Link if installed, custom
 *      scheme fallback, then App Store) via PostRedirectClient.
 *
 * Actual routing to the specific post happens app-side — see App.js's
 * LINKING_CONFIG, which maps this path to Main → Community → CommunityPostDetail.
 */

export const metadata: Metadata = {
  title: "A post on RunCheck",
  description:
    "Someone shared a pickup basketball post with you on RunCheck. Open the app to see who's running, where, and when.",
  openGraph: {
    title: "RunCheck — Pickup Basketball",
    description:
      "Someone shared a post with you on RunCheck. Open the app to see it.",
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
      "Someone shared a post with you on RunCheck. Open the app to see it.",
    images: ["/runcheck-logo1.png"],
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  return <PostRedirectClient postId={postId} />;
}
