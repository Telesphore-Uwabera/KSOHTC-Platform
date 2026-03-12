import { Request, Response } from "express";
import path from "node:path";
import { runSeedCourses } from "../lib/seed-courses";

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
