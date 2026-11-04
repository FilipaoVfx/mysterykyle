// Convierte index.html (documento completo, el que se publica en GitHub Pages)
// en el fragmento que espera el publicador de Artifacts: sin doctype/html/head/body
// y sin los metas de charset/viewport, que el contenedor ya inyecta.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(raiz, "index.html"), "utf8");

const head = src.slice(src.indexOf("<head>") + 6, src.indexOf("</head>"));
const body = src.slice(src.indexOf("<body>") + 6, src.lastIndexOf("</body>"));

const headLimpio = head
  .split("\n")
  .filter((l) => !/<meta charset|name="viewport"/.test(l))
  .join("\n")
  .trim();

const salida = join(raiz, "build", "artifact.html");
writeFileSync(salida, `${headLimpio}\n${body.trim()}\n`);
console.log(`artifact.html -> ${salida} (${Buffer.byteLength(headLimpio + body)} bytes)`);
