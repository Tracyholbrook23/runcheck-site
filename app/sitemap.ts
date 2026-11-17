import type { MetadataRoute } from "next";
import { getUpdates } from "../lib/updates";
import { CITIES } from "../lib/cities";

const BASE_URL = "https://www.theruncheck.app";

const routes = ["", "/about", "/how-it-works", "/contact", "/merch", "/sponsors", "/host", "/updates", "/pickup-basketball", "/privacy", "/terms", "/refunds"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...routes.map((route) => ({ url: `${BASE_URL}${route}`, lastModified })),
    ...CITIES.map((c) => ({ url: `${BASE_URL}/pickup-basketball/${c.slug}`, lastModified })),
    ...getUpdates().map((u) => ({ url: `${BASE_URL}/updates/${u.slug}`, lastModified: new Date(`${u.date}T12:00:00Z`) })),
  ];
}
