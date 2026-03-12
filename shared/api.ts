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
export type CourseId = "construction" | "industrial-safety" | "mining";

/** Course summary for admin / API */
export interface CoursePublic {
  id: CourseId;
  title: string;
  sector: string;
  duration: string;
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
