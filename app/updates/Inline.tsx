import Link from "next/link";
import { Fragment } from "react";

/* Turns **bold** and [text](url) inside a line into elements. No raw HTML. */
export function Inline({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(<Fragment key={k++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1]) {
      parts.push(<strong key={k++}>{m[1]}</strong>);
    } else {
      const href = m[3];
      parts.push(
        href.startsWith("/") ? (
          <Link key={k++} href={href}>
            {m[2]}
          </Link>
        ) : (
          <a key={k++} href={href} target="_blank" rel="noreferrer">
            {m[2]}
          </a>
        )
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<Fragment key={k++}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
