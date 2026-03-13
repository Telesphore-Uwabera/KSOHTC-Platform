/**
 * Clean course PDFs: remove duplicate "Copy" files and rename to proper names.
 * Normalize: 1. name.pdf, 2. name.pdf (clean names, no gaps). Convert PPTX to PDF.
 * Used by scripts/clean-course-pdfs.ts and POST /api/admin/clean-course-pdfs.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export function getPublicCoursesPath(): string {
  return path.resolve(process.cwd(), "public", "courses");
}

function normalizedBase(name: string): string {
  const noExt = name.replace(/\.(pdf|pptx)$/i, "").trim();
  return noExt
    .replace(/\s*-\s*Copy(\s*-\s*Copy)*\s*(\s*\(\d+\))?\s*$/gi, "")
    .replace(/\s+Copy(\s*Copy)*\s*(\s*\(\d+\))?\s*$/gi, "")
    .replace(/\s*\(\d+\)\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function cleanFilename(name: string): string {
  const noExt = name.replace(/\.(pdf|pptx)$/i, "").trim();
  const cleaned = noExt
    .replace(/\s*-\s*Copy(\s*-\s*Copy)*\s*(\s*\(\d+\))?\s*$/gi, "")
    .replace(/\s+Copy(\s*Copy)*\s*(\s*\(\d+\))?\s*$/gi, "")
    .replace(/\s*\(\d+\)\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const ext = (name.match(/\.(pdf|pptx)$/i) ?? [".pdf"])[1].toLowerCase();
  return (cleaned || "document") + "." + ext;
}

function isCopyVariant(name: string): boolean {
  return /\s*-\s*Copy|\s+Copy\s*Copy|Copy\s*\(\d+\)|\(\d+\)\s*\.(pdf|pptx)$/i.test(name);
}

export interface CleanPdfResult {
  deleted: number;
  renamed: number;
  details: string[];
}

export function runCleanCoursePdfs(publicCoursesPath: string, dryRun: boolean): CleanPdfResult {
  const details: string[] = [];
  let deleted = 0;
  let renamed = 0;

  if (!fs.existsSync(publicCoursesPath)) {
    return { deleted: 0, renamed: 0, details: ["Folder not found."] };
  }

  const courseDirs = fs.readdirSync(publicCoursesPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const courseId of courseDirs) {
    const dir = path.join(publicCoursesPath, courseId);
    let files: string[];
    try {
      files = fs.readdirSync(dir).filter((f) => f.endsWith(".pdf") || f.endsWith(".pptx"));
    } catch {
      continue;
    }
    if (files.length === 0) continue;

    const byBase = new Map<string, string[]>();
    for (const f of files) {
      const base = normalizedBase(f);
      if (!byBase.has(base)) byBase.set(base, []);
      byBase.get(base)!.push(f);
    }

    for (const [base, group] of byBase) {
      if (group.length === 1) {
        const name = group[0];
        const clean = cleanFilename(name);
        if (clean !== name) {
          const oldPath = path.join(dir, name);
          const newPath = path.join(dir, clean);
          if (!fs.existsSync(newPath)) {
            details.push(`[${courseId}] Rename: ${name} → ${clean}`);
            if (!dryRun) fs.renameSync(oldPath, newPath);
            renamed++;
          }
        }
        continue;
      }

      const withoutCopy = group.filter((f) => !isCopyVariant(f));
      const toKeep = withoutCopy.length > 0 ? withoutCopy[0] : group[0];
      const toDelete = group.filter((f) => f !== toKeep);

      const targetName = cleanFilename(toKeep);
      const keepPath = path.join(dir, toKeep);
      const targetPath = path.join(dir, targetName);

      if (toKeep !== targetName && !group.includes(targetName)) {
        details.push(`[${courseId}] Keep & rename: ${toKeep} → ${targetName}`);
        if (!dryRun) fs.renameSync(keepPath, targetPath);
        renamed++;
      }

      for (const f of toDelete) {
        const p = path.join(dir, f);
        details.push(`[${courseId}] Delete: ${f}`);
        if (!dryRun) fs.unlinkSync(p);
        deleted++;
      }
    }
  }

  return { deleted, renamed, details };
}

/** Match leading number in filename: "23. Something.pdf", "10+-+Material.pdf" -> 23 or 10; "Something.pdf" -> null */
function leadingNumber(filename: string): number | null {
  const base = path.basename(filename, path.extname(filename));
  const m = base.match(/^(\d+)\s*[.\s\-+]/);
  return m ? parseInt(m[1], 10) : null;
}

