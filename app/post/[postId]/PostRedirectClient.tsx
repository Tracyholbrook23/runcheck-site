'use client';
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659';
type PostPreview = { body: string; authorName: string; mediaUrl: string | null };

export default function PostRedirectClient({ postId, preview }: { postId: string; preview: PostPreview | null }) {
  const [opening, setOpening] = useState(false);
  const openApp = () => {
    setOpening(true);
    window.location.href = `runcheck://post/${encodeURIComponent(postId)}`;
    window.setTimeout(() => { window.location.href = APP_STORE_URL; }, 1800);
  };
  return (
    <main className="rc-share">
      <Link href="/" className="rc-share-logo" aria-label="RunCheck home">
        <img src="/runcheck-logo.png" alt="RunCheck" />
      </Link>
      <section className="rc-share-card">
        {preview?.mediaUrl ? (
          <img src={preview.mediaUrl} alt="" className="rc-share-media" style={{ height: 'auto', maxHeight: 360 }} />
        ) : (
          <div className="rc-share-fallback"><Image src="/home/ball.webp" alt="" width={96} height={96} priority /></div>
        )}
        <div className="rc-share-body">
          <span className="rc-share-chip">RunCheck community</span>
          <p className="rc-share-author">{preview?.authorName ?? 'A RunCheck player'}</p>
          <h1 className="rc-share-post" style={{ fontFamily: 'inherit', textTransform: 'none', fontSize: '1.25rem', lineHeight: 1.45 }}>{preview?.body ?? 'A basketball community post was shared with you.'}</h1>
          <button type="button" onClick={openApp} className="rc-share-action">{opening ? 'Opening RunCheck…' : 'Open post in RunCheck'}</button>
          <a href={APP_STORE_URL} className="rc-share-link">Don&apos;t have RunCheck? Get the app</a>
        </div>
      </section>
    </main>
  );
}
