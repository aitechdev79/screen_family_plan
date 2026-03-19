import { ResultClient } from "@/components/plan/result-client";
import { generatePlan } from "@/lib/plan-engine/generator";
import { FamilyInput } from "@/lib/plan-engine/types";

const demoInput: FamilyInput = {
  familyName: "Nguyen",
  locale: "vi",
  familyGoals: [
    "sleep_better",
    "reduce_screen_time",
    "better_content",
    "family_connection",
  ],
  children: [
    {
      id: "c1",
      nickname: "Kin",
      ageBand: "6-12",
      devices: ["tablet", "tv"],
      screenHoursWeekday: 2.5,
      screenHoursWeekend: 4,
      mainUsage: ["short_video", "gaming", "mixed"],
      concerns: ["sleep", "addiction", "attention", "gaming", "content_quality"],
      hasDeviceInBedroom: true,
      usesScreenForCalming: true,
      hasPersonalDevice: true,
    },
    {
      id: "c2",
      nickname: "Ninh",
      ageBand: "13-18",
      devices: ["phone", "laptop"],
      screenHoursWeekday: 4,
      screenHoursWeekend: 6,
      mainUsage: ["social_media", "short_video", "mixed"],
      concerns: ["sleep", "social_media", "safety", "emotion"],
      hasDeviceInBedroom: true,
      usesScreenForCalming: false,
      hasPersonalDevice: true,
    },
  ],
};

export default function ResultPage() {
  const plan = generatePlan(demoInput);
  return <ResultClient fallbackPlan={plan} />;
}
