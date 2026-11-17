/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { formatStartTime, getRunPreview } from '../../../../lib/runPreview';

/*
 * The picture that shows up when a run link is shared in a text or DM:
 * the run, the gym, the time and, for paid runs, the price and spots left.
 */

const W = 1200;
const H = 630;
const GROUND = '#0A0A0A';
const INK = '#F2EFE7';
const ACTION = '#FF5A1F';

const asset = (name: string) => readFile(join(process.cwd(), 'assets/og', name));
const dataUrl = (buf: Buffer) => `data:image/png;base64,${buf.toString('base64')}`;
const money = (cents: number) => `$${cents % 100 === 0 ? cents / 100 : (cents / 100).toFixed(2)}`;

export async function GET(_req: Request, { params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  const [preview, anton, oswald, doto, ball, logo] = await Promise.all([
    getRunPreview(runId),
    asset('anton.woff'),
    asset('oswald-500.woff'),
    asset('doto-800.woff'),
    asset('ball.png'),
    asset('logo.png'),
  ]);

  const paid = preview?.isPaid === true && (preview.priceCents ?? preview.playerTotalCents) != null;
  const spotsLeft = paid && preview?.capacity ? Math.max(0, preview.capacity - (preview.spotsTaken ?? 0)) : null;
  const kicker = paid ? 'PAID RUN' : preview?.visibility === 'invite_only' ? 'PRIVATE RUN' : 'PICKUP BASKETBALL';
  const title = (preview?.title ?? 'A run was shared with you').toUpperCase();
  const when = preview ? formatStartTime(preview.startTime) : null;
  const where = preview ? [preview.gymName, preview.areaLabel].filter(Boolean).join(' · ') : 'Open it in RunCheck to see the details';
  const titleSize = title.length > 34 ? 64 : title.length > 22 ? 80 : 96;

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: 'flex', background: GROUND, color: INK, fontFamily: 'Oswald' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: preview?.photoUrl ? 700 : 820, padding: '56px 0 52px 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <img src={dataUrl(logo)} width={64} height={64} alt="" />
            <div style={{ display: 'flex', padding: '8px 18px', borderRadius: 999, border: `2px solid rgba(242,239,231,.3)`, fontSize: 22, letterSpacing: 3 }}>{kicker}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontFamily: 'Anton', fontSize: titleSize, lineHeight: 0.98 }}>{title}</div>
            <div style={{ display: 'flex', marginTop: 24, fontSize: 32, color: 'rgba(242,239,231,.85)' }}>{where}</div>
            {when && <div style={{ display: 'flex', marginTop: 6, fontSize: 32, color: 'rgba(242,239,231,.85)' }}>{when}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            {paid && (
              <div style={{ display: 'flex', fontFamily: 'Doto', fontSize: 60, color: ACTION }}>{money(preview!.priceCents ?? preview!.playerTotalCents!)}</div>
            )}
            {spotsLeft != null && (
              <div style={{ display: 'flex', fontSize: 30, color: INK }}>{spotsLeft > 0 ? `${spotsLeft} SPOT${spotsLeft === 1 ? '' : 'S'} LEFT` : 'FULL'}</div>
            )}
            {!paid && <div style={{ display: 'flex', padding: '14px 28px', borderRadius: 999, background: ACTION, color: GROUND, fontSize: 30 }}>Open in RunCheck</div>}
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {preview?.photoUrl ? (
            <img src={preview.photoUrl} alt="" width={500} height={H} style={{ width: 500, height: H, objectFit: 'cover' }} />
          ) : (
            <img src={dataUrl(ball)} alt="" width={300} height={300} />
          )}
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: 'Anton', data: anton, weight: 400, style: 'normal' },
        { name: 'Oswald', data: oswald, weight: 500, style: 'normal' },
        { name: 'Doto', data: doto, weight: 800, style: 'normal' },
      ],
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    }
  );
}
