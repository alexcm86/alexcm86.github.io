/* v20260529092138 */
const CACHE = 'v20260529092138';
const OFFLINE = ['/alexkpi/', '/alexkpi/index.html', '/alexkpi/manifest.json', '/alexkpi/icon-192.png', '/alexkpi/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(OFFLINE))
      .then(() => self.skipWaiting())   // ★ 대기 없이 즉시 활성화
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())  // ★ 열려있는 모든 탭 즉시 제어
      .then(() => {
        // ★ 모든 클라이언트(앱 포함) 강제 새로고침
        return self.clients.matchAll({ type: 'window', includeUncontrolled: true })
          .then(clients => clients.forEach(c => c.navigate(c.url)));
      })
  );
});

self.addEventListener('fetch', e => {
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
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});

self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});
