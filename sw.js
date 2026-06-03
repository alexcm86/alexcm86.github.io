// sw.js v20260604150000
const CACHE_NAME = 'haenaem-v20260604150000';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

const IMAGE_ASSETS = [
  // 기본 테마
  'https://alexcm86.github.io/1.png',
  'https://alexcm86.github.io/2.png',
  'https://alexcm86.github.io/3.png',
  'https://alexcm86.github.io/4.png',
  'https://alexcm86.github.io/5.png',
  'https://alexcm86.github.io/6.png',
  // 밀리터리
  'https://alexcm86.github.io/m1.png',
  'https://alexcm86.github.io/m2.png',
  'https://alexcm86.github.io/m3.png',
  'https://alexcm86.github.io/m4.png',
  'https://alexcm86.github.io/m5.png',
  'https://alexcm86.github.io/m6.png',
  // 피치
  'https://alexcm86.github.io/p1.png',
  'https://alexcm86.github.io/p2.png',
  'https://alexcm86.github.io/p3.png',
  'https://alexcm86.github.io/p4.png',
  'https://alexcm86.github.io/p5.png',
  'https://alexcm86.github.io/p6.png',
  // 미드나잇
  'https://alexcm86.github.io/n1.png',
  'https://alexcm86.github.io/n2.png',
  'https://alexcm86.github.io/n3.png',
  'https://alexcm86.github.io/n4.png',
  'https://alexcm86.github.io/n5.png',
  'https://alexcm86.github.io/n6.png',
  // 오션
  'https://alexcm86.github.io/o1.png',
  'https://alexcm86.github.io/o2.png',
  'https://alexcm86.github.io/o3.png',
  'https://alexcm86.github.io/o4.png',
  'https://alexcm86.github.io/o5.png',
  'https://alexcm86.github.io/o6.png',
  // 다크
  'https://alexcm86.github.io/d1.png',
  'https://alexcm86.github.io/d2.png',
  'https://alexcm86.github.io/d3.png',
  'https://alexcm86.github.io/d4.png',
  'https://alexcm86.github.io/d5.png',
  'https://alexcm86.github.io/d6.png',
  // 포레스트
  'https://alexcm86.github.io/f1.png',
  'https://alexcm86.github.io/f2.png',
  'https://alexcm86.github.io/f3.png',
  'https://alexcm86.github.io/f4.png',
  'https://alexcm86.github.io/f5.png',
  'https://alexcm86.github.io/f6.png',
  // 선샤인
  'https://alexcm86.github.io/s1.png',
  'https://alexcm86.github.io/s2.png',
  'https://alexcm86.github.io/s3.png',
  'https://alexcm86.github.io/s4.png',
  'https://alexcm86.github.io/s5.png',
  'https://alexcm86.github.io/s6.png',
  // 스톤 (무채색)
  'https://alexcm86.github.io/st1.png',
  'https://alexcm86.github.io/st2.png',
  'https://alexcm86.github.io/st3.png',
  'https://alexcm86.github.io/st4.png',
  'https://alexcm86.github.io/st5.png',
  'https://alexcm86.github.io/st6.png',
];

// ── install: 정적 에셋만 캐시 (이미지는 런타임에 처리)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── activate: 구버전 캐시 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── fetch: 전략 분기
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1) index.html → Network First (항상 최신 버전 우선)
  if (url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 2) 해냄이 이미지 (alexcm86.github.io) → Cache First (한번 받으면 캐시 사용)
  if (url.hostname === 'alexcm86.github.io') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // 3) 외부 리소스 (AdSense, 폰트 등) → Network Only
  if (url.hostname !== self.location.hostname) {
    event.respondWith(fetch(event.request));
    return;
  }

  // 4) 기타 정적 에셋 → Cache First with Network Fallback
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return res;
      });
    })
  );
});

// ── 메시지: SKIP_WAITING (앱에서 호출)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
