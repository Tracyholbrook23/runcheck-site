import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { formatDate, getUpdates } from "../../lib/updates";

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

      <main className="rc-updates">
        <header className="rc-updates-head">
          <h1>Updates</h1>
          <p>What&apos;s new with RunCheck. New features, new partners, new gear.</p>
        </header>

        {first ? (
          <>
            <Link href={`/updates/${first.slug}`} className="rc-update-feature">
              <div className="rc-update-img">
                <Image src={first.image} style={{ objectPosition: first.focus }} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" priority />
              </div>
              <div className="rc-update-text">
                <time dateTime={first.date}>{formatDate(first.date)}</time>
                <h2>{first.title}</h2>
                <p>{first.summary}</p>
                <span className="rc-update-more">Read it</span>
              </div>
            </Link>

            {rest.length > 0 && (
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
            )}
          </>
        ) : (
          <p className="rc-updates-empty">Nothing here yet. Check back soon.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
