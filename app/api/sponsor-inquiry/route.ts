import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { businessName, contactName, email, phone, category, tier, city } =
      await request.json();

    if (!businessName || !contactName || !email || !category || !tier || !city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailBody = `
New Sponsor Inquiry — RunCheck Website

Business Name:    ${businessName}
Contact Name:     ${contactName}
Email:            ${email}
Phone:            ${phone || "Not provided"}
Business Category: ${category}
Tier Interest:    ${tier}
Target City:      ${city}

Submitted: ${submittedAt} CT
    `.trim();

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RunCheck Website <noreply@theruncheck.app>",
        to: ["hello@theruncheck.app"],
        reply_to: email,
        subject: `New Sponsor Inquiry — ${businessName} (${tier})`,
        text: emailBody,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("sponsor-inquiry route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
