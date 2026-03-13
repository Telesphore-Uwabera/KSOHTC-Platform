/**
 * Seed Firestore with course structure from public/courses (PDFs).
 * Used by the CLI script and by POST /api/admin/seed-courses.
 * Optionally upload PDFs to Firebase Storage and store those URLs in Firestore.
 */
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { courseDoc, moduleDoc, lessonDoc } from "./course-firestore";
import { uploadFileAndGetUrl } from "./storage";
import type { CourseId } from "@shared/api";

export interface SeedOptions {
  /** If true, upload each PDF to Firebase Storage and use that URL in Firestore (cloud-stored PDFs). */
  uploadToStorage?: boolean;
}

interface SeedLesson {
  title: string;
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

export async function runSeedCourses(
  publicCoursesPath: string,
  options?: SeedOptions
): Promise<{ created: string[]; skipped: string[] }> {
  const created: string[] = [];
  const skipped: string[] = [];
  const uploadToStorage = options?.uploadToStorage === true;

  const constructionDir = join(publicCoursesPath, "construction");
  const industrialDir = join(publicCoursesPath, "industrial-safety");
  const miningDir = join(publicCoursesPath, "mining");

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

  const safetyOnlyModules: SeedModule[] = [
    { title: "Core Elements", lessons: [{ title: "Element 1" }, { title: "Element 2" }, { title: "Element 3" }, { title: "Element 4" }] },
  ];
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

  const toSeed: Array<{ slug: CourseId; title: string; sector: string; duration: string; modules: SeedModule[] }> = [
    { slug: "construction", title: "OSH in Construction", sector: "Construction", duration: "2 weeks", modules: constructionModules },
    { slug: "industrial-safety", title: "OSH in Industrial Safety", sector: "Industrial", duration: "2 weeks", modules: industrialModules },
    { slug: "mining", title: "OSH in Mining", sector: "Mining", duration: "3 weeks", modules: miningModules },
    { slug: "safety-management", title: "Safety Management (General)", sector: "General", duration: "1 week", modules: safetyOnlyModules },
    { slug: "safety-for-all", title: "Safety Course for All", sector: "General", duration: "1 week", modules: safetyForAllModules },
  ];

  const orderBySlug: Record<string, number> = {
    construction: 1,
    "industrial-safety": 2,
    mining: 3,
    "safety-management": 4,
    "safety-for-all": 5,
  };

  for (const { slug, title, sector, duration, modules } of toSeed) {
    const now = new Date().toISOString();
    const courseRef = courseDoc(slug);
    const existing = await courseRef.get();
    if (existing.exists) {
      skipped.push(slug);
      continue;
    }
    await courseRef.set({
      slug,
      title,
      description: `${title} – Occupational Safety and Health training.`,
      sector,
      duration,
      published: true,
      order: orderBySlug[slug] ?? 99,
      createdAt: now,
      updatedAt: now,
    });
    created.push(slug);

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
      for (let j = 0; j < mod.lessons.length; j++) {
        const lessonId = crypto.randomUUID();
        const lesson = mod.lessons[j];
        let pdfUrl = lesson.pdfUrl || undefined;
        if (uploadToStorage && lesson.pdfUrl) {
          const filename = decodeURIComponent(lesson.pdfUrl.split("/").pop() ?? "");
          const localPath = join(publicCoursesPath, slug, filename);
          if (existsSync(localPath)) {
            try {
              pdfUrl = await uploadFileAndGetUrl(localPath, `courses/${slug}/${filename}`);
            } catch (e) {
              console.warn(`[seed] Upload failed for ${filename}:`, e instanceof Error ? e.message : e);
            }
          }
        }
        await lessonDoc(slug, moduleId, lessonId).set({
          courseId: slug,
          moduleId,
          title: lesson.title,
          order: j,
          pdfUrl: pdfUrl || undefined,
          contentHtml: "",
          published: true,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  }

  return { created, skipped };
}

/** Course list shape for API (matches CourseDoc minus dates). */
export interface CourseFromFolder {
  id: string;
  title: string;
  description: string;
  sector: string;
  duration: string;
  published: boolean;
  order: number;
  lessonCount?: number;
}

const COURSE_META: Array<{ slug: string; title: string; sector: string; duration: string; order: number }> = [
  { slug: "construction", title: "OSH in Construction", sector: "Construction", duration: "2 weeks", order: 1 },
  { slug: "industrial-safety", title: "OSH in Industrial Safety", sector: "Industrial", duration: "2 weeks", order: 2 },
  { slug: "mining", title: "OSH in Mining", sector: "Mining", duration: "3 weeks", order: 3 },
  { slug: "safety-management", title: "Safety Management (General)", sector: "General", duration: "1 week", order: 4 },
  { slug: "safety-for-all", title: "Safety Course for All", sector: "General", duration: "1 week", order: 5 },
];

/**
 * Read public/courses folder and return course list (no Firestore). Used so the Courses page can show courses even when DB is not seeded.
 */
export function getCoursesFromPublicFolder(publicCoursesPath: string): CourseFromFolder[] {
  const courses: CourseFromFolder[] = [];
  for (const meta of COURSE_META) {
    const dir = join(publicCoursesPath, meta.slug);
    let lessonCount = 0;
    if (existsSync(dir)) {
      try {
        const files = readdirSync(dir).filter((f: string) => f.endsWith(".pdf") || f.endsWith(".pptx"));
        lessonCount = files.length;
      } catch {
        lessonCount = 0;
      }
    }
    courses.push({
      id: meta.slug,
      title: meta.title,
      description: `${meta.title} – Occupational Safety and Health training.`,
      sector: meta.sector,
      duration: meta.duration,
      published: true,
      order: meta.order,
      lessonCount,
    });
  }
  return courses.sort((a, b) => a.order - b.order);
}

export interface LessonFromFolder {
  title: string;
  pdfUrl: string;
}

/**
 * List lessons (PDFs) for a course from public/courses/:courseId/. Use when Firestore has no modules yet.
 */
export function getLessonsFromPublicFolder(publicCoursesPath: string, courseId: string): LessonFromFolder[] {
  const dir = join(publicCoursesPath, courseId);
  if (!existsSync(dir)) return [];
  let files: string[] = [];
  try {
    files = readdirSync(dir).filter((f: string) => f.endsWith(".pdf") || f.endsWith(".pptx"));
  } catch {
    return [];
  }
  return files.map((filename) => ({
    title: lessonTitleFromFilename(filename),
    pdfUrl: `/courses/${courseId}/${encodeURIComponent(filename)}`,
  }));
}
