import { buildDailyRhythm } from "./rhythm";
import { buildFamilyRules } from "./rules";
import { scoreAction } from "./scoring";
import { ACTION_TEMPLATES } from "./templates";
import { buildParentTips } from "./tips";
import { FamilyInput, GeneratedPlan } from "./types";

function toPriorityAreas(concerns: string[]) {
  const map: Record<string, string> = {
    sleep: "Sleep protection",
    addiction: "Reduce compulsive use",
    attention: "Focus and routines",
    emotion: "Emotion regulation",
    safety: "Digital safety",
    content_quality: "Content quality",
    gaming: "Healthy gaming",
    overspending: "Spending boundaries",
    social_media: "Social media readiness",
  };

  return concerns.map((c) => map[c] ?? c);
}

export function generatePlan(input: FamilyInput): GeneratedPlan {
  const children = input.children.map((child) => {
    const scored = ACTION_TEMPLATES.map((t) => scoreAction(t, child, input))
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score) as NonNullable<
      ReturnType<typeof scoreAction>
    >[];

    const recommendedActions = scored.slice(0, 8);
    const optionalActions = scored.slice(8, 16);

    return {
      childId: child.id,
      nickname: child.nickname,
      ageBand: child.ageBand,
      priorityAreas: toPriorityAreas(child.concerns),
      recommendedActions,
      optionalActions,
      dailyRhythm: buildDailyRhythm(child),
      familyRules: buildFamilyRules(child),
      parentTips: buildParentTips(child),
    };
  });

  return {
    familyName: input.familyName,
    locale: input.locale,
    overallSummary: [
      "This media plan prioritizes healthy routines, better content, and stronger family communication.",
      "Recommendations are personalized by age, concerns, device context, and family goals.",
    ],
    children,
  };
}
