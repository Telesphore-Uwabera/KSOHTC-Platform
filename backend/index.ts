import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { getTestimonials, postTestimonial } from "./routes/testimonials";
import { postRegister, postLogin, getUsers, patchUserApprove } from "./routes/users";
import { getCourses, getCourseQuiz, putCourseQuiz, deleteCourseQuiz } from "./routes/courses";
import { getCourseUsage } from "./routes/analytics";

/** Log each request and response to the terminal (method, path, status, duration) */
function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const method = req.method;
  const path = req.originalUrl || req.url;
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor = status >= 500 ? "\x1b[31m" : status >= 400 ? "\x1b[33m" : "\x1b[32m";
    console.log(
      `${new Date().toISOString()} ${method} ${path} ${statusColor}${status}\x1b[0m ${duration}ms`
    );
  });
  next();
}

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);

  // When running standalone, make it clear this is the API server (not the frontend)
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
  app.get("/", (_req, res) => {
    res.json({
      service: "backend",
      message: "API server. Use the frontend for the website.",
      api: "/api",
      frontend: frontendUrl,
    });
  });
  app.get("/api", (_req, res) => {
    res.json({
      message: "API root. Use endpoints like /api/ping, /api/courses, /api/users, etc.",
      frontend: frontendUrl,
    });
  });

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

  // Analytics (for main dashboard only)
  app.get("/api/analytics/course-usage", getCourseUsage);

  return app;
}
