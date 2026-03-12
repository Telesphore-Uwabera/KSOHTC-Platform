/**
 * Seed Firestore with course structure from public/courses.
 * Run from project root: pnpm run seed:courses
 * Requires GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_SERVICE_ACCOUNT in .env
 */
import "dotenv/config";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
// Initialize Firestore (must run before course-firestore)
import "../backend/lib/firestore";
import { courseDoc, moduleDoc, lessonDoc } from "../backend/lib/course-firestore";
import type { CourseId } from "../shared/api";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const PUBLIC_COURSES = join(PROJECT_ROOT, "public", "courses");

interface SeedLesson {
  title: string;
  /** Public path to PDF e.g. /courses/construction/filename.pdf */
  pdfUrl?: string;
}

interface SeedModule {
  title: string;
  lessons: SeedLesson[];
}

function lessonTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.(pdf|pptx)$/i, "")
    .replace(/\s*[-+]\s*/g, " ")
    .replace(/\s*\([^)]*\)\s*/g, "")
    .replace(/\s*-\s*Copy(\s*-\s*Copy)*\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Group PDF filenames into modules by section number; each lesson gets title + pdfUrl from public/courses */
function groupFilesIntoModules(files: string[], courseSlug: string): SeedModule[] {
  const bySection = new Map<number, string[]>();
  for (const f of files) {
    const m = f.match(/^(\d+)\.?\d*[-+]?/);
    const section = m ? parseInt(m[1], 10) : 99;
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section)!.push(f);
  }
  const sections = Array.from(bySection.entries()).sort((a, b) => a[0] - b[0]);
  const modules: SeedModule[] = [];
  for (const [num, names] of sections) {
    const lessons: SeedLesson[] = names.slice(0, 25).map((filename) => ({
      title: lessonTitleFromFilename(filename),
      pdfUrl: `/courses/${courseSlug}/${encodeURIComponent(filename)}`,
    }));
    if (lessons.length) modules.push({ title: `Section ${num}`, lessons });
  }
  return modules;
}

function addSafetyManagementModule(modules: SeedModule[]): void {
  modules.push({
    title: "Safety Management (General)",
    lessons: [
      { title: "Element 1" },
      { title: "Element 2" },
      { title: "Element 3" },
      { title: "Element 4" },
    ],
  });
}

async function seedCourse(
  slug: CourseId,
  title: string,
  sector: string,
  duration: string,
  modules: SeedModule[]
): Promise<void> {
  const now = new Date().toISOString();
  const courseRef = courseDoc(slug);
  const existing = await courseRef.get();
  if (existing.exists) {
    console.log(`Course ${slug} already exists, skipping.`);
    return;
  }
  await courseRef.set({
    slug,
    title,
    description: `${title} – Occupational Safety and Health training.`,
    sector,
    duration,
    published: true,
    order: slug === "construction" ? 1 : slug === "industrial-safety" ? 2 : slug === "mining" ? 3 : slug === "safety-management" ? 4 : 5,
    createdAt: now,
    updatedAt: now,
  });
  console.log(`Created course: ${slug}`);

  for (let i = 0; i < modules.length; i++) {
    const mod = modules[i];
    const moduleId = crypto.randomUUID();
    await moduleDoc(slug, moduleId).set({
      courseId: slug,
      title: mod.title,
      order: i,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`  Module: ${mod.title}`);
    for (let j = 0; j < mod.lessons.length; j++) {
      const lessonId = crypto.randomUUID();
      const lesson = mod.lessons[j];
      await lessonDoc(slug, moduleId, lessonId).set({
        courseId: slug,
        moduleId,
        title: lesson.title,
        order: j,
        pdfUrl: lesson.pdfUrl || undefined,
        contentHtml: "",
        published: true,
        createdAt: now,
        updatedAt: now,
      });
      console.log(`    Lesson: ${lesson.title}${lesson.pdfUrl ? " (PDF)" : ""}`);
    }
  }
}

async function main() {
  console.log("Seeding courses from public/courses...\n");

  const constructionDir = join(PUBLIC_COURSES, "construction");
  const industrialDir = join(PUBLIC_COURSES, "industrial-safety");
  const miningDir = join(PUBLIC_COURSES, "mining");

  let constructionFiles: string[] = [];
  let industrialFiles: string[] = [];
  let miningFiles: string[] = [];
  try {
    constructionFiles = readdirSync(constructionDir).filter((f) => f.endsWith(".pdf") || f.endsWith(".pptx"));
  } catch {
    constructionFiles = ["1.1 Health, Safety and Construction", "1.2 Importance of H&S Management", "1.3 Definitions", "1.4 Hierarchy of Controls", "2.1 Safety Management Plan", "2.2 Risk Analysis", "3.1 Site Inductions", "3.2 Training and VOC", "4.2 Cranes and Lifting", "5.1 Section Review"];
  }
  try {
    industrialFiles = readdirSync(industrialDir).filter((f) => f.endsWith(".pdf") || f.endsWith(".pptx"));
  } catch {
    industrialFiles = ["1 Safety By Design", "2 Hazard Assessment", "6 PPE", "8 Electrical Safety", "10 Material Handling"];
  }
  try {
    miningFiles = readdirSync(miningDir).filter((f) => f.endsWith(".pdf") || f.endsWith(".pptx"));
  } catch {
    miningFiles = ["2 Hazard Assessment", "6 PPE", "8 Electrical Safety", "10 Material Handling", "Health and Safety Module"];
  }

  const constructionModules = groupFilesIntoModules(constructionFiles, "construction");
  addSafetyManagementModule(constructionModules);

  const industrialModules = groupFilesIntoModules(industrialFiles, "industrial-safety");
  addSafetyManagementModule(industrialModules);

  const miningModules = groupFilesIntoModules(miningFiles, "mining");
  addSafetyManagementModule(miningModules);

  await seedCourse("construction", "OSH in Construction", "Construction", "2 weeks", constructionModules);
  await seedCourse("industrial-safety", "OSH in Industrial Safety", "Industrial", "2 weeks", industrialModules);
  await seedCourse("mining", "OSH in Mining", "Mining", "3 weeks", miningModules);

  const safetyOnlyModules: SeedModule[] = [
    {
      title: "Core Elements",
      lessons: [{ title: "Element 1" }, { title: "Element 2" }, { title: "Element 3" }, { title: "Element 4" }],
    },
  ];
  await seedCourse("safety-management", "Safety Management (General)", "General", "1 week", safetyOnlyModules);

  const safetyForAllModules: SeedModule[] = [
    {
      title: "Safety for Everyone",
      lessons: [
        { title: "Introduction to Workplace Safety" },
        { title: "Hazard Awareness" },
        { title: "Emergency Procedures" },
        { title: "Personal Protective Equipment" },
      ],
    },
  ];
  await seedCourse("safety-for-all", "Safety Course for All", "General", "1 week", safetyForAllModules);

  console.log("\nDone. You can now edit courses in the admin panel and add YouTube links and rich text.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
