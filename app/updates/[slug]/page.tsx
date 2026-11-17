import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { formatDate, getUpdate, getUpdates } from "../../../lib/updates";
import { Inline } from "../Inline";

const SITE_URL = "https://www.theruncheck.app";
const APP_STORE_URL = "https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659";

export const dynamicParams = false;

export function generateStaticParams() {
  return getUpdates().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUpdate(slug);
  if (!u) return {};
  const url = `${SITE_URL}/updates/${u.slug}`;
  const image = `${SITE_URL}${u.image}`;
  return {
    title: `${u.title} - RunCheck`,
    description: u.summary,
    alternates: { canonical: url },
    openGraph: { title: u.title, description: u.summary, url, siteName: "RunCheck", type: "article", publishedTime: u.date, images: [{ url: image, alt: u.title }] },
    twitter: { card: "summary_large_image", title: u.title, description: u.summary, images: [image] },
  };
}

export default async function UpdatePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUpdate(slug);
  if (!u) notFound();
  const more = getUpdates().filter((x) => x.slug !== u.slug).slice(0, 2);

  return (
    <div className="rc-sub min-h-screen">
      <Nav activePath="/updates" />

      <main className="rc-post">
        <Link href="/updates" className="rc-post-back">
          <ArrowLeft aria-hidden="true" /> All updates
        </Link>
        <time dateTime={u.date}>{formatDate(u.date)}</time>
        <h1>{u.title}</h1>
        <p className="rc-post-summary">{u.summary}</p>

        <div className="rc-post-img">
          <Image src={u.image} style={{ objectPosition: u.focus }} alt="" fill sizes="(max-width: 900px) 100vw, 860px" priority />
        </div>

        <article className="rc-post-body">
          {u.blocks.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i}>
                <Inline text={b.text} />
              </h2>
            ) : b.type === "ul" ? (
              <ul key={i}>
                {b.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i}>
                <Inline text={b.text} />
              </p>
            )
          )}
        </article>

        <div className="rc-post-cta">
          <p>Know the run before you go.</p>
          <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="rc-post-action">
            Download on the App Store
          </a>
        </div>

        {more.length > 0 && (
          <section className="rc-post-more" aria-label="More updates">
            <h2>More updates</h2>
            <div className="rc-update-grid">
              {more.map((x) => (
                <Link key={x.slug} href={`/updates/${x.slug}`} className="rc-update-card">
                  <div className="rc-update-img">
                    <Image src={x.image} style={{ objectPosition: x.focus }} alt="" fill sizes="(max-width: 700px) 100vw, 420px" />
                  </div>
                  <time dateTime={x.date}>{formatDate(x.date)}</time>
                  <h3>{x.title}</h3>
                  <p>{x.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
