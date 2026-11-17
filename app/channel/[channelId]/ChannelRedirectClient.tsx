'use client';
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659';

type ChannelPreview = { name: string; description: string | null; photoUrl: string | null };

export default function ChannelRedirectClient({ channelId, preview }: { channelId: string; preview: ChannelPreview | null }) {
  const [opening, setOpening] = useState(false);
  const openApp = () => {
    setOpening(true);
    window.location.href = `runcheck://channel/${encodeURIComponent(channelId)}`;
    window.setTimeout(() => { window.location.href = APP_STORE_URL; }, 1800);
  };
  const name = preview?.name ?? 'a private Channel';
  return (
    <main className="rc-share">
      <Link href="/" className="rc-share-logo" aria-label="RunCheck home">
        <img src="/runcheck-logo.png" alt="RunCheck" />
      </Link>
      <section className="rc-share-card">
        {preview?.photoUrl ? (
          <img src={preview.photoUrl} alt="" className="rc-share-media" />
        ) : (
          <div className="rc-share-fallback"><Image src="/home/ball.webp" alt="" width={96} height={96} priority /></div>
        )}
        <div className="rc-share-body">
          <span className="rc-share-chip">Private Channel invite</span>
          <h1>Join {name}</h1>
          {preview?.description && <p className="rc-share-text">{preview.description}</p>}
          <p className="rc-share-text">Request access to see future Channel updates and runs.</p>
          <button type="button" onClick={openApp} className="rc-share-action">{opening ? 'Opening RunCheck…' : 'Request to join in RunCheck'}</button>
          <a href={APP_STORE_URL} className="rc-share-link">Don&apos;t have RunCheck? Get the app</a>
        </div>
      </section>
    </main>
  );
}
