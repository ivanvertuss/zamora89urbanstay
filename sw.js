const CACHE='z89-final-oficial-multilang-2026-08-21';
const CORE=["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./assets/logo-z89.png", "./assets/icon-192.png", "./assets/icon-512.png", "./assets/living-renovated.jpeg", "./assets/kitchen.jpeg", "./assets/portal-aprobado.png", "./assets/wifi-qr-limpio.png"];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  const isCore=event.request.mode==='navigate'||url.pathname.endsWith('/app.js')||url.pathname.endsWith('/styles.css');
  if(isCore){event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('./index.html'):undefined))));return;}
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));
});