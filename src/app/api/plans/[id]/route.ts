import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { mediaPlanSaveSchema } from "@/lib/validations/media-plan";
import { getUserPlanById, updatePlan } from "@/lib/server/plan-repository";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const plan = await getUserPlanById(session.user.id, id);
  if (!plan) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(plan);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = mediaPlanSaveSchema.parse(await req.json());
    const plan = await updatePlan({
      userId: session.user.id,
      planId: id,
      familyName: body.familyName,
      locale: body.locale,
      answersJson: body.answersJson,
      generatedPlanJson: body.generatedPlanJson as any,
      notes: body.notes || undefined,
    });

    return NextResponse.json({ id: plan.id, version: plan.version });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Failed to update plan" }, { status: 400 });
  }
}
