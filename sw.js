const VERSION='7ce960670d',CACHE='hotelbills-'+VERSION,PRECACHE=["./","index.html","manifest.webmanifest","favicon-32.png","icon-192.png","icon-512.png","apple-touch-icon.png","assets/app.1e6a0bd8c7.css","assets/app.26e949d927.js","assets/jspdf.98ccf17aa1.js","assets/autotable.27a9c3b618.js","assets/fonts/plus-jakarta-sans-latin-400-normal.woff2","assets/fonts/plus-jakarta-sans-latin-500-normal.woff2","assets/fonts/plus-jakarta-sans-latin-600-normal.woff2","assets/fonts/plus-jakarta-sans-latin-700-normal.woff2","assets/fonts/plus-jakarta-sans-latin-800-normal.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('hotelbills-')&&x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put('index.html',cp))}return res}).catch(()=>caches.match('index.html')));return;
  }
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok&&u.pathname.includes('/assets/')){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})));
});
