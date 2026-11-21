import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { formatDate, getUpdates } from "../../lib/updates";
import { RevealPhoto } from "../components/FullBleed";

export const metadata: Metadata = {
  title: "Updates - RunCheck",
  description: "What's new with RunCheck: new features, partners, merch and what's coming next.",
  alternates: { canonical: "https://www.theruncheck.app/updates" },
  openGraph: {
    title: "Updates - RunCheck",
    description: "What's new with RunCheck: new features, partners, merch and what's coming next.",
    url: "https://www.theruncheck.app/updates",
    siteName: "RunCheck",
    type: "website",
  },
};

export default function UpdatesPage() {
  const [first, ...rest] = getUpdates();

  return (
    <div className="rc-sub min-h-screen">
      <Nav activePath="/updates" />

      <main>
        <div className="rc-updates is-head">
          <header className="rc-updates-head">
            <h1>Updates</h1>
            <p>What&apos;s new with RunCheck. New features, new partners, new gear.</p>
          </header>
        </div>

        {first ? (
          <>
            <RevealPhoto src={first.image} alt="" pos={first.focus} href={`/updates/${first.slug}`} label={first.title}>
              <time dateTime={first.date} className="rc-fb-eyebrow">{formatDate(first.date)}</time>
              <h2 className="rc-fb-title is-md">{first.title}</h2>
              <p>{first.summary}</p>
              <span className="rc-fb-cta">Read it</span>
            </RevealPhoto>

            {rest.length > 0 && (
              <div className="rc-updates is-grid">
                <div className="rc-update-grid">
                  {rest.map((u) => (
                    <Link key={u.slug} href={`/updates/${u.slug}`} className="rc-update-card">
                      <div className="rc-update-img">
                        <Image src={u.image} style={{ objectPosition: u.focus }} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                      </div>
                      <time dateTime={u.date}>{formatDate(u.date)}</time>
                      <h2>{u.title}</h2>
                      <p>{u.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rc-updates is-grid">
            <p className="rc-updates-empty">Nothing here yet. Check back soon.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
