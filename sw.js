// Verhoog VERSION bij elke wijziging van index.html (en zet APP_VERSION in index.html gelijk), zodat telefoons de nieuwe versie ophalen.
const VERSION = "v11";
const CACHE = "techorama26-" + VERSION;
const FONTS = "techorama26-fonts";
const SHELL = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Eigen bestanden: direct uit de cache (werkt offline), op de achtergrond verversen.
  if (url.origin === self.location.origin) {
    const key = req.mode === "navigate" ? "./index.html" : req;
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(key);
      const net = fetch(req).then(r => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // Google Fonts: na de eerste keer ook offline beschikbaar.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok || r.type === "opaque") c.put(req, r.clone());
      return r;
    }));
  }
});
