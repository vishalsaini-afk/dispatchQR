const C='lingel-factory-qr-v2';
const CORE=['index.html','./','qr-quality.html','qr-store.html','qr-dispatch.html','qr-box-lookup.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(CORE).catch(()=>{})));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=e.request.url;
 if(u.indexOf('script.google.com')>=0||u.indexOf('googleusercontent.com')>=0)return; // backend + Drive always live
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(cached=>{
  const net=fetch(e.request).then(r=>{try{if(r&&r.status===200&&(u.indexOf(self.location.origin)===0||u.indexOf('cdnjs.cloudflare.com')>=0||u.indexOf('fonts.g')>=0)){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}}catch(x){}return r;}).catch(()=>cached);
  return cached||net;}));});
