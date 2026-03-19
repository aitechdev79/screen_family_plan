import {
  ActionTemplate,
  ChildInput,
  Concern,
  FamilyInput,
  RecommendedAction,
  UsageType,
} from "./types";

function hasConcern(child: ChildInput, concern?: Concern[]) {
  if (!concern?.length) return false;
  return concern.some((c) => child.concerns.includes(c));
}

function hasUsageType(child: ChildInput, usageTypes?: UsageType[]) {
  if (!usageTypes?.length) return false;
  return usageTypes.some((u) => child.mainUsage.includes(u));
}

function hasTrigger(child: ChildInput, triggers?: ActionTemplate["triggers"]) {
  if (!triggers?.length) return false;

  return triggers.some((trigger) => {
    switch (trigger) {
      case "device_in_bedroom":
        return child.hasDeviceInBedroom;
      case "uses_screen_for_calming":
        return child.usesScreenForCalming;
      case "has_personal_device":
        return child.hasPersonalDevice;
      case "high_weekday_screen":
        return child.screenHoursWeekday >= 2;
      case "high_weekend_screen":
        return child.screenHoursWeekend >= 3;
      default:
        return false;
    }
  });
}

function matchesGoals(
  family: FamilyInput,
  goals?: ActionTemplate["goals"]
): boolean {
  if (!goals?.length) return false;
  return goals.some((g) => family.familyGoals.includes(g));
}

export function scoreAction(
  template: ActionTemplate,
  child: ChildInput,
  family: FamilyInput
): RecommendedAction | null {
  if (!template.ageBands.includes(child.ageBand)) return null;

  let score = template.weight;
  const reasons: string[] = [];

  if (template.isCore) {
    score += 3;
    reasons.push("Core recommendation for this age group");
  }

  if (hasConcern(child, template.concerns)) {
    score += 4;
    reasons.push("Matches current concern(s)");
  }

  if (hasUsageType(child, template.usageTypes)) {
    score += 3;
    reasons.push("Fits current media use pattern");
  }

  if (hasTrigger(child, template.triggers)) {
    score += 5;
    reasons.push("Triggered by current family/device context");
  }

  if (matchesGoals(family, template.goals)) {
    score += 3;
    reasons.push("Supports stated family goals");
  }

  if (child.concerns.includes("sleep")) {
    if (
      template.domain === "screen_time" ||
      template.key === "bedroom_screen_free_at_night"
    ) {
      score += 2;
    }
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    if (
      template.key === "be_intentional_about_media_use" ||
      template.key === "discuss_rabbit_holes_and_bad_content" ||
      template.key === "recognize_ads_and_motives"
    ) {
      score += 2;
    }
  }

  if (child.ageBand === "0-5") {
    if (
      template.key === "co_view_to_connect_and_learn" ||
      template.key === "limit_young_child_media_for_development"
    ) {
      score += 3;
    }
  }

  return {
    key: template.key,
    domain: template.domain,
    title: template.title,
    description: template.description,
    score,
    reasons,
  };
}
