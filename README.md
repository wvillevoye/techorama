# Techorama 2026 – offline app

Installeerbare web-app (PWA) met je persoonlijke Techorama-programma. Na één keer openen werkt de app ook zonder internet.

## Inhoud

| Bestand | Doel |
|---|---|
| `index.html` | De app zelf |
| `manifest.webmanifest` | Naam, kleuren en iconen, zodat Chrome de app kan installeren |
| `sw.js` | Service worker: bewaart de app op de telefoon voor offline gebruik |
| `icons/` | App-iconen (192, 512 en maskable voor Android) |
| `.gitlab-ci.yml` | Publiceert automatisch via GitLab Pages |

## Online zetten

Een service worker werkt alleen via **https**, dus de bestanden moeten op een webadres staan.

### Optie A: GitHub Pages (persoonlijk account)
1. Maak op github.com een nieuwe **public** repository, bijvoorbeeld `techorama`.
2. Kies **Add file → Upload files** en sleep alle bestanden en de map `icons` erin. Klik op **Commit changes**.
3. Ga naar **Settings → Pages**. Kies bij *Source* **Deploy from a branch**, branch `main`, map `/ (root)`, en klik op **Save**.
4. Na ongeveer een minuut staat de app op `https://<gebruikersnaam>.github.io/techorama/`.

### Optie B: GitLab Pages
1. Maak een nieuw project aan en push deze map (inclusief `.gitlab-ci.yml`).
2. De pipeline bouwt de site. De URL staat onder **Deploy → Pages**.
3. Zet Pages-toegang op *Everyone*. Anders moet je op je telefoon inloggen bij GitLab.

## Installeren op de Pixel
1. Open de Pages-URL in **Chrome**.
2. Tik op **⋮ → App installeren** (soms heet dit **Toevoegen aan startscherm**).
3. Open de app één keer met internet. Daarna werkt hij ook offline.

## Iets aanpassen
1. Pas `index.html` aan.
2. Verhoog in `sw.js` de regel `const VERSION = "v1";` naar `"v2"`, enzovoort.
3. Upload of push opnieuw. De telefoon haalt de nieuwe versie op bij de volgende keer openen met internet. Soms moet je de app twee keer openen.

## Handig
- Voeg `#demo` toe aan de URL om te zien hoe de app eruitziet op dinsdag om 11:40.
- Je keuzes worden alleen op je telefoon bewaard, niet online.
