/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Testimonial (admin-managed)
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
  createdAt?: string;
}

export type TestimonialCreate = Omit<Testimonial, "id" | "createdAt">;

/** User (registrant); access to courses only after admin approval */
export interface User {
  id: string;
  email: string;
  password: string; // stored in plain text for demo; use hash in production
  name: string;
  organization?: string;
  approved: boolean;
  role?: "learner" | "admin";
  createdAt: string;
}

export type UserCreate = Pick<User, "email" | "password" | "name" | "organization">;
export type UserPublic = Omit<User, "password">;

/** Course identifier (must match client course ids) */
export type CourseId = "construction" | "industrial-safety" | "mining" | "safety-management";

/** Course document (Firestore) */
export interface CourseDoc {
  id: string;
  slug: CourseId;
  title: string;
  description: string;
  sector: string;
  duration: string;
  coverImageUrl?: string;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/** Course summary for admin / API (backward compatible) */
export interface CoursePublic {
  id: CourseId;
  title: string;
  sector: string;
  duration: string;
}

/** Module (subunit) under a course */
export interface ModuleDoc {
  id: string;
  courseId: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

/** Lesson under a module: optional YouTube link, optional PDF (stored in public/courses, path from DB), optional text */
export interface LessonDoc {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  order: number;
  youtubeUrl?: string;
  /** Public URL or path to PDF e.g. /courses/construction/1.1-Health-Safety.pdf */
  pdfUrl?: string;
  contentHtml: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Assessment (quiz) after a subunit - stored per module */
export interface AssessmentDoc {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passThreshold: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Enrollment: learner enrolled in course */
export interface EnrollmentDoc {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
}

/** Submission: learner's quiz attempt */
export interface SubmissionDoc {
  id: string;
  userId: string;
  courseId: string;
  assessmentId: string;
  moduleId: string;
  answers: number[]; // selected option index per question
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}

/** Progress: learner progress in a course */
export interface ProgressDoc {
  id: string;
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  lastLessonId?: string;
  updatedAt: string;
}

/** Single quiz/assessment question (multiple choice) */
export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

/** Quiz or assessment attached to a course (set by admin) */
export interface Quiz {
  id: string;
  courseId: CourseId;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passThreshold: number; // 0–100 percentage
  createdAt: string;
  updatedAt: string;
}

export type QuizCreate = Omit<Quiz, "id" | "createdAt" | "updatedAt">;
export type QuizUpdate = Partial<Omit<Quiz, "id" | "courseId" | "createdAt">> & { updatedAt: string };

/** Per-course usage for dashboard analytics (main dashboard only) */
export interface CourseUsageItem {
  courseId: string;
  title: string;
  sector: string;
  duration: string;
  hasQuiz: boolean;
  enrollmentCount: number;
  completionCount: number;
  completionRatePercent: number;
}
