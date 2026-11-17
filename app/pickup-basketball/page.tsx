import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CITIES, gymsIn } from "../../lib/cities";

export const metadata: Metadata = {
  title: "Pickup Basketball Near Austin, TX | RunCheck",
  description: "Find pickup basketball gyms and courts in Austin, Round Rock, Cedar Park and Pflugerville, with live player counts in the free RunCheck app.",
  alternates: { canonical: "https://www.theruncheck.app/pickup-basketball" },
};

export default function CitiesPage() {
  return (
    <div className="rc-sub min-h-screen">
      <Nav activePath="/pickup-basketball" />
      <main className="rc-city">
        <h1>
          Find a run
          <br />
          near Austin
        </h1>
        <p className="rc-city-intro">Every gym and court RunCheck tracks around Austin, city by city. Open the app to see how many players are at each one right now.</p>
        <div className="rc-city-grid">
          {CITIES.map((c) => (
            <Link key={c.slug} href={`/pickup-basketball/${c.slug}`} className="rc-city-card">
              <span className="rc-stamp">{gymsIn(c.name).length}</span>
              <strong>{c.name}</strong>
              <em>gyms and courts</em>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
