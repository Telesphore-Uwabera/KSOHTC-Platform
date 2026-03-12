# KSOHTC Platform

Production-ready full-stack React app with Express backend: React Router 6 SPA, TypeScript, Vite, TailwindCSS, Firebase Firestore. Only add API endpoints when necessary (e.g. private keys, DB operations).

---

## Tech stack

- **PNPM** – package manager
- **Frontend** – React 18, React Router 6, TypeScript, Vite, TailwindCSS 3, Radix UI, Lucide React
- **Backend** – Express, Firebase Admin (Firestore)
- **Testing** – Vitest

---

## Project structure

```
clients/          # React SPA
├── pages/        # Route components (Index = home, admin/* = admin)
├── components/ui/
├── App.tsx
└── global.css

backend/          # Express API
├── index.ts      # Loads .env from root and backend/.env
├── lib/          # Firestore, etc.
└── routes/

shared/api.ts     # Shared types
```

**Storage:** Firestore for users, testimonials, quizzes, and course content. Set `GOOGLE_APPLICATION_CREDENTIALS` or `FIREBASE_SERVICE_ACCOUNT` in `.env` (see `.env.example`).

---

## Development

```bash
pnpm dev          # Client + server (single port 8080)
pnpm dev:backend  # Backend only on :8085
pnpm dev:frontend  # Frontend only
pnpm build        # Production build
pnpm start        # Production server
pnpm typecheck
pnpm test
```

- **API prefix:** `/api/`
- **Backend:** Run from project root; do not run `pnpm dev` from inside `backend/` (that runs Vite). Backend logs each request (method, path, status, duration).

---

## Environment

- **Root:** `.env` at project root (see `.env.example`).
- **Backend:** Also reads `backend/.env` if present. Use for Firebase credentials, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `FRONTEND_URL` (CORS), etc.

---

## Firebase

### Firestore rules (CLI)

Rules live in **`firestore.rules`** (deny client access; backend uses Admin SDK).

1. Install CLI: `pnpm add -D firebase-tools`
2. Login: `pnpm exec firebase login`
3. Project: `.firebaserc` uses `ksohtc-188e5`; change with `pnpm exec firebase use <project-id>`
4. Deploy rules: `pnpm run firebase:deploy-rules` or `pnpm exec firebase deploy --only firestore:rules`

---

## Courses (Firestore)

Course list and content (modules, lessons, assessments) are in Firestore; served at `/api/course-content/*`. Public **Courses** and **Course detail** pages use these APIs.

### Upload courses (seed)

1. Set `GOOGLE_APPLICATION_CREDENTIALS` in `.env`.
2. From project root: `pnpm run seed:courses`
3. Creates courses: construction, industrial-safety, mining, safety-management (with modules/lessons from `public/courses`). New courses are `published: true`. If the seed fails, add courses in **Admin → Course content** and publish.

### Where students learn

- **Courses** (`/courses`) – list published courses (login + approval required for materials).
- **Course detail** (`/courses/:courseId`) – description, modules, lessons (PDF, YouTube, text), module quizzes, and course quiz link.
- **Dashboard** (`/dashboard`) – for approved learners; “My learning” and links to courses. Nav: **Dashboard** → not enrolled goes to **Register**; after approval, dashboard shows courses.

---

## Admin

- **Dashboard** (`/admin`) – analytics, course usage, learner approvals.
- **Learners** (`/admin/learners`) – approve registrations.
- **Testimonials** (`/admin/testimonials`) – add testimonials.
- **Courses & Quizzes** (`/admin/courses`) – set/edit course quiz.
- **Course content** (`/admin/course-content`) – edit courses, modules, lessons (YouTube, PDF, text), assessments per module.

Routes: `/admin`, `/admin/courses`, `/admin/course-content`, etc. Admin login at `/admin/login`.

---

## Deployment

### Backend (Render)

1. Web Service, connect repo.
2. **Build:** `pnpm install && pnpm run build:backend`
3. **Start:** `node dist/backend/production.mjs` (or per `render.yaml`)
4. **Environment variables (required):** In Render → your service → **Environment** tab, add these. Your `backend/.env` is not deployed (gitignored), so Render must have them:
   - **`FIREBASE_SERVICE_ACCOUNT`** – Paste the full Firebase service account JSON (single line, no line breaks). Without this, register/login will return **500** because the backend cannot connect to Firestore.
   - **`ADMIN_EMAIL`** – Admin login email.
   - **`ADMIN_PASSWORD`** – Admin login password.
   - **`FRONTEND_URL`** – Your Netlify URL, e.g. `https://ksohtc.netlify.app` (for CORS).
   - Optional: `RENDER=true`, `NODE_ENV=production`.

**If register or login returns 500:** Add or fix `FIREBASE_SERVICE_ACCOUNT` in Render → Environment, then redeploy.

**Viewing backend logs on Render:** Open your service → **Logs** tab (left sidebar under the service name). Use "Live" or "All" to see stdout/stderr. After deploy, you should see `[START] Backend process starting...` and `[OK] API server running...`. Hit `GET https://your-service.onrender.com/health` to test Firestore; logs will show `[HEALTH] Firestore OK` or `[HEALTH] Firestore FAIL: <message>`.

### Frontend (Netlify)

1. **Build:** `pnpm run build:clients` (or `pnpm install && pnpm run build:clients`)
2. **Publish:** `dist/spa`
3. **Env:** In Netlify → Site settings → Environment variables, add **`VITE_API_URL`** = your backend URL (e.g. `https://ksohtc-platform.onrender.com`, no trailing slash). **Redeploy** after adding or changing it (Vite bakes `VITE_*` in at build time; `clients/.env` is not used on Netlify).

If login/register return 404: the app is calling Netlify’s URL for `/api`. Set `VITE_API_URL` in Netlify and trigger a new deploy.

**Preview/thumbnail:** `index.html` has Open Graph and Twitter meta tags so shared links show a preview (og:image points to logo.webp). For Netlify's dashboard card: Site settings → General → Social preview image.

Backend and frontend are separate: backend on Render, frontend on Netlify; frontend calls backend via `VITE_API_URL`.

---

## Adding features

- **New API route:** Add handler in `backend/routes/`, register in `backend/index.ts` under `/api/...`. Optionally add types in `shared/api.ts`.
- **New page:** Create `clients/pages/MyPage.tsx`, add `<Route path="/my-page" element={<MyPage />} />` in `clients/App.tsx` (above the `*` route).