export interface NumberPdfsResult {
  renamed: number;
  details: string[];
}

/**
 * After cleaning: in each course folder, ensure every PDF has a leading number.
 * Find max existing number (e.g. 23); assign 24, 25, ... to files without a number.
 */
export function runNumberUnnumberedPdfs(publicCoursesPath: string, dryRun: boolean): NumberPdfsResult {
  const details: string[] = [];
  let renamed = 0;

  if (!fs.existsSync(publicCoursesPath)) {
    return { renamed: 0, details: ["Folder not found."] };
  }

  const courseDirs = fs.readdirSync(publicCoursesPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const courseId of courseDirs) {
    const dir = path.join(publicCoursesPath, courseId);
    let files: string[];
    try {
      files = fs.readdirSync(dir).filter((f) => f.endsWith(".pdf") || f.endsWith(".pptx"));
    } catch {
      continue;
    }
    if (files.length === 0) continue;

    const numbered: number[] = [];
    const unnumbered: string[] = [];
    for (const f of files) {
      const n = leadingNumber(f);
      if (n != null && Number.isFinite(n)) numbered.push(n);
      else unnumbered.push(f);
    }

    const maxNum = numbered.length > 0 ? Math.max(...numbered) : 0;
    let nextNum = maxNum + 1;

    for (const f of unnumbered) {
      const ext = path.extname(f).toLowerCase();
      const base = path.basename(f, ext).trim().replace(/\s+/g, " ");
      const newName = `${nextNum}. ${base}${ext}`;
      const oldPath = path.join(dir, f);
      const newPath = path.join(dir, newName);
      if (f !== newName && !files.includes(newName)) {
        details.push(`[${courseId}] Number: ${f} → ${newName}`);
        if (!dryRun) fs.renameSync(oldPath, newPath);
        renamed++;
        nextNum++;
      }
    }
  }

  return { renamed, details };
}

