import { Request, Response } from "express";
import crypto from "node:crypto";
import type { ProgressDoc } from "@shared/api";
import { progressCollection } from "../lib/firestore";

function progressId(userId: string, courseId: string): string {
  return [userId, courseId].join("_");
}

/** GET /api/progress?userId=&courseId= – get progress for a user in a course (or all courses if courseId omitted) */
export async function getProgress(req: Request, res: Response): Promise<void> {
  try {
    const { userId, courseId } = req.query as { userId?: string; courseId?: string };
    if (!userId) {
      res.status(400).json({ error: "userId is required." });
      return;
    }
    if (courseId) {
      const id = progressId(userId, courseId);
      const doc = await progressCollection().doc(id).get();
      if (!doc.exists) {
        res.json({
          progress: {
            id,
            userId,
            courseId,
            completedLessonIds: [],
            completedAssessmentIds: [],
            updatedAt: new Date().toISOString(),
          },
        });
        return;
      }
      const data = doc.data() as ProgressDoc;
      res.json({
        progress: {
          ...data,
          completedAssessmentIds: data.completedAssessmentIds ?? [],
        },
      });
      return;
    }
    const snapshot = await progressCollection().where("userId", "==", userId).get();
    const progressList = snapshot.docs.map((d) => {
      const data = d.data() as ProgressDoc;
      return { ...data, completedAssessmentIds: data.completedAssessmentIds ?? [] };
    });
    res.json({ progress: progressList });
  } catch (e) {
    console.error("getProgress:", e);
    res.status(500).json({ error: "Failed to get progress." });
  }
}

/** PATCH /api/progress – mark lesson complete or update progress */
export async function patchProgress(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as {
      userId: string;
      courseId: string;
      completedLessonId?: string;
      completedAssessmentId?: string;
    };
    const { userId, courseId, completedLessonId, completedAssessmentId } = body;
    if (!userId || !courseId) {
      res.status(400).json({ error: "userId and courseId are required." });
      return;
    }
    const id = progressId(userId, courseId);
    const ref = progressCollection().doc(id);
    const snap = await ref.get();
    const now = new Date().toISOString();
    if (!snap.exists) {
      const data: ProgressDoc = {
        id,
        userId,
        courseId,
        completedLessonIds: completedLessonId ? [completedLessonId] : [],
        completedAssessmentIds: completedAssessmentId ? [completedAssessmentId] : [],
        lastLessonId: completedLessonId,
        updatedAt: now,
      };
      await ref.set(data);
      res.json({ progress: data });
      return;
    }
    const current = snap.data() as ProgressDoc;
    const completedLessonIds = [...(current.completedLessonIds ?? [])];
    const completedAssessmentIds = [...(current.completedAssessmentIds ?? [])];
    if (completedLessonId && !completedLessonIds.includes(completedLessonId)) {
      completedLessonIds.push(completedLessonId);
    }
    if (completedAssessmentId && !completedAssessmentIds.includes(completedAssessmentId)) {
      completedAssessmentIds.push(completedAssessmentId);
    }
    const updated: ProgressDoc = {
      ...current,
      completedLessonIds,
      completedAssessmentIds,
      lastLessonId: completedLessonId ?? current.lastLessonId,
      updatedAt: now,
    };
    await ref.set(updated);
    res.json({ progress: updated });
  } catch (e) {
    console.error("patchProgress:", e);
    res.status(500).json({ error: "Failed to update progress." });
  }
}
