// v15 - 시작일다국어
const CACHE = 'kpi-v23';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 모든 요청 네트워크 우선 - 캐시 절대 안 씀
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request, {cache: 'no-store'}).catch(() => caches.match(e.request))
  );
});
