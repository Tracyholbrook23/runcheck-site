import type { MetadataRoute } from "next";

const BASE_URL = "https://www.theruncheck.app";

const routes = ["", "/about", "/how-it-works", "/contact", "/merch", "/sponsors", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));
}
