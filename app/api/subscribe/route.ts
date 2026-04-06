import { NextRequest, NextResponse } from "next/server";

// ── Klaviyo waitlist subscription route ───────────────────────────────────────
// POST /api/subscribe  { email: string }
//
// Required Vercel environment variables (Settings → Environment Variables):
//   KLAVIYO_PUBLIC_KEY   — your Klaviyo public/company ID  (e.g. X9v6kc)
//   KLAVIYO_LIST_ID      — the ID of your "RunCheck Waitlist" list
//                          found at: app.klaviyo.com/list/XXXXXX
//
// Uses Klaviyo's public client subscriptions endpoint — no private key needed.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body?.email ?? "").trim().toLowerCase();

    // ── Validate ──────────────────────────────────────────────────────────────
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const publicKey = process.env.KLAVIYO_PUBLIC_KEY;
    const listId    = process.env.KLAVIYO_LIST_ID;

    if (!publicKey || !listId) {
      console.error("[RunCheck/subscribe] Missing env vars:", {
        KLAVIYO_PUBLIC_KEY: !!publicKey,
        KLAVIYO_LIST_ID:    !!listId,
      });
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    // ── Call Klaviyo ──────────────────────────────────────────────────────────
    const klaviyoRes = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${publicKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "revision": "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              profile: {
                data: {
                  type: "profile",
                  attributes: { email },
                },
              },
            },
            relationships: {
              list: {
                data: { type: "list", id: listId },
              },
            },
          },
        }),
      }
    );

    // Klaviyo returns 202 Accepted (no body) on success
    if (klaviyoRes.status === 202 || klaviyoRes.ok) {
      console.log(`[RunCheck/subscribe] ✓ Subscribed to waitlist: ${email}`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Log the Klaviyo error body for debugging
    let klaviyoError = "";
    try { klaviyoError = await klaviyoRes.text(); } catch {}
    console.error(`[RunCheck/subscribe] Klaviyo error ${klaviyoRes.status}:`, klaviyoError);

    return NextResponse.json(
      { error: "Could not subscribe. Please try again." },
      { status: 502 }
    );

  } catch (err) {
    console.error("[RunCheck/subscribe] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
