import type { Metadata } from 'next';
import OpenCircleButton from './OpenCircleButton';

const PREVIEW_URL = 'https://us-central1-runcheck-567a3.cloudfunctions.net/getCircleSharePreview';
type CirclePreview = { circleId: string; name: string; description: string | null; photoUrl: string | null };

async function getPreview(circleId: string): Promise<CirclePreview | null> {
  try {
    const response = await fetch(`${PREVIEW_URL}?circleId=${encodeURIComponent(circleId)}`, { next: { revalidate: 60 } });
    return response.ok ? response.json() : null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ circleId: string }> }): Promise<Metadata> {
  const { circleId } = await params; const preview = await getPreview(circleId);
  const title = preview ? `Join ${preview.name} on RunCheck` : 'Join a RunCheck Circle';
  const description = preview?.description || 'A private basketball community on RunCheck. Request access to join future runs.';
  return { title, description, openGraph: { title, description, images: preview?.photoUrl ? [{ url: preview.photoUrl }] : [] }, twitter: { card: preview?.photoUrl ? 'summary_large_image' : 'summary', title, description, images: preview?.photoUrl ? [preview.photoUrl] : [] } };
}

export default async function CircleInvitePage({ params }: { params: Promise<{ circleId: string }> }) {
  const { circleId } = await params; const preview = await getPreview(circleId);
  const name = preview?.name || 'a private Circle';
  return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:20,background:'#080B10',color:'#fff',fontFamily:'-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif'}}><section style={{maxWidth:460,width:'100%',background:'#121821',border:'1px solid #273243',borderRadius:24,padding:28,textAlign:'center'}}>{preview?.photoUrl && <img src={preview.photoUrl} alt="Circle photo" style={{width:96,height:96,borderRadius:'50%',objectFit:'cover',margin:'0 auto 18px',display:'block',border:'2px solid #FF6B35'}}/>}<div style={{fontWeight:900,color:'#FF6B35',letterSpacing:1,fontSize:12}}>🔒 PRIVATE RUN CHECK CIRCLE</div><h1 style={{fontSize:29,margin:'14px 0'}}>{name}</h1>{preview?.description && <p style={{color:'#fff',fontWeight:700,lineHeight:1.5}}>{preview.description}</p>}<p style={{color:'#C6CFDD',lineHeight:1.55}}>You&apos;re being invited to join this ongoing basketball community—not just one run. Request access and the Circle owner decides who joins.</p><OpenCircleButton circleId={circleId}/></section></main>;
}
