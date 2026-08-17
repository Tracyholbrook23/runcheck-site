import type { Metadata } from 'next';
import { cache } from 'react';
import PostRedirectClient from './PostRedirectClient';

const SITE_URL = 'https://theruncheck.app';
const PREVIEW_URL = 'https://us-central1-runcheck-567a3.cloudfunctions.net/getCommunityPostSharePreview';

type PostPreview = { postId: string; body: string; authorName: string; mediaUrl: string | null; mediaType: 'image' | 'gif' | null };
const POST_ID_RE = /^[A-Za-z0-9_-]{1,128}$/;

const getPostPreview = cache(async (postId: string): Promise<PostPreview | null> => {
  if (!POST_ID_RE.test(postId)) return null;
  try {
    const response = await fetch(`${PREVIEW_URL}?postId=${encodeURIComponent(postId)}`, { next: { revalidate: 60 } });
    return response.ok ? (await response.json() as PostPreview) : null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ postId: string }> }): Promise<Metadata> {
  const { postId } = await params;
  const preview = await getPostPreview(postId);
  const title = preview ? `${preview.authorName} on RunCheck` : 'A post on RunCheck';
  const description = preview?.body ?? 'Someone shared a pickup basketball post with you on RunCheck.';
  const url = `${SITE_URL}/post/${encodeURIComponent(postId)}`;
  const image = preview?.mediaUrl ?? `${SITE_URL}/runcheck-logo1.png`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'RunCheck', type: 'article', images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  return <PostRedirectClient postId={postId} preview={await getPostPreview(postId)} />;
}
