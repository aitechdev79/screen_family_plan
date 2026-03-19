import { NextRequest, NextResponse } from "next/server";
import { generatePlan } from "@/lib/plan-engine/generator";
import { familyInputSchema } from "@/lib/validations/media-plan";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = familyInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const plan = generatePlan(parsed.data);
    return NextResponse.json(plan);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}
