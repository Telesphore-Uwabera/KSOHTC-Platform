import { Request, Response } from "express";
import type { User, UserCreate, UserPublic } from "@shared/api";

const users = new Map<string, User>();

function toPublic(u: User): UserPublic {
  const { password: _, ...rest } = u;
  return rest;
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function postRegister(req: Request, res: Response): void {
  try {
    const body = req.body as UserCreate;
    const { email, password, name, organization } = body;
    if (!email || !password || !name) {
      res.status(400).json({ error: "Email, password, and name are required." });
      return;
    }
    const existing = Array.from(users.values()).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      res.status(409).json({ error: "An account with this email already exists." });
      return;
    }
    const user: User = {
      id: generateId(),
      email: email.trim(),
      password,
      name: name.trim(),
      organization: organization?.trim(),
      approved: false,
      createdAt: new Date().toISOString(),
    };
    users.set(user.id, user);
    res.status(201).json({ user: toPublic(user) });
  } catch {
    res.status(500).json({ error: "Registration failed." });
  }
}

export function postLogin(req: Request, res: Response): void {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }
    const user = Array.from(users.values()).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    res.json({ user: toPublic(user) });
  } catch {
    res.status(500).json({ error: "Login failed." });
  }
}

export function getUsers(_req: Request, res: Response): void {
  try {
    const list = Array.from(users.values()).map(toPublic).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    res.json({ users: list });
  } catch {
    res.status(500).json({ error: "Failed to list users." });
  }
}

export function patchUserApprove(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const user = users.get(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    user.approved = true;
    res.json({ user: toPublic(user) });
  } catch {
    res.status(500).json({ error: "Failed to approve user." });
  }
}
