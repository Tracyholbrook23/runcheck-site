import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { businessName, contactName, email, phone, category, city, website, message, tier } =
      await request.json();

    if (!businessName || !contactName || !email || !category || !city) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailBody = `
New Partner Inquiry - RunCheck Website

Business Name:     ${businessName}
Contact Name:      ${contactName}
Email:             ${email}
Phone:             ${phone || "Not provided"}
Type of Business:  ${category}
City or Area:      ${city}
Website/Instagram: ${website || "Not provided"}${tier ? `\nTier Interest:     ${tier}` : ""}

Message:
${message || "None"}

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
        subject: `New Partner Inquiry - ${businessName}`,
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
