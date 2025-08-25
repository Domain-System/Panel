const CACHE_NAME = "ont-cache-v1";
const urlsToCache = [
  "./",
  "index.html",
  "manifest.json"
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});