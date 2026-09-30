# Techorama 2026: programma-app

Handige app met het programma van Techorama (27–28 oktober, Utrecht). Je ziet per tijdslot in welke zaal je moet zijn, en je kunt zelf je sessies kiezen.

**Openen:** https://wvillevoye.github.io/techorama/

<img src="qr.png" alt="QR-code naar de app" width="220">

Scan de QR-code met je telefoon.

## Installeren als app (30 seconden)

- **Android (Chrome):** tik op ⋮ en kies *App installeren* of *Toevoegen aan startscherm*.
- **iPhone (Safari):** tik op de deelknop en kies *Zet op beginscherm*.

Open de app daarna één keer met internet. Vanaf dan werkt hij ook zonder wifi of mobiel bereik.

## Gebruik

- **Mijn dag:** jouw programma per dag, met de zaal, plus "Nu" en "Hierna" bovenaan. De app waarschuwt als je tussen twee sessies maar 15 minuten hebt en van gebouwdeel moet wisselen (JB-zalen ↔ Room 7–13).
- **Alle sessies:** het hele programma. Tik op een sessie om die aan te vinken als jouw keuze. Je kunt zoeken op titel of spreker en filteren op track.
- **Omschrijving:** tik op *Waarom deze sessie* voor meer info of de link naar de officiële sessiepagina.
- **Terug naar advies:** onderaan zet je alle keuzes terug naar het beginadvies.

## Demo-modus

Wil je zien hoe de app zich gedraagt tijdens de conferentie? Zet `#demo` achter het adres. De app doet dan alsof het een ander moment is, op Nederlandse tijd.

| Adres eindigt op | De app doet alsof het is |
|---|---|
| `#demo` | dinsdag 27 oktober, 11:40 |
| `#demo=di-09:35` | dinsdag, 09:35 (eigen tijd) |
| `#demo=wo-13:30` | woensdag 28 oktober, 13:30 |
| `#demo=voor-10:00` | maandag 26 oktober, de dag ervoor |
| `#demo=na-10:00` | donderdag 29 oktober, de dag erna |

Voorbeeld: `https://wvillevoye.github.io/techorama/#demo=wo-13:30`

Je ziet dan onder andere:
- **Zwarte blok bovenaan:** "Nu bezig" en "Hierna", "Pauze", "Klaar voor vandaag" of "Afgelopen".
- **Tijdsloten:** het lopende slot krijgt een groene rand en afgelopen slots een ✓.
- **Springen:** de app scrolt naar het huidige slot, en tikken op het zwarte blok brengt je er terug.

Als je alleen het stuk na de `#` in de adresbalk aanpast, springt de app direct mee. Haal `#demo` weer weg om terug te gaan naar de echte tijd.

## Goed om te weten

- Voor sessies zonder eigen omschrijving staat alleen een link naar techorama.nl.
- Je keuzes worden alleen op je eigen telefoon bewaard.
- Het programma kan nog wijzigen. Controleer de week ervoor het schema op techorama.nl.
- Open de app een paar dagen voor de conferentie nog een keer met wifi. Dan haalt hij eventuele updates op.

---

# Voor beheerders

Installeerbare web-app (PWA) met je persoonlijke Techorama-programma. Na één keer openen werkt de app ook zonder internet.

## Inhoud

| Bestand | Doel |
|---|---|
| `index.html` | De app zelf |
| `manifest.webmanifest` | Naam, kleuren en iconen, zodat Chrome de app kan installeren |
| `sw.js` | Service worker: bewaart de app op de telefoon voor offline gebruik |
| `icons/` | App-iconen (192, 512 en maskable voor Android) |
| `.gitlab-ci.yml` | Publiceert automatisch via GitLab Pages |
| `qr.png` | QR-code naar de app (alleen voor de README) |

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
- Demo-tijden staan hierboven bij *Demo-modus*.
- Je keuzes worden alleen op je telefoon bewaard, niet online.
