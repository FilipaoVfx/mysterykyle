// Sustituye el marcador TU-DOMINIO por el dominio real en todo public/.
//   node scripts/set-dominio.mjs isa.midominio.com
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dominio = process.argv[2]?.replace(/^https?:\/\//, "").replace(/\/$/, "");
if (!dominio) {
  console.error("Uso: node scripts/set-dominio.mjs isa.midominio.com");
  process.exit(1);
}

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const texto = new Set([".html", ".xml", ".txt", ".webmanifest", ".json"]);
let tocados = 0;

const recorrer = (dir) => {
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) { recorrer(ruta); continue; }
    if (!texto.has(extname(nombre))) continue;
    const antes = readFileSync(ruta, "utf8");
    const despues = antes.replaceAll("TU-DOMINIO", dominio);
    if (antes !== despues) { writeFileSync(ruta, despues); tocados++; console.log("·", ruta); }
  }
};

recorrer(raiz);
console.log(tocados ? `\nListo: ${dominio} en ${tocados} archivo(s).` : "No quedaba ningún TU-DOMINIO por sustituir.");
