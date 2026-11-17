import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import OpenCircleButton from './OpenCircleButton';

const PREVIEW_URL = 'https://us-central1-runcheck-567a3.cloudfunctions.net/getCircleSharePreview';
type CirclePreview = { circleId: string; name: string; description: string | null; photoUrl: string | null };

async function getPreview(circleId: string): Promise<CirclePreview | null> {
  try {
    const response = await fetch(`${PREVIEW_URL}?circleId=${encodeURIComponent(circleId)}`, { next: { revalidate: 60 } });
    return response.ok ? response.json() : null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ circleId: string }> }): Promise<Metadata> {
  const { circleId } = await params; const preview = await getPreview(circleId);
  const title = preview ? `Join ${preview.name} on RunCheck` : 'Join a RunCheck Circle';
  const description = preview?.description || 'A private basketball community on RunCheck. Request access to join future runs.';
  return { title, description, openGraph: { title, description, images: preview?.photoUrl ? [{ url: preview.photoUrl }] : [] }, twitter: { card: preview?.photoUrl ? 'summary_large_image' : 'summary', title, description, images: preview?.photoUrl ? [preview.photoUrl] : [] } };
}

export default async function CircleInvitePage({ params }: { params: Promise<{ circleId: string }> }) {
  const { circleId } = await params; const preview = await getPreview(circleId);
  const name = preview?.name || 'a private Circle';
  return (
    <main className="rc-share">
      <Link href="/" className="rc-share-logo" aria-label="RunCheck home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/runcheck-logo.png" alt="RunCheck" />
      </Link>
      <section className="rc-share-card">
        <div className="rc-share-body rc-share-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {preview?.photoUrl && <img src={preview.photoUrl} alt="Circle photo" className="rc-share-avatar" />}
          <span className="rc-share-chip"><Lock size={13} strokeWidth={2.5} aria-hidden="true" /> Private RunCheck Circle</span>
          <h1>{name}</h1>
          {preview?.description && <p className="rc-share-text" style={{ color: '#F2EFE7' }}>{preview.description}</p>}
          <p className="rc-share-text">You&apos;re being invited to join this ongoing basketball community, not just one run. Request access and the Circle owner decides who joins.</p>
          <OpenCircleButton circleId={circleId} />
        </div>
      </section>
    </main>
  );
}
