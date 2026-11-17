import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { StoreLink } from "../../components/StoreLink";
import { CITIES, gymsIn, mapsLink } from "../../../lib/cities";

const SITE = "https://www.theruncheck.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = CITIES.find((x) => x.slug === city);
  if (!c) return {};
  const count = gymsIn(c.name).length;
  const title = `Pickup Basketball in ${c.name}, TX - ${count} Gyms and Courts | RunCheck`;
  const description = `Find pickup basketball in ${c.name}, Texas. ${count} gyms and outdoor courts, with live player counts in the free RunCheck app.`;
  const url = `${SITE}/pickup-basketball/${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "RunCheck", type: "website", images: [{ url: `${SITE}/photos/rr/rr-shootaround.webp` }] },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = CITIES.find((x) => x.slug === city);
  if (!c) notFound();
  const list = gymsIn(c.name);
  const indoor = list.filter((g) => g.type === "indoor");
  const outdoor = list.filter((g) => g.type !== "indoor");
  const others = CITIES.filter((x) => x.slug !== c.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Pickup basketball gyms and courts in ${c.name}, TX`,
    itemListElement: list.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "SportsActivityLocation", name: g.name, address: g.address },
    })),
  };

  return (
    <div className="rc-sub min-h-screen">
      <Nav activePath="/pickup-basketball" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <main className="rc-city">
        <Link href="/pickup-basketball" className="rc-post-back">All cities</Link>
        <h1>
          Pickup basketball
          <br />
          in {c.name}
        </h1>
        <p className="rc-city-intro">{c.intro}</p>
        <div className="rc-city-count">
          <span className="rc-stamp">{list.length}</span> gyms and courts on RunCheck in {c.name}
        </div>

        {c.extra && (
          <Link href={c.extra.href} className="rc-city-extra">
            <span>{c.extra.text}</span>
            <strong>{c.extra.label}</strong>
          </Link>
        )}

        {[
          { title: "Indoor gyms", items: indoor },
          { title: "Outdoor courts", items: outdoor },
        ]
          .filter((s) => s.items.length)
          .map((s) => (
            <section key={s.title} className="rc-city-section">
              <h2>{s.title}</h2>
              <ul className="rc-city-list">
                {s.items.map((g) => (
                  <li key={g.name + g.address}>
                    <div>
                      <h3>{g.name}</h3>
                      <p>{g.address}</p>
                    </div>
                    <a href={mapsLink(g)} target="_blank" rel="noreferrer" aria-label={`Directions to ${g.name}`}>
                      <MapPin aria-hidden="true" /> Map
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

        <section className="rc-host-cta rc-city-cta">
          <h2>See who&apos;s playing right now</h2>
          <p>Live player counts, check-ins and runs forming at every gym on this page. Free on iPhone.</p>
          <StoreLink placement={`city_${c.slug}`} className="rc-host-action">Get RunCheck</StoreLink>
          <p className="rc-host-fine" style={{ marginTop: "1.4rem", marginBottom: 0 }}>
            Gyms set their own rules, hours and fees. Missing a court? <Link href="/contact">Tell us</Link>.
          </p>
        </section>

        <nav className="rc-city-others" aria-label="Other cities">
          <span>More cities:</span>
          {others.map((o) => (
            <Link key={o.slug} href={`/pickup-basketball/${o.slug}`}>
              {o.name}
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </div>
  );
}
