/**
 * Seed Firestore with course structure from public/courses.
 * Run from project root: pnpm run seed:courses
 * Optional: UPLOAD_PDFS_TO_STORAGE=true to upload PDFs to Firebase Storage (cloud) and store URLs in Firestore.
 * Requires: GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT in .env
 * Firebase Storage requires Blaze plan.
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
  const uploadToStorage = process.env.UPLOAD_PDFS_TO_STORAGE === "true";
  if (uploadToStorage) console.log("Seeding courses and uploading PDFs to Firebase Storage...\n");
  else console.log("Seeding courses from public/courses (PDF URLs will point to local/public)...\n");
  const { created, skipped } = await runSeedCourses(PUBLIC_COURSES, { uploadToStorage });
  if (created.length) console.log("Created:", created.join(", "));
  if (skipped.length) console.log("Skipped (already exist):", skipped.join(", "));
  console.log("\nDone. You can now edit courses in the admin panel and add YouTube links and rich text.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
