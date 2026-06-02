const CACHE_NAME = 'haenaem-v20260602120000';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// 설치: 핵심 파일 캐시
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// 활성화: 이전 버전 캐시 전부 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 메시지: SKIP_WAITING 수신 시 즉시 활성화
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// fetch: 네트워크 우선, 실패 시 캐시
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // 외부 리소스(CDN, fonts, 이미지 등)는 캐시 안 거침
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(e.request).then(res => {
      if (!res || res.status !== 200 || res.type === 'opaque') return res;
      const resClone = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(e.request, resClone));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
