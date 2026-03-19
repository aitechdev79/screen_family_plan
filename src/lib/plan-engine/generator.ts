import { buildDailyRhythm } from "./rhythm";
import { buildFamilyRules } from "./rules";
import { scoreAction } from "./scoring";
import { ACTION_TEMPLATES } from "./templates";
import { buildParentTips } from "./tips";
import { FamilyInput, GeneratedPlan, RecommendedAction } from "./types";

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

  return concerns.map((concern) => map[concern] ?? concern);
}

function toCrowdingOutAreas(items: string[]) {
  const map: Record<string, string> = {
    sleep: "Sleep",
    homework: "Homework and school focus",
    physical_activity: "Physical activity",
    reading: "Reading",
    family_time: "Family time",
    in_person_socializing: "In-person connection",
  };

  return items.map((item) => map[item] ?? item);
}

function pickTopDiverseActions(actions: RecommendedAction[], limit: number) {
  const picked: RecommendedAction[] = [];
  const used = new Set<string>();
  const domainCounts = new Map<string, number>();

  for (const action of actions) {
    const currentCount = domainCounts.get(action.domain) ?? 0;
    if (currentCount >= 2) {
      continue;
    }

    picked.push(action);
    used.add(action.key);
    domainCounts.set(action.domain, currentCount + 1);

    if (picked.length === limit) {
      return { picked, remaining: actions.filter((candidate) => !used.has(candidate.key)) };
    }
  }

  for (const action of actions) {
    if (used.has(action.key)) continue;
    picked.push(action);
    used.add(action.key);

    if (picked.length === limit) {
      break;
    }
  }

  return {
    picked,
    remaining: actions.filter((candidate) => !used.has(candidate.key)),
  };
}

function buildOverallSummary(input: FamilyInput) {
  const summaries: string[] = [];
  const crowdingOut = new Set(input.children.flatMap((child) => child.crowdingOut));
  const goals = new Set(input.familyGoals);

  if (crowdingOut.has("sleep") || goals.has("sleep_better")) {
    summaries.push("This plan prioritizes sleep protection and calmer evening routines.");
  }

  if (
    crowdingOut.has("homework") ||
    crowdingOut.has("physical_activity") ||
    crowdingOut.has("reading")
  ) {
    summaries.push("Recommendations are designed to crowd healthy offline activities back in.");
  }

  if (
    input.children.some(
      (child) =>
        child.hasAutoplayOrEndlessScroll ||
        child.notificationsDisrupt ||
        child.chatsWithUnknownPeople,
    )
  ) {
    summaries.push("The plan addresses design risks like autoplay, notifications, and unsafe contact.");
  }

  if (goals.has("family_connection")) {
    summaries.push("The plan includes shared routines and conversations to strengthen family connection.");
  }

  if (summaries.length < 2) {
    summaries.push("Recommendations are personalized by age, concerns, device context, and family goals.");
  }

  return summaries.slice(0, 3);
}

export function generatePlan(input: FamilyInput): GeneratedPlan {
  const children = input.children.map((child) => {
    const scored = ACTION_TEMPLATES.map((template) => scoreAction(template, child, input))
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score) as NonNullable<
      ReturnType<typeof scoreAction>
    >[];

    const recommendedSelection = pickTopDiverseActions(scored, 8);
    const optionalSelection = pickTopDiverseActions(recommendedSelection.remaining, 8);

    return {
      childId: child.id,
      nickname: child.nickname,
      ageBand: child.ageBand,
      priorityAreas: toPriorityAreas(child.concerns),
      crowdingOutAreas: toCrowdingOutAreas(child.crowdingOut),
      recommendedActions: recommendedSelection.picked,
      optionalActions: optionalSelection.picked,
      dailyRhythm: buildDailyRhythm(child, input.locale),
      familyRules: buildFamilyRules(child, input.locale),
      parentTips: buildParentTips(child, input.locale),
    };
  });

  return {
    familyName: input.familyName,
    locale: input.locale,
    overallSummary: buildOverallSummary(input),
    children,
  };
}
