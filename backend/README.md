# Backend API

Run the backend **from the project root** (not from this folder):

```bash
pnpm run dev:backend
```

This starts the Express API on **http://localhost:8085**. Every API request and response is logged in the terminal (method, path, status code, duration).

- **Do not** run `npm run dev` from inside the `backend` folder—that starts the frontend (Vite) instead of the API.
- For the full app: in one terminal run `pnpm run dev:backend`, in another run `pnpm run dev:frontend` (or `pnpm run dev` for frontend-only with API proxied if `BACKEND_URL` is set).
