// v-nocache - 항상 네트워크 우선
const CACHE = 'kpi-v8';

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

self.addEventListener('fetch', e => {
  // 모든 요청을 항상 네트워크에서 가져옴 (캐시 완전 무시)
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
