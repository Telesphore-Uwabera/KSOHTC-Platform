# KSOHTC Platform

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with an Express server, only create endpoints when strictly necessary—for example to encapsulate logic that must live on the server, such as private keys handling or certain DB operations.

## Tech Stack

- **PNPM**: Prefer pnpm
- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
clients/                  # Frontend (React SPA)
├── pages/                # Route components (Index.tsx = home)
│   └── admin/            # Admin area: dashboard, courses & quizzes
├── components/ui/        # Pre-built UI component library
├── App.tsx               # App entry point and SPA routing setup
└── global.css            # TailwindCSS 3 theming and global styles

backend/                  # Express API (backend)
├── index.ts              # Server setup and routes
├── lib/                  # Shared backend logic (e.g. Firestore)
└── routes/               # API handlers

shared/                   # Types used by clients & backend
└── api.ts                # Shared API types
```

**Storage**: Firebase Firestore is used for **users**, **testimonials**, and **quizzes**. Set `GOOGLE_APPLICATION_CREDENTIALS` (path to service account JSON) or `FIREBASE_SERVICE_ACCOUNT` (JSON string). See `.env.example`.

## Development Commands

```bash
pnpm dev        # Start dev server (client + server)
pnpm build      # Production build
pnpm start      # Start production server
pnpm typecheck  # TypeScript validation
pnpm test       # Run Vitest tests
```

## SPA Routing

- Routes are defined in `clients/App.tsx` using React Router 6.
- Route components live in `clients/pages/` (e.g. `Index.tsx` = home). Admin pages live in `clients/pages/admin/`.

## Styling

- **Primary**: TailwindCSS 3 utility classes
- **Theme**: `clients/global.css` and `tailwind.config.ts`
- **UI**: Pre-built components in `clients/components/ui/`
- **Utility**: `cn()` (clsx + tailwind-merge) for conditional classes

## API

- **Dev**: Single port (8080) for frontend and backend
- **Prefix**: `/api/` for API routes
- **Example**: `GET /api/ping`, `GET /api/demo`

## Adding Features

### New API Route

1. Optionally add a shared type in `shared/api.ts`.
2. Add handler in `server/routes/` and register in `server/index.ts` under `/api/...`.

### New Page

1. Create `client/pages/MyPage.tsx`.
2. Add `<Route path="/my-page" element={<MyPage />} />` in `client/App.tsx` (above the catch-all `*` route).

## Production

- **Build**: `pnpm build`
- **Run**: `pnpm start`
- **Deploy**: Netlify or Vercel work well with this setup.

## Deploy on Netlify

1. **Push your code** to a Git host (GitHub, GitLab, or Bitbucket).

2. **Log in to [Netlify](https://app.netlify.com)** and click **Add new site** → **Import an existing project**.

3. **Connect your repository** (e.g. GitHub) and select this repo.

4. **Build settings** (usually auto-filled from `netlify.toml`):
   - **Build command:** `pnpm run build:client`
   - **Publish directory:** `dist/spa`
   - **Functions directory:** `netlify/functions`

5. **Deploy.** Netlify will install deps with pnpm, run the build, and deploy the SPA. The Express API runs as a serverless function; `/api/*` is forwarded to it automatically.

6. **Optional:** Set **Node version** to `20` in **Site settings** → **Environment** if needed (also set in `netlify.toml`).
