import { Request, Response } from "express";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "node:crypto";
import type { CourseId, CoursePublic, Quiz } from "@shared/api";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const QUIZZES_PATH = path.join(DATA_DIR, "quizzes.json");

const COURSES: CoursePublic[] = [
  { id: "construction", title: "OSH in Construction", sector: "Construction", duration: "2 weeks" },
  { id: "industrial-safety", title: "OSH in Industrial Safety", sector: "Industrial", duration: "2 weeks" },
  { id: "mining", title: "OSH in Mining", sector: "Mining", duration: "3 weeks" },
];

async function loadQuizzes(): Promise<Quiz[]> {
  try {
    const raw = await readFile(QUIZZES_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function saveQuizzes(items: Quiz[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(QUIZZES_PATH, JSON.stringify(items, null, 2), "utf-8");
}

function isValidCourseId(id: string): id is CourseId {
  return COURSES.some((c) => c.id === id);
}

/** GET /api/courses – list courses (for admin) */
export function getCourses(_req: Request, res: Response): void {
  res.json({ courses: COURSES });
}

/** GET /api/courses/:courseId/quiz – get quiz for a course (public, for course detail & take quiz) */
export async function getCourseQuiz(req: Request, res: Response): Promise<void> {
  try {
    const { courseId } = req.params;
    if (!isValidCourseId(courseId)) {
      res.status(404).json({ error: "Course not found." });
      return;
    }
    const quizzes = await loadQuizzes();
    const quiz = quizzes.find((q) => q.courseId === courseId);
    if (!quiz) {
      res.status(404).json({ error: "No quiz set for this course." });
      return;
    }
    res.json(quiz);
  } catch {
    res.status(500).json({ error: "Failed to load quiz." });
  }
}

/** PUT /api/courses/:courseId/quiz – create or update quiz (admin) */
export async function putCourseQuiz(req: Request, res: Response): Promise<void> {
  try {
    const { courseId } = req.params;
    if (!isValidCourseId(courseId)) {
      res.status(404).json({ error: "Course not found." });
      return;
    }
    const body = req.body as {
      title?: string;
      description?: string;
      questions?: Array<{ id?: string; text: string; options: string[]; correctIndex: number }>;
      passThreshold?: number;
    };
    const quizzes = await loadQuizzes();
    const existingIndex = quizzes.findIndex((q) => q.courseId === courseId);
    const now = new Date().toISOString();

    const questions = (body.questions ?? []).map((q) => ({
      id: q.id ?? crypto.randomUUID(),
      text: String(q.text ?? "").trim(),
      options: Array.isArray(q.options) ? q.options.map((o) => String(o).trim()) : [],
      correctIndex: Math.max(0, Math.min(Number(q.correctIndex) || 0, (q.options?.length ?? 1) - 1)),
    }));

    const quizPayload: Quiz = {
      id: existingIndex >= 0 ? quizzes[existingIndex].id : crypto.randomUUID(),
      courseId: courseId as CourseId,
      title: String(body.title ?? "Course assessment").trim() || "Course assessment",
      description: typeof body.description === "string" ? body.description.trim() || undefined : undefined,
      questions,
      passThreshold: Math.max(0, Math.min(100, Number(body.passThreshold) ?? 70)),
      createdAt: existingIndex >= 0 ? quizzes[existingIndex].createdAt : now,
      updatedAt: now,
    };

    if (existingIndex >= 0) {
      quizzes[existingIndex] = quizPayload;
    } else {
      quizzes.push(quizPayload);
    }
    await saveQuizzes(quizzes);
    res.json(quizPayload);
  } catch {
    res.status(500).json({ error: "Failed to save quiz." });
  }
}

/** DELETE /api/courses/:courseId/quiz – remove quiz (admin) */
export async function deleteCourseQuiz(req: Request, res: Response): Promise<void> {
  try {
    const { courseId } = req.params;
    if (!isValidCourseId(courseId)) {
      res.status(404).json({ error: "Course not found." });
      return;
    }
    const quizzes = await loadQuizzes();
    const filtered = quizzes.filter((q) => q.courseId !== courseId);
    if (filtered.length === quizzes.length) {
      res.status(404).json({ error: "No quiz set for this course." });
      return;
    }
    await saveQuizzes(filtered);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete quiz." });
  }
}
