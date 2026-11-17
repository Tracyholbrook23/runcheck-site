'use client';
/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import Link from 'next/link';
import { useState, useSyncExternalStore } from 'react';
import { MapPin, Clock, Users, ShieldCheck } from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659';

type RunPreview = {
  title: string;
  gymName: string;
  startTime: string | null;
  formattedStartTime: string | null;
  description: string | null;
  rules?: string | null;
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
  const kicker = paid ? 'Paid run' : preview?.visibility === 'invite_only' ? 'Private run invite' : 'Pickup basketball';

  return (
    <main className="rc-share">
      <Link href="/" className="rc-share-logo" aria-label="RunCheck home">
        <img src="/runcheck-logo.png" alt="RunCheck" />
      </Link>
      <section className="rc-share-card">
        {preview?.photoUrl ? (
          <img src={preview.photoUrl} alt="" className="rc-share-media" />
        ) : (
          <div className="rc-share-fallback">
            <Image src="/home/ball.webp" alt="" width={96} height={96} priority />
          </div>
        )}
        <div className="rc-share-body">
          <span className="rc-share-chip">{kicker}</span>
          <h1>{title}</h1>
          {preview?.gymName && <p className="rc-share-line"><MapPin aria-hidden="true" /> {preview.gymName}{preview.areaLabel ? ` · ${preview.areaLabel}` : ''}</p>}
          {when && <p className="rc-share-line"><Clock aria-hidden="true" /> {when}</p>}

          {paid && !status && (
            <div className="rc-share-box">
              <div className="rc-share-price">
                <strong>{money(preview!.priceCents ?? preview!.playerTotalCents!)}</strong>
                {spotsLeft != null && (
                  <span><Users aria-hidden="true" /> {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left` : 'Full'}</span>
                )}
              </div>
              <p className="rc-share-note">
                <ShieldCheck aria-hidden="true" />
                {preview!.isLocked
                  ? 'This run is locked in and happening.'
                  : `You're only charged if ${preview!.minToLock ?? 10} players join. Otherwise your card is never charged.`}
              </p>
              <p className="rc-share-small">The exact address and how to get in show up after you join.</p>
            </div>
          )}

          {preview?.description && !preview?.rules && <p className="rc-share-text">{preview.description}</p>}
          {preview?.rules && (
            <div className="rc-share-box">
              <h2>Run rules</h2>
              <ul>
                {preview.rules.split('\n').map((l) => l.trim()).filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>
          )}
          {status && <p className="rc-share-status">{status}</p>}

          {!status && (
            <>
              <button type="button" onClick={openApp} className="rc-share-action">
                {opening ? 'Opening RunCheck…' : paid ? (spotsLeft === 0 ? 'Open in RunCheck' : 'Grab my spot in RunCheck') : 'Open in RunCheck'}
              </button>
              <div className="rc-share-box">
                <h2>New to RunCheck? Two quick steps</h2>
                <ol>
                  <li><a href={APP_STORE_URL}>Get the free app</a> and sign up (takes a minute).</li>
                  <li>Come back to this text and tap the link again. It opens this run in the app.</li>
                </ol>
              </div>
            </>
          )}
          {status && <a href={APP_STORE_URL} className="rc-share-link">Don&apos;t have RunCheck? Get the app</a>}
        </div>
      </section>
      {paid && <p className="rc-share-foot"><Link href="/refunds">How paid runs and refunds work</Link></p>}
    </main>
  );
}
