import { Request, Response } from "express";
import crypto from "node:crypto";
import type { EnrollmentDoc, EnrollmentStatus } from "@shared/api";
import { enrollmentsCollection, progressCollection } from "../lib/firestore";
import { getCourseTotalSteps } from "./course-content";

/** POST /api/enrollments – enroll a user in a course (creates enrollment if not exists) */
export async function postEnrollment(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as { userId: string; courseId: string };
    const { userId, courseId } = body;
    if (!userId || !courseId) {
      res.status(400).json({ error: "userId and courseId are required." });
      return;
    }
    const col = enrollmentsCollection();
    const existing = await col.where("userId", "==", userId).where("courseId", "==", courseId).limit(1).get();
    if (!existing.empty) {
      const doc = existing.docs[0];
      res.status(200).json({ enrollment: { id: doc.id, ...doc.data() } });
      return;
    }
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    const data: Omit<EnrollmentDoc, "id"> = {
      userId,
      courseId,
      enrolledAt: now,
      status: "active",
    };
    await col.doc(id).set({ id, ...data });
    res.status(201).json({ enrollment: { id, ...data } });
  } catch (e) {
    console.error("postEnrollment:", e);
    res.status(500).json({ error: "Failed to enroll." });
  }
}

function progressDocId(userId: string, courseId: string): string {
  return [userId, courseId].join("_");
}

export type EnrollmentWithPercent = EnrollmentDoc & { completionPercent: number };

/** Get enrollments for a user with completion % (for admin learners view). */
export async function getEnrollmentsForUser(userId: string): Promise<EnrollmentWithPercent[]> {
  const snap = await enrollmentsCollection().where("userId", "==", userId).get();
  const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as EnrollmentDoc));
  const withPercent = await Promise.all(
    list.map(async (en) => {
      const [progressSnap, steps] = await Promise.all([
        progressCollection().doc(progressDocId(userId, en.courseId)).get(),
        getCourseTotalSteps(en.courseId),
      ]);
      const totalSteps = steps.totalLessons + steps.totalAssessments;
      const progress = progressSnap.data();
      const completed =
        (progress?.completedLessonIds?.length ?? 0) + (progress?.completedAssessmentIds?.length ?? 0);
      const completionPercent =
        totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
      return { ...en, completionPercent };
    })
  );
  return withPercent;
}

/** GET /api/enrollments?userId= – enrollments for a user (learner); includes completionPercent when userId given */
/** GET /api/enrollments?courseId= – enrollments for a course (admin) */
export async function getEnrollments(req: Request, res: Response): Promise<void> {
  try {
    const { userId, courseId } = req.query as { userId?: string; courseId?: string };
    const col = enrollmentsCollection();
    if (userId) {
      const withPercent = await getEnrollmentsForUser(userId);
      res.json({ enrollments: withPercent });
      return;
    }
    if (courseId) {
      const snap = await col.where("courseId", "==", courseId).get();
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() } as EnrollmentDoc));
      res.json({ enrollments: list });
      return;
    }
    res.status(400).json({ error: "Provide userId or courseId query." });
  } catch (e) {
    console.error("getEnrollments:", e);
    res.status(500).json({ error: "Failed to list enrollments." });
  }
}

/** PATCH /api/enrollments/:id – update status (e.g. completed) */
export async function patchEnrollment(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body as { status?: EnrollmentStatus };
    const ref = enrollmentsCollection().doc(id);
    const snap = await ref.get();
    if (!snap.exists) {
      res.status(404).json({ error: "Enrollment not found." });
      return;
    }
    if (body.status !== undefined) {
      const allowed: EnrollmentStatus[] = ["not_approved", "active", "completed"];
      if (!allowed.includes(body.status)) {
        res.status(400).json({ error: "Invalid status." });
        return;
      }
      await ref.update({ status: body.status });
    }
    const updated = (await ref.get()).data();
    res.json({ enrollment: { id, ...updated } });
  } catch (e) {
    console.error("patchEnrollment:", e);
    res.status(500).json({ error: "Failed to update enrollment." });
  }
}
