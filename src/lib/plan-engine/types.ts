export type AgeBand = "0-5" | "6-12" | "13-18";

export type Concern =
  | "sleep"
  | "addiction"
  | "attention"
  | "emotion"
  | "safety"
  | "content_quality"
  | "overspending"
  | "gaming"
  | "social_media";

export type DeviceType =
  | "tv"
  | "tablet"
  | "phone"
  | "gaming_console"
  | "laptop";

export type UsageType =
  | "educational"
  | "entertainment"
  | "short_video"
  | "gaming"
  | "social_media"
  | "mixed";

export type Domain =
  | "media_balance"
  | "communication"
  | "kindness"
  | "safety"
  | "screen_zone"
  | "screen_time"
  | "content"
  | "co_use";

export type FamilyGoal =
  | "sleep_better"
  | "reduce_screen_time"
  | "improve_focus"
  | "increase_offline_play"
  | "safer_media_use"
  | "better_content"
  | "family_connection";

export interface ChildInput {
  id: string;
  nickname: string;
  ageBand: AgeBand;
  devices: DeviceType[];
  screenHoursWeekday: number;
  screenHoursWeekend: number;
  mainUsage: UsageType[];
  concerns: Concern[];
  hasDeviceInBedroom: boolean;
  usesScreenForCalming: boolean;
  hasPersonalDevice: boolean;
}

export interface FamilyInput {
  familyName: string;
  locale: "vi" | "en";
  children: ChildInput[];
  familyGoals: FamilyGoal[];
}

export interface ActionTemplate {
  key: string;
  domain: Domain;
  title: string;
  description: string;
  ageBands: AgeBand[];
  concerns?: Concern[];
  usageTypes?: UsageType[];
  triggers?: Array<
    | "device_in_bedroom"
    | "uses_screen_for_calming"
    | "has_personal_device"
    | "high_weekday_screen"
    | "high_weekend_screen"
  >;
  goals?: FamilyGoal[];
  weight: number;
  isCore?: boolean;
  tags?: string[];
}

export interface RecommendedAction {
  key: string;
  domain: Domain;
  title: string;
  description: string;
  score: number;
  reasons: string[];
}

export interface ChildPlan {
  childId: string;
  nickname: string;
  ageBand: AgeBand;
  priorityAreas: string[];
  recommendedActions: RecommendedAction[];
  optionalActions: RecommendedAction[];
  dailyRhythm: Array<{
    label: string;
    recommendation: string;
  }>;
  familyRules: string[];
  parentTips: string[];
}

export interface GeneratedPlan {
  familyName: string;
  locale: "vi" | "en";
  overallSummary: string[];
  children: ChildPlan[];
}
