/**
 * Clean and normalize course PDFs in public/courses:
 * 1) Remove duplicate "Copy" files and rename to proper names.
 * 2) Convert all .pptx to .pdf (requires LibreOffice installed).
 * 3) Rename all PDFs to "1. name.pdf", "2. name.pdf" with clean names (no 1-+, no + encoding).
 * Run from project root: pnpm run clean:pdfs
 * Dry run: DRY_RUN=1 pnpm run clean:pdfs
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import { runCleanCoursePdfs, runNormalizeCoursePdfs } from "../backend/lib/clean-course-pdfs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");

const DRY_RUN = process.env.DRY_RUN === "1";

function main() {
  const publicCoursesPath = path.resolve(PROJECT_ROOT, "public", "courses");
  console.log("Cleaning and normalizing course PDFs in", publicCoursesPath);
  if (DRY_RUN) console.log("DRY RUN – no files will be changed.\n");

  const result = runCleanCoursePdfs(publicCoursesPath, DRY_RUN);
  result.details.forEach((line) => console.log(" ", line));
  console.log("Clean: Renamed:", result.renamed, "Deleted:", result.deleted);

  console.log("\nNormalize: convert PPTX to PDF, then rename to 1. name.pdf, 2. name.pdf ...");
  const normResult = runNormalizeCoursePdfs(publicCoursesPath, DRY_RUN);
  normResult.details.forEach((line) => console.log(" ", line));
  console.log("Normalize: Renamed:", normResult.renamed, "Converted PPTX:", normResult.converted);

  console.log("\nDone.");
  if (DRY_RUN && (result.renamed > 0 || result.deleted > 0 || normResult.renamed > 0 || normResult.converted > 0)) {
    console.log("Run without DRY_RUN=1 to apply changes.");
  }
}

main();
