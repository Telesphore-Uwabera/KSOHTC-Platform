import path from "path";
import { createServer } from "./index";
import * as express from "express";

console.log("[START] Backend process starting...");
const app = createServer();
const port = process.env.PORT || 3000;

// When API_ONLY or RENDER is set (e.g. backend on Render), only run the API; frontend is on Netlify
const apiOnly = process.env.API_ONLY === "true" || process.env.RENDER === "true";

if (!apiOnly) {
  const __dirname = import.meta.dirname;
  const distPath = path.join(__dirname, "../spa");
  app.use(express.static(distPath));
  app.get("/{*path}", (req, res) => {
    if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  if (apiOnly) {
    console.log(`[OK] API server running on port ${port}`);
    console.log(`[API] Base URL: http://localhost:${port}/api`);
    console.log(`[LOG] Hit GET /health to verify Firestore. Logs appear in Render -> your service -> Logs tab.`);
  } else {
    console.log(`[OK] Server running on port ${port}`);
    console.log(`[APP] Frontend: http://localhost:${port}`);
    console.log(`[API] http://localhost:${port}/api`);
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[STOP] Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("[STOP] Received SIGINT, shutting down gracefully");
  process.exit(0);
});
