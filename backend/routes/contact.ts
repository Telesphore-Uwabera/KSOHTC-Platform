import { Request, Response } from "express";
import { inquiriesCollection } from "../lib/firestore";

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function postContact(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as { name?: string; email?: string; message?: string };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    const doc = {
      id: generateId(),
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    await inquiriesCollection().doc(doc.id).set(doc);
    res.status(201).json({ ok: true, id: doc.id });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[CONTACT]", msg);
    res.status(500).json({ error: "Failed to send message. Please try again or contact us by email." });
  }
}
