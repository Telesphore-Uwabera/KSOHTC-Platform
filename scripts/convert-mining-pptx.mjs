/**
 * Convert public/courses/mining/1926 electric_external_1.pptx to PDF and rename to "29. Electric external.pdf".
 * If "29. Electric external.pdf" already exists (e.g. user renamed it), conversion is skipped.
 * Run from project root: node scripts/convert-mining-pptx.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const miningDir = path.resolve(__dirname, "..", "public", "courses", "mining");
const pptxName = "1926 electric_external_1.pptx";
const pptxPath = path.join(miningDir, pptxName);
const targetPdfName = "29. Electric external.pdf";
const targetPdfPath = path.join(miningDir, targetPdfName);

const candidates = [
  process.env.LIBREOFFICE_PATH,
  "soffice",
  "soffice.exe",
  path.join(process.env.ProgramFiles || "C:\\Program Files", "LibreOffice", "program", "soffice.exe"),
  path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", "LibreOffice", "program", "soffice.exe"),
  "/usr/bin/soffice",
  "/usr/bin/libreoffice",
].filter(Boolean);

function findSoffice() {
  for (const c of candidates) {
    try {
      const r = spawnSync(c, ["--version"], { encoding: "utf8" });
      if (r.status === 0) return c;
    } catch {
      // skip
    }
  }
  return null;
}

if (fs.existsSync(targetPdfPath)) {
  console.log("Already exists:", targetPdfName, "- skipping conversion.");
  process.exit(0);
}

if (!fs.existsSync(pptxPath)) {
  console.error("Not found:", pptxPath);
  process.exit(1);
}

const soffice = findSoffice();
if (!soffice) {
  console.error("LibreOffice (soffice) not found. Install LibreOffice to convert PPTX to PDF.");
  process.exit(1);
}

console.log("Converting", pptxName, "to PDF...");
const result = spawnSync(
  soffice,
  ["--headless", "--convert-to", "pdf", "--outdir", miningDir, pptxPath],
  { encoding: "utf8", timeout: 120000 }
);

if (result.status !== 0) {
  console.error("Conversion failed:", result.stderr || result.status);
  process.exit(1);
}

const generatedPdf = path.join(miningDir, "1926 electric_external_1.pdf");
if (!fs.existsSync(generatedPdf)) {
  console.error("Expected PDF not created:", generatedPdf);
  process.exit(1);
}

if (fs.existsSync(targetPdfPath)) fs.unlinkSync(targetPdfPath);
fs.renameSync(generatedPdf, targetPdfPath);
console.log("Renamed to", targetPdfName);
console.log("Done.");
