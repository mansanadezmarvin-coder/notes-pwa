const CACHE_NAME = 'resumatch-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './offline.html',
  './icon-192.svg',
  './icon-512.svg',
  '../css/style.css',
  '../js/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Navigation requests -> offline fallback
  if(event.request.mode === 'navigate'){
    event.respondWith(
      fetch(event.request).catch(()=>caches.match('./offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(r=>{
      // Optionally cache new requests
      return caches.open(CACHE_NAME).then(cache=>{ cache.put(event.request, r.clone()); return r })
    })).catch(()=>caches.match('./offline.html'))
  );
});
