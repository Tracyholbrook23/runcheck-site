import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Delete Your Account - RunCheck",
  description: "How to delete your RunCheck account and the data connected to it.",
};

const SUPPORT_EMAIL = "hello@theruncheck.app";
const MAIL_SUBJECT = encodeURIComponent("Delete my RunCheck account");
const MAIL_BODY = encodeURIComponent(
  "Please delete my RunCheck account.\n\nUsername:\nEmail on my account:\n"
);

const inAppSteps = [
  "Open the RunCheck app and sign in.",
  "Go to your profile and open Settings.",
  "Scroll to the bottom and tap Delete Account.",
  "Confirm. Your account is deleted right away.",
];

const deleted = [
  "Your account and sign-in",
  "Your profile, username, and photo",
  "Check-ins, schedules, and run memberships",
  "Clips, posts, gym reviews, and reports",
  "Chats and messages you sent",
  "Your spot on leaderboards",
];

const kept = [
  "Paid run booking and payment records, kept as long as needed for refunds, disputes, tax, and accounting.",
  "Deleted clips may stay in backup storage for a short time before they are purged.",
];

export default function DeleteAccount() {
  return (
    <div className="rc-sub bg-black text-white flex flex-col min-h-screen">
      <Nav activePath="/delete-account" />

      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-16 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-20"
          style={{ background: "radial-gradient(ellipse,rgba(243,96,37,.5) 0%,transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">Delete Your Account</h1>
          <p className="text-zinc-400 text-base">You can delete your RunCheck account at any time, in the app or by asking us.</p>
        </div>
      </section>

      <div className="w-full border-t border-zinc-800/60" />

      <div className="max-w-3xl mx-auto px-6 py-16 w-full flex flex-col gap-12">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5">Delete it in the app</h2>
          <ol className="flex flex-col gap-3">
            {inAppSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-sm text-zinc-300 leading-7">
                <span className="text-[11px] font-bold text-orange-500 mt-1.5 w-5 flex-shrink-0">{i + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="border-t border-zinc-800/60" />

        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-5">No longer have the app?</h2>
          <p className="text-zinc-300 text-sm leading-7 mb-5">
            Email us from the email address on your account and we will delete it for you, usually within 7 days.
            Include your username so we can find the right account.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`}
            className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm px-6 py-3 rounded-xl transition-colors"
          >
            Email a deletion request
          </a>
          <p className="text-zinc-500 text-sm mt-3">{SUPPORT_EMAIL}</p>
        </div>

        <div className="border-t border-zinc-800/60" />

        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-orange-400 mb-3">What gets deleted</h3>
            <ul className="flex flex-col gap-2.5">
              {deleted.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 leading-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-orange-400 mb-3">What we may keep</h3>
            <ul className="flex flex-col gap-2.5">
              {kept.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300 leading-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 flex-shrink-0 mt-2.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-zinc-500 text-sm leading-7">
          More details are in our <a href="/privacy#delete-account" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">Privacy Policy</a>.
        </p>
      </div>

      <Footer />
    </div>
  );
}
