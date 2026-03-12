import { defineConfig, Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./backend";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env (including non-VITE_ keys) for Vite config usage
  const env = loadEnv(mode, process.cwd(), "");
  // Only use proxy when explicitly requested (run backend separately with pnpm run dev:backend)
  const useProxy =
    env.VITE_DEV_USE_PROXY === "true" && env.BACKEND_URL?.trim();
  const backendUrl = env.BACKEND_URL?.trim();

  return {
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: ["./clients", "./shared"],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "backend/**"],
      },
      proxy: useProxy && backendUrl
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
    plugins: useProxy ? [react()] : [react(), expressPlugin()],
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
