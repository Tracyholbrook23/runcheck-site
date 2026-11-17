import fs from "node:fs";
import path from "node:path";

/*
 * Updates live as markdown files in /updates at the project root.
 * Read at build time, so every post is a static page.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "gallery"; images: { src: string; alt: string }[] };

export type Update = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  image: string;
  focus: string; // CSS object-position for the photo crop
  summary: string;
  blocks: Block[];
};

const DIR = path.join(process.cwd(), "updates");

function parse(slug: string, raw: string): Update {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  let body = raw;
  if (match) {
    body = match[2];
    for (const line of match[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }

  const blocks: Block[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let gallery: { src: string; alt: string }[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    if (list.length) blocks.push({ type: "ul", items: list });
    if (gallery.length) blocks.push({ type: "gallery", images: gallery });
    para = [];
    list = [];
    gallery = [];
  };
  for (const rawLine of body.split("\n")) {
    const line = rawLine.trim();
    const img = line.match(/^!\[(.*?)\]\((.+?)\)$/);
    if (!line) {
      if (!gallery.length) flush();
    } else if (img) {
      if (para.length || list.length) flush();
      gallery.push({ alt: img[1], src: img[2] });
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      if (para.length || gallery.length) flush();
      list.push(line.slice(2));
    } else {
      if (list.length || gallery.length) flush();
      para.push(line);
    }
  }
  flush();

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "2026-01-01",
    image: meta.image || "/photos/pickup-night.webp",
    focus: meta.focus || "50% 50%",
    summary: meta.summary || "",
    blocks,
  };
}

export function getUpdates(): Update[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .map((f) => parse(f.replace(/\.md$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getUpdate(slug: string): Update | undefined {
  return getUpdates().find((u) => u.slug === slug);
}

export function formatDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
