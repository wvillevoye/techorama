// Haalt het programma van techorama.nl op en schrijft programma.json (dag, start, einde, id, zaal, spreker, titel, track).
// Draait elk uur via .github/workflows/programma.yml; de knop "Programma controleren" in de app leest dat bestand.
const fs = require("fs");
const dec = s => s.replace(/&#x([0-9A-F]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

async function live() {
  const rows = [];
  for (const [day, path] of [[0, "tuesday"], [1, "wednesday"]]) {
    const res = await fetch("https://techorama.nl/schedule/" + path);
    if (!res.ok) throw new Error(path + ": HTTP " + res.status);
    const h = await res.text();
    for (const p of h.split('<div class="agenda-slot">').slice(1)) {
      const m = p.match(/<strong>(\d\d:\d\d)&#x2013;(\d\d:\d\d)<\/strong>/);
      for (const c of p.split('<a class="session-card" href="').slice(1)) {
        const g = (re, d = "") => dec((c.match(re) || [, d])[1]);
        rows.push([day, m[1], m[2], +c.match(/^\/schedule\/sessions\/(\d+)/)[1], g(/session-card__time">([^<]*)/),
          g(/secondary">([^<]*)/), g(/session-card__title">([^<]*)/), g(/session-track [^"]*">([^<]*)/)]);
      }
    }
  }
  if (rows.length < 50) throw new Error("Te weinig sessies gevonden (" + rows.length + "); pagina veranderd?");
  return rows.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]) || a[3] - b[3]);
}

module.exports = { live };
if (require.main === module) live().then(rows => {
  fs.writeFileSync(__dirname + "/programma.json", JSON.stringify(rows) + "\n");
  console.log(rows.length + " sessies geschreven");
}).catch(e => { console.error(e.message); process.exit(1); });
