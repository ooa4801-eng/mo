const C='mawqif-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.add('./index.html')).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){
  const net=fetch(r).then(x=>{if(x.ok){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))}return x});
  e.respondWith(Promise.race([net,new Promise((_,j)=>setTimeout(j,2500))]).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html')||net)));return}
 if(/cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com/.test(u.host)){
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{if(x.ok||x.type==='opaque'){const cp=x.clone();caches.open(C).then(c=>c.put(r,cp))}return x})))}});
