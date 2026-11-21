import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { StoreLink } from "../components/StoreLink";
import { FullBleedHero, RevealPhoto } from "../components/FullBleed";

export const metadata: Metadata = {
  title: "Host a Run - RunCheck",
  description: "Got access to a gym? Host paid pickup runs on RunCheck. Players book and pay in the app, and you get paid to your bank after the run.",
  alternates: { canonical: "https://www.theruncheck.app/host" },
  openGraph: {
    title: "Get paid to host your run - RunCheck",
    description: "Players book and pay in the app. No more chasing Cash App at the door.",
    url: "https://www.theruncheck.app/host",
    siteName: "RunCheck",
    type: "website",
    images: [{ url: "https://www.theruncheck.app/photos/rr/rr-organize.webp", alt: "A host getting the run organized at Round Rock Sports Center" }],
  },
};

const PERKS = [
  { title: "You set the numbers", body: "You set the price, the player cap, and the minimum you need to cover the court." },
  { title: "No more chasing money", body: "Players book and pay in the app. No more chasing Cash App at the door." },
  { title: "Nobody's out a dime", body: "If the run doesn't fill, everyone's refunded automatically. Nobody's out a dime." },
  { title: "You pick who plays", body: "Let in anyone who pays, or approve each player yourself." },
  { title: "Paid after every run", body: "You get paid straight to your bank after the run." },
  { title: "Spots don't go to waste", body: "If a player gives up their spot and someone else takes it, you get paid for the new player." },
];

const STEPS = [
  { n: "01", title: "Apply in the app", body: "Open RunCheck and tap Host paid runs on your Profile. Tell us your gym, how you get court access, how often you run, your usual player count and price, and your Instagram." },
  { n: "02", title: "Set up payouts", body: "Once you're approved, add the bank you want paid to. Our payments partner Stripe verifies your ID. RunCheck never sees your ID or full account number. Takes about 5 minutes." },
  { n: "03", title: "Post your run", body: "Set the time, price, player cap and the minimum you need. Share the link in your group chat or on your Instagram." },
  { n: "04", title: "Hoop, then get paid", body: "Players' cards are only charged once the run locks. After the run, the 24-hour report window closes and your money goes to your bank." },
];

export default function HostPage() {
  return (
    <div className="rc-sub min-h-screen">
      <Nav activePath="/host" />

      <main>
      <FullBleedHero src="/photos/rr/rr-organize.webp" alt="A host getting the run organized at Round Rock Sports Center" pos="52% 45%">
        <h1>Get paid to host your run.</h1>
        <p>Got access to a gym? Players book and pay in RunCheck, the run only happens if enough people join, and you get paid to your bank after the run.</p>
        <div className="rc-host-actions">
          <StoreLink placement="host_hero" className="rc-host-action">Get RunCheck to apply</StoreLink>
          <a href="#fees" className="rc-host-ghost">See the fees</a>
        </div>
      </FullBleedHero>

      <div className="rc-host is-after">
        <section className="rc-host-section">
          <h2>Why hosts use it</h2>
          <div className="rc-host-perks">
            {PERKS.map((p) => (
              <article key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <RevealPhoto src="/photos/rr/rr-dunk.webp" alt="A dunk at Round Rock Sports Center" pos="50% 42%">
        <p className="rc-fb-eyebrow">Paid runs</p>
        <h2 className="rc-fb-title is-md">The court gets paid for before anybody steps on it.</h2>
      </RevealPhoto>

      <div className="rc-host is-after">
        <section className="rc-host-section">
          <h2>How it works</h2>
          <ol className="rc-host-steps">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="rc-stamp">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="fees" className="rc-host-sheet">
          <div className="rc-host-fees-copy">
            <h2>What it costs</h2>
            <p>No monthly fee and nothing up front. RunCheck keeps 8% of your price, with a 60 cent minimum per player. Players add a 3% service fee at checkout.</p>
            <p className="rc-host-fine">If you cancel after a run locks, the card fees RunCheck still pays on those refunds (about 2.9% + 30 cents per player) come out of your next payout. Your first 5 runs are paid out after 48 hours instead of 24.</p>
          </div>
          <div className="rc-host-math" aria-label="Example: a 10 dollar run">
            <p className="rc-host-math-head">Example: a $10 run</p>
            <dl>
              <div><dt>Your price</dt><dd>$10.00</dd></div>
              <div><dt>Player pays</dt><dd>$10.30</dd></div>
              <div><dt>You earn per player</dt><dd className="rc-stamp">$9.20</dd></div>
              <div><dt>15 players</dt><dd className="rc-stamp">$138.00</dd></div>
            </dl>
          </div>
        </section>
      </div>

      <RevealPhoto src="/photos/rr/rr-wall-jumper.webp" alt="A jump shot in front of the Round Rock Sports Center wall" pos="50% 40%">
        <p className="rc-fb-eyebrow">Open Run Elite</p>
        <h2 className="rc-fb-title is-md">Already running in Round Rock</h2>
        <p>Open Run Elite rents the court at Round Rock Sports Center and splits the cost with everybody who plays. Now players book and pay in RunCheck, and nobody has to chase anybody for money.</p>
        <p>
          <Link href="/updates/open-run-elite" className="rc-host-link">Read their story</Link>
          <span aria-hidden="true">  ·  </span>
          <a href="https://www.instagram.com/open.run.elite/" target="_blank" rel="noreferrer" className="rc-host-link">@open.run.elite</a>
        </p>
      </RevealPhoto>

      <div className="rc-host is-after is-last">
        <section className="rc-host-section">
          <h2>The rules we hold hosts to</h2>
          <ul className="rc-host-rules">
            <li>You need the right to use the court, and you follow the venue&apos;s rules.</li>
            <li>Your price is final. Don&apos;t charge players again at the door for a spot they paid for in the app.</li>
            <li>If you don&apos;t show up to a locked run, players are refunded in full and your payout for that run is cancelled.</li>
            <li>If you change the date, time or place, players can leave with a full refund.</li>
          </ul>
          <p className="rc-host-fine">
            Every detail is in the <Link href="/refunds#hosts">Host Agreement</Link> and the <Link href="/terms">Terms of Service</Link>.
          </p>
        </section>

        <section className="rc-host-cta">
          <h2>Got a gym? Get it on RunCheck.</h2>
          <p>Apply from your Profile in the app. Don&apos;t see the option yet, or have questions first? <Link href="/contact">Reach out</Link> and we&apos;ll get you set up.</p>
          <StoreLink placement="host_bottom" className="rc-host-action">Get RunCheck to apply</StoreLink>
        </section>
      </div>
      </main>

      <Footer />
    </div>
  );
}
