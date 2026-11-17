// Shared by the run page and its link preview image.
import { cache } from 'react';

export const SITE_URL = 'https://theruncheck.app';
const PREVIEW_URL = 'https://us-central1-runcheck-567a3.cloudfunctions.net/getRunSharePreview';
export type RunPreview = {
  runId: string;
  title: string;
  gymName: string;
  startTime: string | null;
  description: string | null;
  photoUrl: string | null;
  visibility: 'invite_only' | 'public';
  isUpcoming: boolean;
  isPaid?: boolean;
  playerTotalCents?: number | null;
  priceCents?: number | null;
  spotsTaken?: number | null;
  capacity?: number | null;
  minToLock?: number | null;
  isLocked?: boolean;
  isFull?: boolean;
  areaLabel?: string | null;
};

const RUN_ID_RE = /^[A-Za-z0-9_-]{1,128}$/;

export const getRunPreview = cache(async (runId: string): Promise<RunPreview | null> => {
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

export function formatStartTime(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    // Link previews are built on the server, so pick the app's home time zone
    // instead of the server's UTC. The page itself re-formats in the viewer's zone.
    timeZone: 'America/Chicago', timeZoneName: 'short',
  }).format(date);
}

