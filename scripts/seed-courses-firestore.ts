/**
 * Seed Firestore with course structure from public/courses.
 * Run from project root: pnpm run seed:courses
 * Requires GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT in .env
 */
import "dotenv/config";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const PUBLIC_COURSES = join(PROJECT_ROOT, "public", "courses");

// Initialize Firestore before importing course-firestore
import "../backend/lib/firestore";
import { runSeedCourses } from "../backend/lib/seed-courses";

async function main() {
  console.log("Seeding courses from public/courses...\n");
  const { created, skipped } = await runSeedCourses(PUBLIC_COURSES);
  if (created.length) console.log("Created:", created.join(", "));
  if (skipped.length) console.log("Skipped (already exist):", skipped.join(", "));
  console.log("\nDone. You can now edit courses in the admin panel and add YouTube links and rich text.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
