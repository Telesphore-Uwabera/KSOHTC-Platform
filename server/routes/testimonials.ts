import { RequestHandler } from "express";
import { readFile, writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "node:crypto";
import { Testimonial, TestimonialCreate } from "@shared/api";

const DATA_DIR = path.join(process.cwd(), "server", "data");
const FILE_PATH = path.join(DATA_DIR, "testimonials.json");

async function loadTestimonials(): Promise<Testimonial[]> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function saveTestimonials(items: Testimonial[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export const getTestimonials: RequestHandler = async (_req, res) => {
  try {
    const list = await loadTestimonials();
    res.json(list);
  } catch (e) {
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
    const list = await loadTestimonials();
    const testimonial: Testimonial = {
      id: crypto.randomUUID(),
      name,
      role: role || "Participant",
      quote,
      avatarUrl: typeof body?.avatarUrl === "string" ? body.avatarUrl.trim() || undefined : undefined,
      createdAt: new Date().toISOString(),
    };
    list.push(testimonial);
    await saveTestimonials(list);
    res.status(201).json(testimonial);
  } catch (e) {
    res.status(500).json({ error: "Failed to add testimonial" });
  }
};
