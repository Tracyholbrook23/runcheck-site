import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - RunCheck",
  description: "Learn how RunCheck collects, uses, and protects your personal information, including location data and email.",
};

const LAST_UPDATED = "November 20, 2026";

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: `RunCheck ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile apps for iPhone and Android and our website (collectively, the "Service"). Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.`,
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    subsections: [
      {
        title: "Information You Provide Directly",
        items: [
          "Account details - email address, name, username, and password (or sign-in through a supported provider) when you create an account.",
          "Profile information - profile photo, skill level, home court, and other details you choose to add.",
          "Content you create - runs you post, run rules, posts, game clips and videos, photos, comments, likes, and gym reviews.",
          "Messages - messages you send in run chats, group chats, channels, and direct messages.",
          "Host applications - if you apply to host paid runs, your phone number, a selfie, your Instagram handle, and the other details on the application. Payout and identity details are collected by Stripe, not stored by RunCheck.",
          "Support requests - anything you send us by email or through the in-app help tools.",
        ],
      },
      {
        title: "Payment Information",
        items: [
          "When you pay for a paid run, your card or wallet payment (Apple Pay or Google Pay) is processed by Stripe. RunCheck does not receive or store your full card number.",
          "We keep records of your paid run bookings, such as the run, amount, service fee, refunds, and payment status.",
          "Hosts receive payouts through Stripe. Stripe collects the bank and identity information it needs to send payouts and to meet its legal requirements.",
        ],
      },
      {
        title: "Location Information",
        items: [
          "Precise location - used to verify that you are physically at a court when you check in, and to show nearby courts and runs. We do not allow remote check-ins.",
          "Background location (Smart Auto Check-In) - if you allow location access \"Always\" (iPhone) or \"Allow all the time\" (Android), the app sets up geofences around the courts you choose or are likely to visit. This lets RunCheck check you in when you arrive, update the live player count other players see, and check you out when you leave, even when the app is closed.",
          "You can turn Smart Auto Check-In off at any time in the app's Settings, or change location access in your phone's settings. Without background access, you can still check in by opening the app.",
        ],
      },
      {
        title: "Automatically Collected Information",
        items: [
          "Device information - device type, operating system, app version, and a device token used to send you push notifications.",
          "Usage data - features used, screens visited, and actions taken in the app.",
          "Crash and performance data - error reports and diagnostics when the app has a problem.",
          "Install attribution - which link, ad, or campaign led you to install the app, which may include device identifiers.",
          "IP address - collected for security, fraud prevention, and analytics.",
          "Check-in timestamps - when and how often you check in at courts.",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    items: [
      "To operate and improve the RunCheck Service.",
      "To verify check-ins and display accurate live player counts at courts.",
      "To show you active runs, usual run times, and courts near your location.",
      "To process paid run bookings, refunds, and host payouts.",
      "To send notifications you've turned on, such as runs at gyms you follow, run reminders, chat messages, and booking or refund updates.",
      "To send account and transactional emails, and product news you've opted into.",
      "To build features like leaderboards, reliability scores, and run history.",
      "To review host applications and keep paid runs safe.",
      "To respond to your support requests and feedback.",
      "To detect and prevent fraud, abuse, and security issues.",
      "To comply with legal, tax, and accounting obligations.",
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
          "Your username, profile photo, and check-in activity (court and time) are visible to other RunCheck users when you are checked in, unless you choose to check in anonymously.",
          "Runs you join, posts, clips, comments, and messages you send are visible to the people they are shared with.",
          "Hosts of a paid run see the names of players who join, and can see who has paid and checked in.",
          "Your reliability score and run history may be visible on your profile and leaderboards.",
        ],
      },
      {
        title: "With Service Providers",
        items: [
          "Google Firebase - accounts, database, file storage, and push notification delivery.",
          "Stripe - payment processing, refunds, and host payouts.",
          "Expo - app updates and push notification delivery.",
          "Google Maps Platform - maps and place search.",
          "PostHog - in-app product analytics.",
          "Sentry - crash and error reporting.",
          "AppsFlyer - install attribution and invite links.",
          "Resend - transactional emails such as booking confirmations.",
          "Klaviyo - our email waitlist and launch communications.",
          "GIPHY - GIF search in chats. Your search terms are sent to GIPHY.",
          "Vercel - hosting for our website and API.",
          "Google Analytics - with your permission, our website uses Google Analytics to understand visits, pages viewed, approximate location, device and browser information, and interactions such as scrolling and outbound link clicks. Google may process IP addresses to provide the service. We disable Google Signals and advertising personalization in our website configuration.",
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
    id: "analytics-cookies",
    title: "Analytics & Cookies",
    content: "On our website, we ask for your permission before loading Google Analytics. If you accept, Google Analytics stores identifiers in your browser and measures how you use our website. If you reject, the analytics tag does not load. You can revisit your choice through the Cookie Settings control in the website footer. Essential storage used for security or features you request does not require analytics consent.",
  },
  {
    id: "location-data",
    title: "Location Data & GPS",
    content: `Because RunCheck is a location-based service, we want to be especially transparent about how we handle location data:`,
    items: [
      "Location is used to verify court check-ins, show nearby courts and runs, and, if you turn it on, run Smart Auto Check-In.",
      "Smart Auto Check-In uses your location in the background only to notice when you arrive at or leave the courts you choose or are likely to visit. It does not record a continuous trail of where you go.",
      "Check-in records are tied to a specific court and time, not a continuous GPS history.",
      "We do not sell your location or use it for advertising.",
      "You can turn off Smart Auto Check-In in the app, or limit location access in your phone's settings at any time.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    items: [
      "Account data is kept while your account is active.",
      "Check-in history is kept to power leaderboards, reliability scores, and usual run times.",
      "Paid run booking and payment records are kept as long as needed for refunds, disputes, tax, and accounting, even after you delete your account.",
      "Waitlist email data is kept until you unsubscribe or request deletion.",
    ],
  },
  {
    id: "delete-account",
    title: "Deleting Your Account",
    items: [
      "In the app: open Settings and tap Delete Account. This permanently deletes your account and your profile, check-ins, schedules, run memberships, clips, reviews, reports, chats, and messages.",
      "Without the app: visit theruncheck.app/delete-account or email hello@theruncheck.app from the email on your account, and we will delete it for you.",
      "Some records may be kept after deletion where required by law or to handle refunds and disputes, as described above. Deleted clips may remain in backup storage for a short time before they are purged.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    items: [
      "Access - you may request a copy of the personal data we hold about you.",
      "Correction - you may update or correct your account information at any time.",
      "Deletion - you may delete your account in the app or request deletion as described above.",
      "Notifications - you can turn push notifications on or off in the app or your phone's settings.",
      "Opt-out of emails - marketing emails include an unsubscribe link. You may also email hello@theruncheck.app to opt out.",
      "Location - you may limit or revoke location permissions at any time through your device settings. Some features, like check-in, require location to work.",
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
    content: `We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, or misuse. Data is encrypted in transit. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, and you use the Service at your own risk.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. If we make material changes, we will notify you by email or through a notice in the app. Your continued use of the Service after changes are posted constitutes your acceptance of the revised policy.`,
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
    <div className="rc-sub bg-black text-white flex flex-col min-h-screen">
      <Nav activePath="/privacy" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-20 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{background:"radial-gradient(ellipse,rgba(243,96,37,.5) 0%,transparent 70%)"}} />
        <div className="relative z-10 max-w-2xl">
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
