/**
 * Converts all .jpg and .jpeg files in public/ to .webp (same directory).
 * Run: node scripts/convert-images-to-webp.mjs
 * Requires: pnpm add -D sharp
 */
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

function findImages(dir, list = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) findImages(full, list);
    else if (/\.(jpg|jpeg)$/i.test(e.name)) list.push(full);
  }
  return list;
}

const files = findImages(publicDir);
console.log(`Converting ${files.length} image(s) to WebP...`);

for (const fp of files) {
  const out = fp.replace(/\.(jpg|jpeg)$/i, ".webp");
  try {
    await sharp(fp).webp({ quality: 85 }).toFile(out);
    console.log(`  ${fp.replace(publicDir, "public")} → ${out.replace(publicDir, "public")}`);
  } catch (err) {
    console.error(`  Failed ${fp}:`, err.message);
  }
}

console.log("Done.");
