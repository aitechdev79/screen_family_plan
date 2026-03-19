"use server";

import { auth } from "@/auth";
import type { FamilyInput } from "@/lib/plan-engine/types";
import { mediaPlanSaveSchema, familyInputSchema } from "@/lib/validations/media-plan";
import { generatePlan } from "@/lib/plan-engine/generator";
import { createPlan, updatePlan } from "@/lib/server/plan-repository";

export async function generatePlanPreviewAction(input: FamilyInput) {
  const parsed = familyInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false as const,
      error: "Invalid questionnaire input.",
    };
  }

  return {
    ok: true as const,
    data: generatePlan(parsed.data),
  };
}

export async function savePlanAction(payload: {
  familyName: string;
  locale: "vi" | "en";
  answersJson: FamilyInput;
  generatedPlanJson: unknown;
  notes?: string;
}) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { ok: false as const, error: "Unauthorized" };
    }

    const parsed = mediaPlanSaveSchema.safeParse(payload);
    if (!parsed.success) {
      return { ok: false as const, error: "Invalid plan payload." };
    }

    const plan = await createPlan({
      userId: session.user.id,
      familyName: parsed.data.familyName,
      locale: parsed.data.locale,
      answersJson: parsed.data.answersJson,
      generatedPlanJson: parsed.data.generatedPlanJson as any,
      notes: parsed.data.notes || undefined,
    });

    return { ok: true as const, id: plan.id };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Failed to save plan.",
    };
  }
}

export async function updatePlanAction(
  planId: string,
  payload: {
    familyName: string;
    locale: "vi" | "en";
    answersJson: FamilyInput;
    generatedPlanJson: unknown;
    notes?: string;
  },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { ok: false as const, error: "Unauthorized" };
    }

    const parsed = mediaPlanSaveSchema.safeParse(payload);
    if (!parsed.success) {
      return { ok: false as const, error: "Invalid plan payload." };
    }

    const plan = await updatePlan({
      userId: session.user.id,
      planId,
      familyName: parsed.data.familyName,
      locale: parsed.data.locale,
      answersJson: parsed.data.answersJson,
      generatedPlanJson: parsed.data.generatedPlanJson as any,
      notes: parsed.data.notes || undefined,
    });

    return { ok: true as const, id: plan.id, version: plan.version };
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Failed to update plan.",
    };
  }
}
