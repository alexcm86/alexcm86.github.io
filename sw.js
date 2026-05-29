/* v20260529094117 */
const CACHE = 'v20260529094117';
const URLS = ['/alexkpi/', '/alexkpi/index.html', '/alexkpi/manifest.json', '/alexkpi/icon-192.png', '/alexkpi/icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({type:'window',includeUncontrolled:true}))
      .then(clients => clients.forEach(c => c.navigate(c.url)))
  );
});

self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if(e.request.mode === 'navigate' || e.request.url.includes('index.html') || e.request.url.endsWith('/alexkpi/')) {
    e.respondWith(
      fetch(e.request, {cache:'no-store'})
        .then(res => { caches.open(CACHE).then(c => c.put(e.request, res.clone())); return res; })
        .catch(() => caches.match('/alexkpi/index.html'))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
