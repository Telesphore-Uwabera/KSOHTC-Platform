import { RequestHandler } from "express";
import { testimonialsCollection } from "../lib/firestore";
import type { Testimonial, TestimonialCreate } from "@shared/api";
import crypto from "node:crypto";

export const getTestimonials: RequestHandler = async (_req, res) => {
  try {
    const snap = await testimonialsCollection().get();
    const list = snap.docs
      .map((d) => d.data() as Testimonial)
      .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    res.json(list);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Get testimonials error:", msg, e instanceof Error ? e.stack : "");
    res.status(500).json({ error: "Failed to load testimonials" });
  }
};

export const postTestimonial: RequestHandler = async (req, res) => {
  try {
    const body = req.body as Partial<TestimonialCreate>;
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";
    const quote = typeof body?.quote === "string" ? body.quote.trim() : "";
    if (!name || !quote) {
      res.status(400).json({ error: "name and quote are required" });
      return;
    }
    const testimonial: Testimonial = {
      id: crypto.randomUUID(),
      name,
      role: role || "Participant",
      quote,
      avatarUrl: typeof body?.avatarUrl === "string" ? body.avatarUrl.trim() || undefined : undefined,
      createdAt: new Date().toISOString(),
    };
    await testimonialsCollection().doc(testimonial.id).set(testimonial);
    res.status(201).json(testimonial);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("Post testimonial error:", msg, e instanceof Error ? e.stack : "");
    res.status(500).json({ error: "Failed to add testimonial" });
  }
};
