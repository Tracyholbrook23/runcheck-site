import type { Metadata } from 'next';
import { SITE_URL, formatStartTime, getRunPreview } from '../../../lib/runPreview';
import RunRedirectClient from './RunRedirectClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ runId: string }>;
}): Promise<Metadata> {
  const { runId } = await params;
  const preview = await getRunPreview(runId);
  const title = preview ? `${preview.title} at ${preview.gymName}` : 'A run on RunCheck';
  const time = preview ? formatStartTime(preview.startTime) : null;
  const headline = preview?.priceCents ?? preview?.playerTotalCents ?? null;
  const price = preview?.isPaid && headline != null ? `$${headline % 100 === 0 ? headline / 100 : (headline / 100).toFixed(2)} to play` : null;
  const spotsLeft = preview?.isPaid && preview.capacity ? Math.max(0, preview.capacity - (preview.spotsTaken ?? 0)) : null;
  const description = preview
    ? [
      preview.isPaid ? 'Paid run' : preview.visibility === 'invite_only' ? 'Private run' : 'Pickup basketball',
      time,
      price,
      spotsLeft != null ? (spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full') : null,
      preview.areaLabel,
    ].filter(Boolean).join(' · ') + (preview.description ? ` - ${preview.description}` : '')
    : 'Someone shared a pickup basketball run with you on RunCheck. Open the app to see the details and request to join.';
  const url = `${SITE_URL}/run/${encodeURIComponent(runId)}`;
  // A branded card with the gym, time and price, so every shared run looks like an invite.
  const image = `${SITE_URL}/run/${encodeURIComponent(runId)}/og`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'RunCheck',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function RunPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const preview = await getRunPreview(runId);
  return <RunRedirectClient runId={runId} preview={preview ? { ...preview, formattedStartTime: formatStartTime(preview.startTime) } : null} />;
}
