'use client';
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
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
    <main style={{ background: '#080B10', minHeight: '100vh', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', padding: '32px 20px', display: 'grid', placeItems: 'center' }}>
      <section style={{ width: '100%', maxWidth: 480, background: '#121821', border: '1px solid #273243', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,.38)' }}>
        {preview?.photoUrl ? <img src={preview.photoUrl} alt="" style={{ width: '100%', height: 190, objectFit: 'cover', display: 'block' }} /> : <div style={{ height: 142, background: 'linear-gradient(135deg, #FA5B70, #5132A8)', display: 'grid', placeItems: 'center' }}><Image src="/runcheck-logo1.png" alt="RunCheck" width={88} height={88} style={{ borderRadius: 20 }} priority /></div>}
        <div style={{ padding: 24 }}>
          <div style={{ color: '#FF7184', fontSize: 12, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Private Channel invitation</div>
          <h1 style={{ fontSize: 28, lineHeight: 1.12, margin: 0 }}>Join {name}</h1>
          {preview?.description && <p style={{ margin: '18px 0 0', color: '#AAB6C8', lineHeight: 1.5 }}>{preview.description}</p>}
          <p style={{ margin: '18px 0 0', color: '#D5DCE8', lineHeight: 1.5 }}>Request access to see future Channel updates and runs.</p>
          <button type="button" onClick={openApp} style={{ width: '100%', marginTop: 24, border: 0, borderRadius: 14, background: '#FA5B70', color: '#fff', padding: '16px 18px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>{opening ? 'Opening RunCheck…' : 'Request to join in RunCheck'}</button>
          <a href={APP_STORE_URL} style={{ display: 'block', marginTop: 16, textAlign: 'center', color: '#AAB6C8', fontSize: 14 }}>Don&apos;t have RunCheck? Get the app</a>
        </div>
      </section>
    </main>
  );
}
