import Link from "next/link";

const PRIVACY_URL =
  "https://gray-marlin-55c.notion.site/RunCheck-Privacy-Policy-3280818539eb80168b7cc7dd061f3d09";

const INSTAGRAM_URL = "https://www.instagram.com/run.check?igsh=dWdieWZteXlvd21k&utm_source=qr";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 px-6 py-14 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <img src="/runcheck-logo.png" alt="RunCheck" className="h-10 w-auto" />
            <span className="text-xs text-zinc-600">Find pickup basketball runs near you</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RunCheck on Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-500 hover:shadow-[0_0_12px_rgba(249,115,22,.2)] transition-all"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-zinc-900">
          <p className="text-xs text-zinc-700">© {new Date().getFullYear()} RunCheck. All rights reserved.</p>
          <p className="text-xs text-zinc-700">Austin, TX</p>
        </div>
      </div>
    </footer>
  );
}
