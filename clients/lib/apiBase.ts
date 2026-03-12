/**
 * When frontend is on Netlify and backend on Render, set VITE_API_URL in Netlify env
 * (e.g. https://ksohtc-api.onrender.com). Leave unset for local dev (same origin).
 */
export function getApiBase(): string {
  return (import.meta.env.VITE_API_URL as string) ?? "";
}
