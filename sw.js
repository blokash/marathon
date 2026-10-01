// Offline support: fetch fresh when online, serve from cache when offline.
const CACHE = 'marathon-v3';
const FILES = ['./', 'index.html', 'plan.js', 'manifest.json', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'favicon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  // Network first so updates show up straight away; fall back to the cache when offline.
  e.respondWith(
    caches.open(CACHE).then((c) =>
      fetch(e.request)
        .then((res) => { if (res.ok) c.put(e.request, res.clone()); return res; })
        .catch(() => c.match(e.request))
    )
  );
});
