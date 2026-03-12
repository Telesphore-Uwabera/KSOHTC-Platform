import { Request, Response } from "express";
import type { User, UserCreate, UserPublic } from "@shared/api";
import { usersCollection } from "../lib/firestore";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toPublic(u: User): UserPublic {
  const { password: _, ...rest } = u;
  return rest;
}

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function postRegister(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as UserCreate;
    const { email, password, name, organization } = body;
    if (!email || !password || !name) {
      res.status(400).json({ error: "Email, password, and name are required." });
      return;
    }
    const col = usersCollection();
    const existingSnap = await col.where("email", "==", email.trim().toLowerCase()).limit(1).get();
    if (!existingSnap.empty) {
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
    const forFirestore = Object.fromEntries(
      Object.entries(user).filter(([, v]) => v !== undefined)
    ) as Record<string, unknown>;
    await col.doc(user.id).set(forFirestore);
    res.status(201).json({ user: toPublic(user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const stack = e instanceof Error ? e.stack : "";
    console.error("[REGISTER]", msg);
    if (stack) console.error("[REGISTER stack]", stack);
    res.status(500).json({ error: "Registration failed. Please try again later or contact support." });
  }
}

export async function postLogin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    // Admin login via environment variables (recommended for initial setup)
    const adminEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : "";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "";
    if (adminEmail && adminPassword && normalizeEmail(email) === adminEmail && password === adminPassword) {
      const now = new Date().toISOString();
      const adminUser: User = {
        id: "admin",
        email: adminEmail,
        password: "__env__",
        name: "Administrator",
        approved: true,
        role: "admin",
        createdAt: now,
      };
      res.json({ user: toPublic(adminUser) });
      return;
    }

    const col = usersCollection();
    const snap = await col.where("email", "==", normalizeEmail(email)).limit(1).get();
    const doc = snap.docs[0];
    if (!doc) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    const user = doc.data() as User;
    if (user.password !== password) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    // Default to learner role if not set
    if (!user.role) user.role = "learner";
    res.json({ user: toPublic(user) });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Login failed." });
  }
}

export async function getUsers(_req: Request, res: Response): Promise<void> {
  try {
    const snap = await usersCollection().get();
    const list = snap.docs
      .map((d) => toPublic(d.data() as User))
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    res.json({ users: list });
  } catch (e) {
    console.error("Get users error:", e);
    res.status(500).json({ error: "Failed to list users." });
  }
}

export async function patchUserApprove(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const ref = usersCollection().doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    await ref.update({ approved: true });
    const user = doc.data() as User;
    res.json({ user: toPublic({ ...user, approved: true }) });
  } catch (e) {
    console.error("Approve user error:", e);
    res.status(500).json({ error: "Failed to approve user." });
  }
}
