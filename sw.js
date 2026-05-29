/* v20260529091908 */
const CACHE = 'v20260529091908';
const OFFLINE = ['/alexkpi/', '/alexkpi/index.html', '/alexkpi/manifest.json', '/alexkpi/icon-192.png', '/alexkpi/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(OFFLINE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // index.html — 항상 네트워크 우선, 실패 시 캐시
  if (e.request.mode === 'navigate' || e.request.url.includes('index.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }
  // 나머지 — 캐시 우선
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
