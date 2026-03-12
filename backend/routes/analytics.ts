import { Request, Response } from "express";
import type { CoursePublic, CourseUsageItem } from "@shared/api";
import { quizzesCollection } from "../lib/firestore";

const COURSES: CoursePublic[] = [
  { id: "construction", title: "OSH in Construction", sector: "Construction", duration: "2 weeks" },
  { id: "industrial-safety", title: "OSH in Industrial Safety", sector: "Industrial", duration: "2 weeks" },
  { id: "mining", title: "OSH in Mining", sector: "Mining", duration: "3 weeks" },
  { id: "safety-management", title: "Safety Management (General)", sector: "General", duration: "1 week" },
];

/** GET /api/analytics/course-usage – course usage for dashboard (main dashboard only) */
export async function getCourseUsage(_req: Request, res: Response): Promise<void> {
  try {
    const usage: CourseUsageItem[] = [];
    for (const course of COURSES) {
      const quizDoc = await quizzesCollection().doc(course.id).get();
      const hasQuiz = quizDoc.exists;
      // TODO: when enrollments/completions are stored, fill enrollmentCount and completionCount
      const enrollmentCount = 0;
      const completionCount = 0;
      const completionRatePercent = enrollmentCount > 0 ? Math.round((completionCount / enrollmentCount) * 100) : 0;
      usage.push({
        courseId: course.id,
        title: course.title,
        sector: course.sector,
        duration: course.duration,
        hasQuiz,
        enrollmentCount,
        completionCount,
        completionRatePercent,
      });
    }
    res.json({ courseUsage: usage });
  } catch (e) {
    console.error("Course usage error:", e);
    res.status(500).json({ error: "Failed to load course usage." });
  }
}
