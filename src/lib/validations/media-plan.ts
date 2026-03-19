import { z } from "zod";

export const childInputSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().min(1).max(50),
  ageBand: z.enum(["0-5", "6-12", "13-18"]),
  devices: z.array(z.enum(["tv", "tablet", "phone", "gaming_console", "laptop"]))
    .min(1),
  screenHoursWeekday: z.number().min(0).max(24),
  screenHoursWeekend: z.number().min(0).max(24),
  mainUsage: z.array(
    z.enum(["educational", "entertainment", "short_video", "gaming", "social_media", "mixed"])
  ).min(1),
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
    ])
  ),
  hasDeviceInBedroom: z.boolean(),
  usesScreenForCalming: z.boolean(),
  hasPersonalDevice: z.boolean(),
});

export const familyInputSchema = z.object({
  familyName: z.string().min(1).max(100),
  locale: z.enum(["vi", "en"]),
  familyGoals: z.array(
    z.enum([
      "sleep_better",
      "reduce_screen_time",
      "improve_focus",
      "increase_offline_play",
      "safer_media_use",
      "better_content",
      "family_connection",
    ])
  ).min(1),
  children: z.array(childInputSchema).min(1),
});

export type FamilyInputForm = z.infer<typeof familyInputSchema>;
