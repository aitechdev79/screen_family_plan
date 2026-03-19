import { z } from "zod";

export const childInputSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().min(1).max(50),
  ageBand: z.enum(["0-5", "6-12", "13-18"]),
  devices: z
    .array(z.enum(["tv", "tablet", "phone", "gaming_console", "laptop"]))
    .min(1),
  screenHoursWeekday: z.coerce.number().min(0).max(24),
  screenHoursWeekend: z.coerce.number().min(0).max(24),
  mainUsage: z
    .array(
      z.enum(["educational", "entertainment", "short_video", "gaming", "social_media", "mixed"]),
    )
    .min(1),
  concerns: z.array(
    z.enum([
      "sleep",
      "addiction",
      "attention",
      "emotion",
      "safety",
      "content_quality",
      "overspending",
      "gaming",
      "social_media",
    ]),
  ),
  crowdingOut: z.array(
    z.enum([
      "sleep",
      "homework",
      "physical_activity",
      "reading",
      "family_time",
      "in_person_socializing",
    ]),
  ),
  hasDeviceInBedroom: z.boolean(),
  usesScreenForCalming: z.boolean(),
  hasPersonalDevice: z.boolean(),
  hasAutoplayOrEndlessScroll: z.boolean(),
  notificationsDisrupt: z.boolean(),
  chatsWithUnknownPeople: z.boolean(),
  coEngagementLevel: z.enum(["rarely", "sometimes", "often"]),
});

export const familyInputSchema = z.object({
  familyName: z.string().min(1).max(100),
  locale: z.enum(["vi", "en"]),
  familyGoals: z
    .array(
      z.enum([
        "sleep_better",
        "reduce_screen_time",
        "improve_focus",
        "increase_offline_play",
        "safer_media_use",
        "better_content",
        "family_connection",
      ]),
    )
    .min(1),
  children: z.array(childInputSchema).min(1),
});

export const mediaPlanSaveSchema = z.object({
  familyName: z.string().min(1).max(100),
  locale: z.enum(["vi", "en"]),
  answersJson: familyInputSchema,
  generatedPlanJson: z.record(z.any()),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export type FamilyInputForm = z.infer<typeof familyInputSchema>;
export type MediaPlanSaveInput = z.infer<typeof mediaPlanSaveSchema>;
