import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { mediaPlanSaveSchema } from "@/lib/validations/media-plan";
import { createPlan } from "@/lib/server/plan-repository";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = mediaPlanSaveSchema.parse(await req.json());
    const plan = await createPlan({
      userId: session.user.id,
      familyName: body.familyName,
      locale: body.locale,
      answersJson: body.answersJson,
      generatedPlanJson: body.generatedPlanJson as any,
      notes: body.notes || undefined,
    });

    return NextResponse.json({ id: plan.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Failed to save plan" }, { status: 400 });
  }
}
