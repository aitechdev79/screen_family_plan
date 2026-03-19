"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";

const registerSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  locale: z.enum(["vi", "en"]).default("vi"),
});

export async function registerUserAction(input: {
  name?: string;
  email: string;
  password: string;
  locale: "vi" | "en";
}) {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: "Invalid registration data." };
  }

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return { ok: false as const, error: "Email already exists" };
  }

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email,
      locale: parsed.data.locale,
      passwordHash: await hashPassword(parsed.data.password),
    },
    select: { id: true },
  });

  return { ok: true as const };
}