/** Decode URL-style name and strip all leading number bits and " – " / " - ": "2.2 – Risk" → "Risk" */
function toHumanFileName(baseName: string): string {
  let s = baseName
    .replace(/\+/g, " ")
    .replace(/%20/gi, " ");
  try {
    s = decodeURIComponent(s);
  } catch {
    // keep as-is if not valid URI
  }
  // Strip leading digits, dots, spaces, dashes, pluses, en-dash U+2013, em-dash U+2014
  s = s.replace(/^[\d.\s\-+\u2013\u2014]+/, "");
  // Trim any remaining leading punctuation (space, dot, hyphen, en-dash, em-dash)
  s = s.replace(/^[\s.\-\u2013\u2014]+/, "");
  s = s.replace(/\s+/g, " ").trim();
  s = s.replace(/\s+[-–—]\s*$/, "").trim(); // strip trailing " -" or " – "
  s = s.replace(/\s*[–—]\s*/g, " "); // replace any " – " or " — " with single space
  s = s.replace(/\s*-\s*/g, " "); // replace " - " with single space
  s = s.replace(/[/\\:*?"<>|]/g, " ").replace(/\s+/g, " ").trim();
  return s || "document";
}

/** Extract leading number for sort (e.g. "23. x" → 23, "10+-+x" → 10). */
function leadingNumberForSort(filename: string): number {
  const n = leadingNumber(filename);
  return n != null && Number.isFinite(n) ? n : 999999;
}

export interface NormalizePdfsResult {
  renamed: number;
  converted: number;
  details: string[];
}

/**
 * 1) Convert all .pptx to .pdf in each course folder (LibreOffice headless if available).
 * 2) Rename all PDFs to sequential "1. name.pdf", "2. name.pdf" with clean human-readable names (no 1-+, no + encoding).
 */
export function runNormalizeCoursePdfs(publicCoursesPath: string, dryRun: boolean): NormalizePdfsResult {
  const details: string[] = [];
  let renamed = 0;
  let converted = 0;

  if (!fs.existsSync(publicCoursesPath)) {
    return { renamed: 0, converted: 0, details: ["Folder not found."] };
  }

  const courseDirs = fs.readdirSync(publicCoursesPath, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const courseId of courseDirs) {
    const dir = path.join(publicCoursesPath, courseId);

    // Step 1: Convert PPTX to PDF
    let files = fs.readdirSync(dir);
    const pptxFiles = files.filter((f) => f.toLowerCase().endsWith(".pptx"));
    for (const pptx of pptxFiles) {
      const pptxPath = path.join(dir, pptx);
      if (dryRun) {
        details.push(`[${courseId}] Would convert: ${pptx} → PDF`);
        converted++;
      } else {
        const ok = convertPptxToPdf(pptxPath, dir, false);
        if (ok) {
          try {
            fs.unlinkSync(pptxPath);
          } catch {
            // leave pptx if delete fails
          }
          converted++;
          details.push(`[${courseId}] Convert: ${pptx} → PDF`);
        } else {
          details.push(`[${courseId}] Skip convert (LibreOffice not found): ${pptx}`);
        }
      }
    }

    // Step 2: List PDFs and sort by current number then name (re-read to include newly converted)
    files = fs.readdirSync(dir);
    const pdfs = files.filter((f) => f.toLowerCase().endsWith(".pdf"));
    if (pdfs.length === 0) continue;

    pdfs.sort((a, b) => {
      const na = leadingNumberForSort(a);
      const nb = leadingNumberForSort(b);
      if (na !== nb) return na - nb;
      return a.localeCompare(b);
    });

    // Compute target names: 1. HumanName.pdf, 2. HumanName.pdf
    const targets = pdfs.map((f, i) => {
      const base = path.basename(f, path.extname(f));
      const human = toHumanFileName(base);
      return `${i + 1}. ${human}.pdf`;
    });

    // Rename via temp names to avoid overwriting
    const tempPrefix = "__norm_";
    if (!dryRun) {
      for (let i = 0; i < pdfs.length; i++) {
        const oldPath = path.join(dir, pdfs[i]);
        const tempPath = path.join(dir, tempPrefix + i + path.extname(pdfs[i]));
        fs.renameSync(oldPath, tempPath);
      }
      for (let i = 0; i < pdfs.length; i++) {
        const tempPath = path.join(dir, tempPrefix + i + ".pdf");
        const newPath = path.join(dir, targets[i]);
        fs.renameSync(tempPath, newPath);
        if (pdfs[i] !== targets[i]) {
          details.push(`[${courseId}] ${pdfs[i]} → ${targets[i]}`);
          renamed++;
        }
      }
    } else {
      for (let i = 0; i < pdfs.length; i++) {
        if (pdfs[i] !== targets[i]) {
          details.push(`[${courseId}] Would: ${pdfs[i]} → ${targets[i]}`);
          renamed++;
        }
      }
    }
  }

  return { renamed, converted, details };
}

/** Convert a single PPTX to PDF using LibreOffice headless. Returns true if conversion ran (even if failed). */
function convertPptxToPdf(pptxPath: string, outDir: string, dryRun: boolean): boolean {
  if (dryRun) return true;
  const soffice = findSoffice();
  if (!soffice) return false;
  const result = spawnSync(soffice, [
    "--headless",
    "--convert-to", "pdf",
    "--outdir", outDir,
    pptxPath,
  ], { encoding: "utf8", timeout: 60000 });
  return result.status === 0;
}

function findSoffice(): string | null {
  const candidates = [
    process.env.LIBREOFFICE_PATH,
    "soffice",
    "soffice.exe",
    path.join(process.env["ProgramFiles"] || "C:\\Program Files", "LibreOffice", "program", "soffice.exe"),
    path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", "LibreOffice", "program", "soffice.exe"),
    "/usr/bin/soffice",
    "/usr/bin/libreoffice",
  ].filter(Boolean) as string[];
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
