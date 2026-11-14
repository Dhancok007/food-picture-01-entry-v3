// food-picture-01 entry (v3: canonical tonkotsu noodle-pull shot —
// black bokeh, dripping yolk landing on glossy chashu, one clean
// focal action, food intact): copies the bundled entry.png to the
// output directory, byte for byte. Node 22 standard library only;
// deterministic; no network, no clock, no randomness.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

if (!existsSync(src)) {
  throw new Error("entry.png is missing next to main.ts");
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

const srcBytes = statSync(src).size;
const dstBytes = statSync(dst).size;
if (srcBytes !== dstBytes) {
  throw new Error(`copy size mismatch: ${srcBytes} != ${dstBytes}`);
}
console.log(`entry.png copied: ${dstBytes} bytes`);
