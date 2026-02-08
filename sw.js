// Service Worker for caching resume factory
const CACHE_NAME = 'cv-factory-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/firebase-config.js',
  '/auth-manager.js',
  '/gdrive-sync.js',
  '/index-manager.js',
  '/template-data.js',
  '/resume-loader.js',
  '/resume.html',
  '/cleaning.html',
  '/dental.html',
  '/nanny.html',
  '/warehouse.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Update cache when new version is available
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});