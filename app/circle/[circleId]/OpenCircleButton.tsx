'use client';

import { useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/us/app/runcheck-pickup-basketball/id6760801659';

export default function OpenCircleButton({ circleId }: { circleId: string }) {
  const [opening, setOpening] = useState(false);
  const open = () => {
    setOpening(true);
    window.location.href = `runcheck://circle/${encodeURIComponent(circleId)}`;
    window.setTimeout(() => { window.location.href = APP_STORE_URL; }, 1800);
  };
  return <><button aria-label="Open RunCheck and request to join this Circle" onClick={open} style={{marginTop:18,width:'100%',border:0,borderRadius:14,background:'#FF6B35',color:'#fff',padding:16,fontSize:16,fontWeight:900,cursor:'pointer'}}>{opening ? 'Opening RunCheck…' : 'Open RunCheck to Request Access'}</button><a href={APP_STORE_URL} style={{display:'block',marginTop:16,color:'#AAB6C8'}}>Don&apos;t have RunCheck? Get the app</a></>;
}
