import { Request, Response } from "express";
import path from "node:path";
import { runSeedCourses } from "../lib/seed-courses";
import { getPublicCoursesPath, runCleanCoursePdfs, runNumberUnnumberedPdfs } from "../lib/clean-course-pdfs";

/**
 * POST /api/admin/seed-courses
 * Body: { seedSecret?: string } or header X-Seed-Secret.
 * Requires ADMIN_SEED_SECRET in env to match (if set). If not set, any request can run seed (use in dev only).
 */
export async function postSeedCourses(req: Request, res: Response): Promise<void> {
  try {
    const secret = process.env.ADMIN_SEED_SECRET;
    if (secret) {
      const provided =
        (req.body as { seedSecret?: string }).seedSecret ??
        req.headers["x-seed-secret"];
      if (provided !== secret) {
        res.status(403).json({ error: "Invalid or missing seed secret." });
        return;
      }
    }

    const publicCoursesPath = path.resolve(process.cwd(), "public", "courses");
    const result = await runSeedCourses(publicCoursesPath);
    res.json({
      ok: true,
      message: "Seed completed.",
      created: result.created,
      skipped: result.skipped,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Seed courses error:", msg, e);
    res.status(500).json({
      error: "Seed failed.",
      detail: msg,
    });
  }
}

/**
 * POST /api/admin/clean-course-pdfs
 * Deletes duplicate PDFs (Copy variants) and renames to clean names in public/courses.
 * Body: { dryRun?: boolean, seedSecret?: string }. Same auth as seed if ADMIN_SEED_SECRET set.
 */
export async function postCleanCoursePdfs(req: Request, res: Response): Promise<void> {
  try {
    const secret = process.env.ADMIN_SEED_SECRET;
    if (secret) {
      const provided = (req.body as { seedSecret?: string }).seedSecret ?? req.headers["x-seed-secret"];
      if (provided !== secret) {
        res.status(403).json({ error: "Invalid or missing seed secret." });
        return;
      }
    }
    const dryRun = (req.body as { dryRun?: boolean }).dryRun === true;
    const publicCoursesPath = getPublicCoursesPath();
    const result = runCleanCoursePdfs(publicCoursesPath, dryRun);
    const numberResult = runNumberUnnumberedPdfs(publicCoursesPath, dryRun);
    res.json({
      ok: true,
      deleted: result.deleted,
      renamed: result.renamed,
      details: result.details,
      numberRenamed: numberResult.renamed,
      numberDetails: numberResult.details,
      dryRun,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Clean course PDFs error:", msg, e);
    res.status(500).json({ error: "Clean failed.", detail: msg });
  }
}
