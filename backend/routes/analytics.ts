import { Request, Response } from "express";
import type { CoursePublic, CourseUsageItem } from "@shared/api";
import { quizzesCollection, enrollmentsCollection } from "../lib/firestore";

const COURSES: CoursePublic[] = [
  { id: "construction", title: "OSH in Construction", sector: "Construction", duration: "3 months" },
  { id: "industrial-safety", title: "OSH in Industrial Safety", sector: "Industrial", duration: "3 months" },
  { id: "mining", title: "OSH in Mining", sector: "Mining", duration: "3 months" },
  { id: "safety-management", title: "Safety Management (General)", sector: "General", duration: "3 months" },
  { id: "safety-for-all", title: "Safety Course for All", sector: "General", duration: "3 months" },
];

/** GET /api/analytics/course-usage – course usage for dashboard (main dashboard only) */
export async function getCourseUsage(_req: Request, res: Response): Promise<void> {
  try {
    const usage: CourseUsageItem[] = [];
    for (const course of COURSES) {
      const [quizDoc, enrollmentsSnap] = await Promise.all([
        quizzesCollection().doc(course.id).get(),
        enrollmentsCollection().where("courseId", "==", course.id).get(),
      ]);
      const hasQuiz = quizDoc.exists;
      const enrollmentCount = enrollmentsSnap.size;
      const completionCount = enrollmentsSnap.docs.filter(
        (d) => (d.data() as { status?: string }).status === "completed"
      ).length;
      const completionRatePercent =
        enrollmentCount > 0 ? Math.round((completionCount / enrollmentCount) * 100) : 0;
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
