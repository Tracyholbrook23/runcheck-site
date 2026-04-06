import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — RunCheck",
  description: "Learn how RunCheck collects, uses, and protects your personal information, including location data and email.",
};

const LAST_UPDATED = "April 6, 2026";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: `RunCheck ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service"). Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.`,
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    subsections: [
      {
        title: "Information You Provide Directly",
        items: [
          "Email address — when you join our waitlist or create an account.",
          "Name and username — when you set up a profile.",
          "Profile photo — if you choose to upload one.",
          "Run details — court name, run level, and check-in information you submit.",
        ],
      },
      {
        title: "Location Information",
        items: [
          "Precise GPS location — collected when you use the check-in feature to verify your physical presence at a court. We do not allow remote check-ins.",
          "General location — used to show nearby courts and active runs in your area.",
          "Location is only collected while the app is in use and with your explicit permission. You may revoke location access at any time through your device settings.",
        ],
      },
      {
        title: "Automatically Collected Information",
        items: [
          "Device information — device type, operating system, and app version.",
          "Usage data — features used, screens visited, and time spent in the app.",
          "IP address — collected for security and analytics purposes.",
          "Check-in timestamps — when and how often you check in at courts.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    items: [
      "To operate and improve the RunCheck Service.",
      "To verify GPS check-ins and display accurate player counts at courts.",
      "To show you active runs and courts near your location.",
      "To send you launch updates, product news, and notifications you've opted into.",
      "To build features like leaderboards, reliability scores, and run history.",
      "To respond to your support requests and feedback.",
      "To detect and prevent fraud, abuse, and security issues.",
      "To comply with legal obligations.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Your Information",
    content: "We do not sell your personal information. We may share your information in the following limited circumstances:",
    subsections: [
      {
        title: "With Other Users",
        items: [
          "Your username and check-in activity (court, run level, timestamp) are visible to other RunCheck users when you are actively checked in.",
          "Your reliability score and run history may be visible on leaderboards if you opt in.",
        ],
      },
      {
        title: "With Service Providers",
        items: [
          "Klaviyo — we use Klaviyo to manage our email waitlist and send launch communications. Your email address is shared with Klaviyo for this purpose.",
          "Vercel — our website and API are hosted on Vercel's infrastructure.",
          "Analytics providers — we may use third-party analytics tools to understand how users interact with the Service.",
        ],
      },
      {
        title: "For Legal Reasons",
        items: [
          "We may disclose your information if required by law, subpoena, or other legal process.",
          "We may share information to protect the rights, property, or safety of RunCheck, our users, or the public.",
        ],
      },
    ],
  },
  {
    id: "location-data",
    title: "Location Data & GPS",
    content: `Because RunCheck is a location-based service, we want to be especially transparent about how we handle GPS data:`,
    items: [
      "GPS location is only accessed when you actively use the check-in feature.",
      "We do not track your location in the background.",
      "Location data is used solely to verify court check-ins — we do not store a continuous history of your movements.",
      "Check-in location data is associated with a specific court and timestamp, not a continuous GPS trail.",
      "You can disable location access at any time in your device's Settings > Privacy > Location Services.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    items: [
      "Account data is retained while your account is active.",
      "Check-in history is retained to power leaderboards and reliability scores.",
      "Waitlist email data is retained until you unsubscribe or request deletion.",
      "You may request deletion of your account and associated data at any time by contacting us at hello@theruncheck.app.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    items: [
      "Access — you may request a copy of the personal data we hold about you.",
      "Correction — you may update or correct your account information at any time.",
      "Deletion — you may request that we delete your personal data.",
      "Opt-out of emails — every email we send includes an unsubscribe link. You may also email hello@theruncheck.app to opt out.",
      "Location — you may revoke location permissions at any time through your device settings. Note that some features (check-in) require location to function.",
      "California residents may have additional rights under the CCPA. Please contact us to exercise them.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: `RunCheck is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately at hello@theruncheck.app and we will delete it promptly.`,
  },
  {
    id: "security",
    title: "Data Security",
    content: `We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, and you use the Service at your own risk.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. If we make material changes, we will notify you via email (if you're on our waitlist) or through a notice in the app. Your continued use of the Service after changes are posted constitutes your acceptance of the revised policy.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have questions, concerns, or requests related to this Privacy Policy, please contact us:`,
    contact: {
      email: "hello@theruncheck.app",
      address: "RunCheck · Austin, TX",
    },
  },
];

export default function Privacy() {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Nav activePath="/privacy" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{background:"radial-gradient(ellipse,rgba(249,115,22,.5) 0%,transparent 70%)"}} />
        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">Privacy Policy</h1>
          <p className="text-zinc-400 text-base">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="w-full border-t border-zinc-800/60" />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">

        {/* Table of contents */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-4">Contents</p>
          <ol className="flex flex-col gap-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-sm text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <span className="text-zinc-700 text-[11px] w-4 flex-shrink-0">{i + 1}.</span>
                  <span className="group-hover:underline underline-offset-2">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((section, i) => (
            <div key={section.id} id={section.id} className="scroll-mt-28">
              <div className="flex items-start gap-4 mb-5">
                <span className="text-[11px] font-bold text-orange-500 mt-1.5 flex-shrink-0 w-5">{i + 1}.</span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{section.title}</h2>
              </div>

              <div className="pl-9 flex flex-col gap-5">
                {section.content && (
                  <p className="text-zinc-300 text-sm leading-7">{section.content}</p>
                )}

                {section.items && (
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-zinc-300 leading-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections && section.subsections.map((sub, si) => (
                  <div key={si} className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest text-[11px] text-orange-400">{sub.title}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {sub.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-zinc-300 leading-7">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0 mt-2.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.contact && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
                    <a href={`mailto:${section.contact.email}`} className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors">
                      {section.contact.email}
                    </a>
                    <p className="text-zinc-500 text-sm">{section.contact.address}</p>
                  </div>
                )}
              </div>

              {i < sections.length - 1 && (
                <div className="mt-12 border-t border-zinc-800/60" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
