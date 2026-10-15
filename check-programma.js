// Vergelijkt het programma op techorama.nl met de sessies in index.html (ALL en DAYS).
// Gebruik: node check-programma.js   (Node 18+). Afsluitcode 1 bij verschillen.
const fs = require("fs");
const { live } = require("./haal-programma.js");
const norm = s => s.replace(/[’‘]/g, "'").replace(/^"|"$/g, "").replace(/ & /g, ", ").replace(/\s*\.$/, "").trim();

(async () => {
  const src = fs.readFileSync(__dirname + "/index.html", "utf8");
  const ALL = eval(src.match(/const ALL=(\[\[.*?\]\]);/s)[1]);
  const s = src.indexOf("const DAYS="), e = src.indexOf("// Volledig programma", s);
  const DAYS = eval("(" + src.slice(s, e).replace(/^const DAYS=/, "").replace(/;\s*$/, "") + ")");
  const DESC = eval("(" + src.match(/const DESC=(\{.*?\});/s)[1] + ")");
  const L = new Map((await live()).map(r => [r[3], r])), A = new Map(ALL.map(r => [r[3], r]));
  const out = [];
  const name = ["dag", "start", "einde", "id", "zaal", "spreker", "titel"];
  for (const [id, a] of A) {
    const l = L.get(id);
    if (!l) { out.push(`Niet meer op de site: ${id} ${a[6]} (${a[5]})`); continue; }
    for (let i = 0; i < 7; i++) if (i !== 3 && norm(String(a[i])) !== norm(String(l[i]))) out.push(`${name[i]} ${id} ${l[6]}: app "${a[i]}" / site "${l[i]}"`);
  }
  for (const [id, l] of L) if (!A.has(id)) out.push(`Nieuw op de site: ${id} ${l[6]} (${l[5]}, ${l[4]}, ${["di", "wo"][l[0]]} ${l[1]})`);
  for (const [di, d] of DAYS.entries()) for (const [st, , list] of d.slots) for (const x of list) {
    if (!L.has(+x[5])) out.push(`Dagselectie: ${x[2]} (${x[5]}) staat niet meer op de site`);
    else if (L.get(+x[5])[1] !== st || L.get(+x[5])[0] !== di) out.push(`Dagselectie tijd ${x[2]}: app ${["di","wo"][di]} ${st} / site ${["di","wo"][L.get(+x[5])[0]]} ${L.get(+x[5])[1]}`);
    else if (L.get(+x[5])[4] !== x[0]) out.push(`Dagselectie zaal ${x[2]}: app ${x[0]} / site ${L.get(+x[5])[4]}`);
  }
  const zonder = [...L.keys()].filter(id => A.has(id) && !DESC[id] && ![...DAYS.flatMap(d => d.slots.flatMap(x => x[2]))].some(x => +x[5] === id));
  console.log(`Site: ${L.size} sessies, app: ${A.size}. Zonder omschrijving: ${zonder.length}.`);
  console.log(out.length ? out.join("\n") : "Geen verschillen.");
  process.exit(out.length ? 1 : 0);
})();
