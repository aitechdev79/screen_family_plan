import { buildDailyRhythm } from "./rhythm";
import { buildFamilyRules } from "./rules";
import { scoreAction } from "./scoring";
import { ACTION_TEMPLATES } from "./templates";
import { buildParentTips } from "./tips";
import { FamilyInput, GeneratedPlan, RecommendedAction } from "./types";
import {
  buildLocalizedOverallSummary,
  localizeCrowdingOutArea,
  localizePriorityArea,
} from "./localization";

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
      priorityAreas: child.concerns.map((concern) => localizePriorityArea(concern, input.locale)),
      crowdingOutAreas: child.crowdingOut.map((item) => localizeCrowdingOutArea(item, input.locale)),
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
    overallSummary: buildLocalizedOverallSummary(input),
    children,
  };
}
