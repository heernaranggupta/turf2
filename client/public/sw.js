const cacheName = "Turf-V1";
const files_to_cache = [
  "./",
  "./index.html",
  "https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css",
];
const self = this;

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(files_to_cache).then();
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((res) => {
      if (res) {
        return res;
      }
      return fetch(evt.request);
    })
  );
});
