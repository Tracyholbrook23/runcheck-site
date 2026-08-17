import type { Metadata } from 'next';
import { cache } from 'react';
import ChannelRedirectClient from './ChannelRedirectClient';

const SITE_URL = 'https://theruncheck.app';
const PREVIEW_URL = 'https://us-central1-runcheck-567a3.cloudfunctions.net/getChannelSharePreview';

type ChannelPreview = {
  channelId: string;
  name: string;
  description: string | null;
  photoUrl: string | null;
};

const CHANNEL_ID_RE = /^[A-Za-z0-9_-]{1,128}$/;

const getChannelPreview = cache(async (channelId: string): Promise<ChannelPreview | null> => {
  if (!CHANNEL_ID_RE.test(channelId)) return null;
  try {
    const response = await fetch(`${PREVIEW_URL}?channelId=${encodeURIComponent(channelId)}`, {
      next: { revalidate: 60 },
    });
    return response.ok ? (await response.json() as ChannelPreview) : null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ channelId: string }> }): Promise<Metadata> {
  const { channelId } = await params;
  const preview = await getChannelPreview(channelId);
  const title = preview ? `Join ${preview.name} on RunCheck` : 'Join a Channel on RunCheck';
  const description = preview?.description
    ? `Join ${preview.name}: ${preview.description}`
    : 'Someone invited you to join their private RunCheck Channel.';
  const url = `${SITE_URL}/channel/${encodeURIComponent(channelId)}`;
  const image = preview?.photoUrl ?? `${SITE_URL}/runcheck-logo1.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'RunCheck', type: 'website', images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function ChannelPage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = await params;
  return <ChannelRedirectClient channelId={channelId} preview={await getChannelPreview(channelId)} />;
}
