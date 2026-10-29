'use client';
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { useState, useSyncExternalStore } from 'react';
import { MapPin, Clock, Users, ShieldCheck } from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659';

type RunPreview = {
  title: string;
  gymName: string;
  startTime: string | null;
  formattedStartTime: string | null;
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

const money = (cents: number) => `$${cents % 100 === 0 ? cents / 100 : (cents / 100).toFixed(2)}`;
const noopSubscribe = () => () => {};
function localTime(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
  }).format(d);
}

export default function RunRedirectClient({ runId, preview }: { runId: string; preview: RunPreview | null }) {
  const [opening, setOpening] = useState(false);
  // Server text uses Central time; in the browser, show the viewer's own zone.
  const when = useSyncExternalStore(
    noopSubscribe,
    () => localTime(preview?.startTime ?? null) ?? preview?.formattedStartTime ?? null,
    () => preview?.formattedStartTime ?? null,
  );

  // Universal links open the app straight from the shared link. This button
  // covers browsers that didn't hand it off (or someone who just installed).
  const openApp = () => {
    setOpening(true);
    window.location.href = `runcheck://run/${encodeURIComponent(runId)}`;
    window.setTimeout(() => setOpening(false), 2500);
  };

  const title = preview?.title ?? 'A basketball run was shared with you';
  const status = preview?.isUpcoming === false ? 'This run is no longer available.' : null;
  const paid = preview?.isPaid === true && preview.playerTotalCents != null;
  const spotsLeft = paid && preview?.capacity ? Math.max(0, preview.capacity - (preview.spotsTaken ?? 0)) : null;
  const kicker = paid ? 'Paid run' : preview?.visibility === 'invite_only' ? 'Private run invitation' : 'Pickup basketball';
  const line = { margin: '8px 0 0', color: '#D5DCE8', fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 } as const;

  return (
    <main style={{ background: '#080B10', minHeight: '100vh', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', padding: '32px 20px', display: 'grid', placeItems: 'center' }}>
      <section style={{ width: '100%', maxWidth: 480, background: '#121821', border: '1px solid #273243', borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,.38)' }}>
        {preview?.photoUrl ? (
          <img src={preview.photoUrl} alt="" style={{ width: '100%', height: 190, objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ height: 142, background: 'linear-gradient(135deg, #FA5B70, #5132A8)', display: 'grid', placeItems: 'center' }}>
            <Image src="/runcheck-logo1.png" alt="RunCheck" width={88} height={88} style={{ borderRadius: 20 }} priority />
          </div>
        )}
        <div style={{ padding: 24 }}>
          <div style={{ color: '#FF7184', fontSize: 12, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            {kicker}
          </div>
          <h1 style={{ fontSize: 28, lineHeight: 1.12, margin: 0 }}>{title}</h1>
          {preview?.gymName && <p style={{ ...line, marginTop: 14 }}><MapPin size={16} style={{ flexShrink: 0 }} /> {preview.gymName}{preview.areaLabel ? ` · ${preview.areaLabel}` : ''}</p>}
          {when && <p style={line}><Clock size={16} style={{ flexShrink: 0 }} /> {when}</p>}

          {paid && !status && (
            <div style={{ marginTop: 18, padding: 16, borderRadius: 16, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.3)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 26, fontWeight: 800 }}>{money(preview!.priceCents ?? preview!.playerTotalCents!)}</span>
                {spotsLeft != null && (
                  <span style={{ color: '#D5DCE8', fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Users size={15} /> {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left` : 'Full'}
                  </span>
                )}
              </div>
              <p style={{ margin: '10px 0 0', color: '#AAB6C8', fontSize: 14, lineHeight: 1.5, display: 'flex', gap: 8 }}>
                <ShieldCheck size={16} style={{ flexShrink: 0, marginTop: 2, color: '#22C55E' }} />
                {preview!.isLocked
                  ? 'This run is locked in and happening.'
                  : `You're only charged if ${preview!.minToLock ?? 10} players join. Otherwise your card is never charged.`}
              </p>
              <p style={{ margin: '8px 0 0', color: '#8693A8', fontSize: 13 }}>The exact address and how to get in show up after you join.</p>
            </div>
          )}

          {preview?.description && <p style={{ margin: '18px 0 0', color: '#AAB6C8', lineHeight: 1.5 }}>{preview.description}</p>}
          {status && <p style={{ margin: '18px 0 0', color: '#FFB4BE', fontWeight: 700 }}>{status}</p>}

          {!status && (
            <>
              <button type="button" onClick={openApp} style={{ width: '100%', marginTop: 24, border: 0, borderRadius: 14, background: '#FA5B70', color: '#fff', padding: '16px 18px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
                {opening ? 'Opening RunCheck…' : paid ? (spotsLeft === 0 ? 'Open in RunCheck' : 'Grab my spot in RunCheck') : 'Open in RunCheck'}
              </button>
              <div style={{ marginTop: 20, padding: 16, borderRadius: 16, background: '#0D131B', border: '1px solid #273243' }}>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 10 }}>New to RunCheck? Two quick steps:</div>
                <ol style={{ margin: 0, paddingLeft: 20, color: '#D5DCE8', fontSize: 15, lineHeight: 1.7 }}>
                  <li><a href={APP_STORE_URL} style={{ color: '#FF7184', fontWeight: 800 }}>Get the free app</a> and sign up (takes a minute).</li>
                  <li>Come back to this text and tap the link again. It opens this run in the app.</li>
                </ol>
              </div>
            </>
          )}
          {status && <a href={APP_STORE_URL} style={{ display: 'block', marginTop: 16, textAlign: 'center', color: '#AAB6C8', fontSize: 14 }}>Don&apos;t have RunCheck? Get the app</a>}
        </div>
      </section>
    </main>
  );
}
