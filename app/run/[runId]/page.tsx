import type { Metadata } from 'next';
import { cache } from 'react';
import RunRedirectClient from './RunRedirectClient';

const SITE_URL = 'https://theruncheck.app';
const PREVIEW_URL = 'https://us-central1-runcheck-567a3.cloudfunctions.net/getRunSharePreview';

type RunPreview = {
  runId: string;
  title: string;
  gymName: string;
  startTime: string | null;
  description: string | null;
  photoUrl: string | null;
  visibility: 'invite_only' | 'public';
  isUpcoming: boolean;
};

const RUN_ID_RE = /^[A-Za-z0-9_-]{1,128}$/;

const getRunPreview = cache(async (runId: string): Promise<RunPreview | null> => {
  if (!RUN_ID_RE.test(runId)) return null;
  try {
    const response = await fetch(`${PREVIEW_URL}?runId=${encodeURIComponent(runId)}`, {
      next: { revalidate: 60 },
    });
    return response.ok ? (await response.json() as RunPreview) : null;
  } catch {
    // The landing page still gives the recipient a working App Store/open-app
    // path if the preview service has a brief network issue.
    return null;
  }
});

function formatStartTime(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ runId: string }>;
}): Promise<Metadata> {
  const { runId } = await params;
  const preview = await getRunPreview(runId);
  const title = preview ? `${preview.title} at ${preview.gymName}` : 'A run on RunCheck';
  const time = preview ? formatStartTime(preview.startTime) : null;
  const description = preview
    ? `${preview.visibility === 'invite_only' ? 'Private run' : 'Pickup basketball'}${time ? ` · ${time}` : ''}${preview.description ? ` — ${preview.description}` : ''}`
    : 'Someone shared a pickup basketball run with you on RunCheck. Open the app to see the details and request to join.';
  const url = `${SITE_URL}/run/${encodeURIComponent(runId)}`;
  const image = preview?.photoUrl ?? `${SITE_URL}/runcheck-logo1.png`;

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
