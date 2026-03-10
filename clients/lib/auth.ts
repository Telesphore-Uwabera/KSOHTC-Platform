import type { UserPublic } from "@shared/api";

const STORAGE_KEY = "ksohtc_user";

export function getStoredUser(): UserPublic | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserPublic;
  } catch {
    return null;
  }
}

export function setStoredUser(user: UserPublic): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  localStorage.removeItem(STORAGE_KEY);
}
