import { defineConfig, Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./backend";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env (including non-VITE_ keys) for Vite config usage
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.BACKEND_URL?.trim();
  const useSeparateBackend = Boolean(backendUrl);

  return {
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: ["./clients", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "backend/**"],
      },
      proxy: useSeparateBackend
        ? {
            "/api": {
              target: backendUrl,
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
    build: {
      outDir: "dist/spa",
    },
    plugins: useSeparateBackend ? [react()] : [react(), expressPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./clients"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
  };
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
