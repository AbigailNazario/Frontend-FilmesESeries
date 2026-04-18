const CACHE_NAME = "midias-cache-v1";

const CACHE_NAME = "midias-cache-v2";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/App.js"
      ]);
    })
  );
});

// IGNORAR chamadas da API
self.addEventListener("fetch", (e) => {
  const url = e.request.url;

  // se for API, NÃO intercepta
  if (url.includes("/api/entries")) {
    return;
  }

  // só cache para arquivos locais
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
