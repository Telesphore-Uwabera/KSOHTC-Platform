/**
 * One-off: rename PDFs in public/courses/construction that contain " – " to use a single space.
 * Run from project root: node scripts/fix-construction-pdf-names.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const constructionDir = path.resolve(__dirname, "..", "public", "courses", "construction");

if (!fs.existsSync(constructionDir)) {
  console.log("Construction folder not found:", constructionDir);
  process.exit(0);
}

const files = fs.readdirSync(constructionDir).filter((f) => f.toLowerCase().endsWith(".pdf"));
let renamed = 0;
for (const file of files) {
  const newName = file
    .replace(/\s*[\u2013\u2014-]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (file === newName) continue;
  const oldPath = path.join(constructionDir, file);
  const newPath = path.join(constructionDir, newName);
  console.log("Rename:", file, "->", newName);
  fs.renameSync(oldPath, newPath);
  renamed++;
}
console.log("Done. Renamed", renamed, "files.");
