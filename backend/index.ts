import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getTestimonials, postTestimonial } from "./routes/testimonials";
import { postRegister, postLogin, getUsers, patchUserApprove } from "./routes/users";
import { getCourses, getCourseQuiz, putCourseQuiz, deleteCourseQuiz } from "./routes/courses";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Testimonials (admin-managed)
  app.get("/api/testimonials", getTestimonials);
  app.post("/api/testimonials", postTestimonial);

  // Users: register, login, list (admin), approve (admin)
  app.post("/api/register", postRegister);
  app.post("/api/login", postLogin);
  app.get("/api/users", getUsers);
  app.patch("/api/users/:id/approve", patchUserApprove);

  // Courses (list) and per-course quiz (get, create/update, delete)
  app.get("/api/courses", getCourses);
  app.get("/api/courses/:courseId/quiz", getCourseQuiz);
  app.put("/api/courses/:courseId/quiz", putCourseQuiz);
  app.delete("/api/courses/:courseId/quiz", deleteCourseQuiz);

  return app;
}
