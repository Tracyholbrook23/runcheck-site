import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Refund Policy - RunCheck",
  description:
    "How paying for a run on RunCheck works: card holds, when you're charged, leaving a run, refunds, and what hosts agree to.",
};

const LAST_UPDATED = "October 13, 2026";

const SUMMARY =
  "You're only charged if the run locks. Free to leave until then. After it locks, your spot is paid, and you get a full refund if the host cancels.";

const sections = [
  {
    id: "how-paying-works",
    title: "How Paying for a Run Works",
    content: `When you join a paid run, we put a hold on your card for the full price: the run price plus a small service fee. A hold is not a charge. You're only charged when the run locks, which happens when enough players join to meet the host's minimum, or when the host decides to lock it early. If the run never locks, the hold drops off and you pay nothing.`,
    items: [
      "If you join a run that has already locked, your card is charged right away.",
      "You'll get an email when you join and another when the run locks, with the run details and what you paid.",
    ],
  },
  {
    id: "leaving",
    title: "Leaving Before the Run Locks",
    content: `You can leave for free anytime before the run locks. Tap Leave on the run in the RunCheck app. We release the hold right away. Depending on your bank, it can take a few days to disappear from your statement.`,
  },
  {
    id: "after-lock",
    title: "After the Run Locks",
    content: `Once a run locks, your payment is final. The host is counting on that money to pay for the court, so there's no refund button. If you can't make it, let the host know in the run chat.`,
    items: [
      "We're adding more options, like giving your spot to a player on the waitlist. This page will be updated when they're live.",
    ],
  },
  {
    id: "full-refunds",
    title: "When You Get a Full Refund",
    content: "You get everything back, service fee included, when:",
    items: [
      "The host cancels the run. Every player is refunded in full automatically.",
      "The run didn't happen (the host didn't show, or the gym was locked) and you report it in time. See Something Went Wrong below.",
    ],
    subsections: [
      {
        title: "If the run doesn't lock",
        items: [
          "If not enough players join by the host's cutoff, the run cancels and nobody is charged. The hold on your card is released.",
        ],
      },
    ],
  },
  {
    id: "service-fee",
    title: "The Service Fee",
    content: `The service fee (3% of the run price) covers payment processing and keeping RunCheck running. It's included in the price you see before you join. It's refunded when the host cancels or when a run didn't happen.`,
  },
  {
    id: "no-shows",
    title: "No-Shows",
    content: `If you don't show up to a locked run, there's no refund.`,
  },
  {
    id: "problems",
    title: "Something Went Wrong",
    content: `If the host didn't show, the gym was locked, or you were charged for something that's not right, email us within 24 hours after the run's end time. Hosts aren't paid until after that window, so we can still fix it. We'll look at the roster, check-ins and anything else we have, and get back to you.`,
    contact: {
      email: "support@theruncheck.app",
      address: "Include the run name, the date and what happened.",
    },
  },
  {
    id: "timing",
    title: "How Long Refunds Take",
    content: `Refunds go back to the card or Apple Pay you used. They usually show up in 5 to 10 business days, depending on your bank.`,
  },
  {
    id: "chargebacks",
    title: "Chargebacks",
    content: `Please contact us before you dispute a charge with your bank. Most problems are faster to fix through us. Disputing a charge for a run you attended may get your account suspended.`,
  },
  {
    id: "role",
    title: "RunCheck's Role",
    content: `Runs are organized by independent hosts, not by RunCheck. RunCheck collects payments for the host, holds them until after the run, and handles refunds under this policy. The host is responsible for the court, the run itself and what happens there. See our Terms of Service for more.`,
  },
  {
    id: "hosts",
    title: "Host Agreement",
    content: "By hosting paid runs on RunCheck, you agree that:",
    items: [
      "You have the right to use the court for the time and place you list.",
      "If you can't run it, you cancel in the app as early as you can. Every player is refunded in full automatically. Not showing up is not the same as cancelling.",
      "If you don't show up to a locked run, players are refunded in full, your payout for that run is cancelled, and your hosting account may be frozen.",
      "Cancelling after a run locks lowers your host reliability score.",
      "You're paid after the run, once the 24-hour report window closes. Your first 5 runs are held for 48 hours. If a player reports a problem, we may hold your payout for that run until it's sorted out.",
      "Your price is final. Don't ask players who paid in the app to pay again in person, and don't charge anyone twice for the same spot.",
      "You're responsible for your run: the court, following the venue's rules, and keeping the run safe.",
      "You're responsible for reporting your earnings for taxes.",
      "RunCheck keeps 8% of your price (60 cents minimum per player) from each paid player. Players also pay RunCheck a 3% service fee.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: "Questions about a payment or a refund? Reach out and a real person will get back to you.",
    contact: {
      email: "support@theruncheck.app",
      address: "RunCheck · Austin, TX",
    },
  },
];

export default function Refunds() {
  return (
    <div className="era-subpage bg-black text-white flex flex-col min-h-screen">
      <Nav activePath="/refunds" />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-20 overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse,rgba(243,96,37,.5) 0%,transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-widest text-orange-500 mb-4">
            Paid Runs
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Refund and Cancellation Policy
          </h1>
          <p className="text-zinc-300 text-base mb-3">
            {SUMMARY}
          </p>
          <p className="text-zinc-400 text-base">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="w-full border-t border-zinc-800/60" />

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-16 w-full">

        {/* Table of contents */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-4">
            Contents
          </p>
          <ol className="flex flex-col gap-2">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="text-zinc-700 text-[11px] w-4 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <span className="group-hover:underline underline-offset-2">
                    {s.title}
                  </span>
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
                <span className="text-[11px] font-bold text-orange-500 mt-1.5 flex-shrink-0 w-5">
                  {i + 1}.
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="pl-9 flex flex-col gap-5">
                {section.content && (
                  <p className="text-zinc-300 text-sm leading-7">
                    {section.content}
                  </p>
                )}

                {section.items && (
                  <ul className="flex flex-col gap-2.5">
                    {section.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-zinc-300 leading-7"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.subsections &&
                  section.subsections.map((sub, si) => (
                    <div key={si} className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest text-[11px]">
                        {sub.title}
                      </h3>
                      <ul className="flex flex-col gap-2.5">
                        {sub.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm text-zinc-300 leading-7"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0 mt-2.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {section.contact && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
                    <a
                      href={`mailto:${section.contact.email}`}
                      className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
                    >
                      {section.contact.email}
                    </a>
                    <p className="text-zinc-500 text-sm">
                      {section.contact.address}
                    </p>
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
