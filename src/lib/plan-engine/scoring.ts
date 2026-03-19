import {
  ActionTemplate,
  ChildInput,
  Concern,
  CrowdingOutArea,
  FamilyInput,
  RecommendedAction,
  UsageType,
} from "./types";
import { localizeAction, localizeReason } from "./localization";

function hasConcern(child: ChildInput, concerns?: Concern[]) {
  if (!concerns?.length) return false;
  return concerns.some((concern) => child.concerns.includes(concern));
}

function hasUsageType(child: ChildInput, usageTypes?: UsageType[]) {
  if (!usageTypes?.length) return false;
  return usageTypes.some((usageType) => child.mainUsage.includes(usageType));
}

function hasCrowdingOut(child: ChildInput, crowdingOut: CrowdingOutArea[]) {
  return crowdingOut.some((item) => child.crowdingOut.includes(item));
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
      case "autoplay_or_endless_scroll":
        return child.hasAutoplayOrEndlessScroll;
      case "notifications_disrupt":
        return child.notificationsDisrupt;
      case "stranger_contact":
        return child.chatsWithUnknownPeople;
      case "low_co_engagement":
        return child.coEngagementLevel === "rarely";
      default:
        return false;
    }
  });
}

function matchesGoals(family: FamilyInput, goals?: ActionTemplate["goals"]) {
  if (!goals?.length) return false;
  return goals.some((goal) => family.familyGoals.includes(goal));
}

function pushReason(reasons: string[], reason: string) {
  if (!reasons.includes(reason)) {
    reasons.push(reason);
  }
}

function applyCrowdingOutHeuristics(
  template: ActionTemplate,
  child: ChildInput,
  reasons: string[],
) {
  let score = 0;

  if (hasCrowdingOut(child, ["sleep"])) {
    if (
      template.domain === "screen_time" ||
      template.key === "bedroom_screen_free_at_night"
    ) {
      score += 3;
      pushReason(reasons, "Protects an activity currently being crowded out");
    }
  }

  if (hasCrowdingOut(child, ["homework"])) {
    if (
      template.key === "homework_and_screens_plan" ||
      template.key === "use_focus_modes_for_school_and_sleep" ||
      template.key === "one_screen_at_a_time"
    ) {
      score += 3;
      pushReason(reasons, "Helps protect schoolwork and attention");
    }
  }

  if (hasCrowdingOut(child, ["physical_activity", "reading"])) {
    if (
      template.key === "plan_screen_free_activity_daily" ||
      template.key === "screen_free_day_each_week" ||
      template.key === "prevent_screen_from_interrupting_activity_eating"
    ) {
      score += 2;
      pushReason(reasons, "Makes room for offline development");
    }
  }

  if (hasCrowdingOut(child, ["family_time", "in_person_socializing"])) {
    if (
      template.domain === "co_use" ||
      template.key === "screen_free_meals" ||
      template.key === "talk_about_media_regularly"
    ) {
      score += 2;
      pushReason(reasons, "Supports connection that media is crowding out");
    }
  }

  return score;
}

function applyUsageAndDesignHeuristics(
  template: ActionTemplate,
  child: ChildInput,
  reasons: string[],
) {
  let score = 0;

  if (child.concerns.includes("sleep")) {
    if (
      template.domain === "screen_time" ||
      template.key === "bedroom_screen_free_at_night"
    ) {
      score += 2;
      pushReason(reasons, "Strong fit for current sleep concerns");
    }
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    if (
      template.key === "be_intentional_about_media_use" ||
      template.key === "discuss_rabbit_holes_and_bad_content" ||
      template.key === "recognize_ads_and_motives" ||
      template.key === "turn_off_autoplay_and_endless_feeds" ||
      template.key === "review_reporting_blocking_and_feed_reset" ||
      template.key === "check_sources_and_fact_patterns" ||
      template.key === "choose_higher_quality_lower_commercial_content"
    ) {
      score += 2;
      pushReason(reasons, "Addresses algorithmic or feed-driven risk");
    }
  }

  if (child.notificationsDisrupt) {
    if (
      template.key === "use_focus_modes_for_school_and_sleep" ||
      template.key === "avoid_screens_before_school" ||
      template.key === "prevent_media_interfering_sleep"
    ) {
      score += 2;
      pushReason(reasons, "Responds to notification-driven disruption");
    }
  }

  if (child.chatsWithUnknownPeople) {
    if (
      template.key === "rules_for_online_chat_contacts" ||
      template.key === "use_parental_controls_and_account_guardrails" ||
      template.key === "review_reporting_blocking_and_feed_reset"
    ) {
      score += 3;
      pushReason(reasons, "Responds to online contact or exploitation risk");
    }
  }

  if (child.ageBand === "0-5") {
    if (
      template.key === "co_view_to_connect_and_learn" ||
      template.key === "limit_young_child_media_for_development" ||
      template.key === "prefer_shared_devices_for_younger_children"
    ) {
      score += 3;
      pushReason(reasons, "Supports young-child development");
    }
  }

  if (
    (child.ageBand === "0-5" || child.ageBand === "6-12") &&
    child.coEngagementLevel === "rarely"
  ) {
    if (
      template.domain === "co_use" ||
      template.key === "talk_about_media_regularly"
    ) {
      score += 2;
      pushReason(reasons, "Improves caregiver guidance and co-engagement");
    }
  }

  return score;
}

export function scoreAction(
  template: ActionTemplate,
  child: ChildInput,
  family: FamilyInput,
): RecommendedAction | null {
  if (!template.ageBands.includes(child.ageBand)) return null;

  let score = template.weight;
  const reasons: string[] = [];

  if (template.isCore) {
    score += 3;
    pushReason(reasons, "Core recommendation for this age group");
  }

  if (hasConcern(child, template.concerns)) {
    score += 4;
    pushReason(reasons, "Matches current concern(s)");
  }

  if (hasUsageType(child, template.usageTypes)) {
    score += 3;
    pushReason(reasons, "Fits current media use pattern");
  }

  if (hasTrigger(child, template.triggers)) {
    score += 5;
    pushReason(reasons, "Triggered by current family/device context");
  }

  if (matchesGoals(family, template.goals)) {
    score += 3;
    pushReason(reasons, "Supports stated family goals");
  }

  score += applyCrowdingOutHeuristics(template, child, reasons);
  score += applyUsageAndDesignHeuristics(template, child, reasons);

  return {
    key: template.key,
    domain: template.domain,
    title: localizeAction(template, family.locale).title,
    description: localizeAction(template, family.locale).description,
    score,
    reasons: reasons.map((reason) => localizeReason(reason, family.locale)),
  };
}
