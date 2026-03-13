import type { UserPublic } from "@shared/api";

const STORAGE_KEY = "ksohtc_user";
const SESSION_KEY = "ksohtc_session_at";

/** Session duration: 1 day */
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

function isSessionExpired(): boolean {
  try {
    const at = localStorage.getItem(SESSION_KEY);
    if (!at) return true;
    const loggedInAt = parseInt(at, 10);
    if (Number.isNaN(loggedInAt)) return true;
    return Date.now() - loggedInAt > SESSION_DURATION_MS;
  } catch {
    return true;
  }
}

export function getStoredUser(): UserPublic | null {
  try {
    if (isSessionExpired()) {
      clearStoredUser();
      return null;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserPublic;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserPublic): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_KEY, String(Date.now()));
}

export function clearStoredUser(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
}
