"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FamilyInput } from "@/lib/plan-engine/types";

const FAMILY_GOAL_OPTIONS: Array<{
  value: FamilyInput["familyGoals"][number];
  label: string;
}> = [
  { value: "sleep_better", label: "Help children sleep better" },
  { value: "reduce_screen_time", label: "Reduce total screen time" },
  { value: "improve_focus", label: "Improve focus and routines" },
  { value: "increase_offline_play", label: "Increase offline play" },
  { value: "safer_media_use", label: "Make media use safer" },
  { value: "better_content", label: "Improve content quality" },
  { value: "family_connection", label: "Create stronger family connection" },
];

const AGE_BAND_OPTIONS: Array<{ value: FamilyInput["children"][number]["ageBand"]; label: string }> = [
  { value: "0-5", label: "0-5" },
  { value: "6-12", label: "6-12" },
  { value: "13-18", label: "13-18" },
];

const DEVICE_OPTIONS: Array<{ value: FamilyInput["children"][number]["devices"][number]; label: string }> = [
  { value: "tv", label: "TV" },
  { value: "tablet", label: "Tablet" },
  { value: "phone", label: "Phone" },
  { value: "gaming_console", label: "Gaming console" },
  { value: "laptop", label: "Laptop" },
];

const USAGE_OPTIONS: Array<{ value: FamilyInput["children"][number]["mainUsage"][number]; label: string }> = [
  { value: "educational", label: "Educational" },
  { value: "entertainment", label: "Entertainment" },
  { value: "short_video", label: "Short video" },
  { value: "gaming", label: "Gaming" },
  { value: "social_media", label: "Social media" },
  { value: "mixed", label: "Mixed use" },
];

const CONCERN_OPTIONS: Array<{ value: FamilyInput["children"][number]["concerns"][number]; label: string }> = [
  { value: "sleep", label: "Sleep" },
  { value: "addiction", label: "Compulsive use" },
  { value: "attention", label: "Attention/focus" },
  { value: "emotion", label: "Emotional regulation" },
  { value: "safety", label: "Digital safety" },
  { value: "content_quality", label: "Content quality" },
  { value: "overspending", label: "Overspending" },
  { value: "gaming", label: "Gaming habits" },
  { value: "social_media", label: "Social media readiness" },
];

type ChildFormState = FamilyInput["children"][number];

const createChild = (index: number): ChildFormState => ({
  id: `child-${index + 1}`,
  nickname: "",
  ageBand: "6-12",
  devices: ["tablet"],
  screenHoursWeekday: 2,
  screenHoursWeekend: 3,
  mainUsage: ["mixed"],
  concerns: [],
  hasDeviceInBedroom: false,
  usesScreenForCalming: false,
  hasPersonalDevice: false,
});

const STORAGE_KEY = "media-plan-result";

function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function NewPlanForm() {
  const router = useRouter();
  const [form, setForm] = useState<FamilyInput>({
    familyName: "",
    locale: "en",
    familyGoals: ["reduce_screen_time"],
    children: [createChild(0)],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateChild = (index: number, nextChild: ChildFormState) => {
    setForm((current) => ({
      ...current,
      children: current.children.map((child, childIndex) =>
        childIndex === index ? nextChild : child
      ),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/plan/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to generate plan.");
      }

      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      router.push(`/${form.locale}/plan/result`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to generate plan."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <section className="grid gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-900">Family name</span>
          <input
            required
            value={form.familyName}
            onChange={(event) =>
              setForm((current) => ({ ...current, familyName: event.target.value }))
            }
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
            placeholder="Nguyen"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-900">Language</span>
          <select
            value={form.locale}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                locale: event.target.value as FamilyInput["locale"],
              }))
            }
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
          >
            <option value="en">English</option>
            <option value="vi">Vietnamese</option>
          </select>
        </label>
      </section>

      <section className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Family goals</h2>
          <p className="text-sm text-neutral-600">
            Choose the outcomes you want the plan to optimize for.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {FAMILY_GOAL_OPTIONS.map((goal) => (
            <label
              key={goal.value}
              className="flex items-start gap-3 rounded-2xl border border-neutral-200 p-4"
            >
              <input
                type="checkbox"
                checked={form.familyGoals.includes(goal.value)}
                onChange={() =>
                  setForm((current) => {
                    const nextGoals = toggleValue(current.familyGoals, goal.value);
                    return {
                      ...current,
                      familyGoals: nextGoals.length > 0 ? nextGoals : current.familyGoals,
                    };
                  })
                }
                className="mt-1"
              />
              <span className="text-sm text-neutral-800">{goal.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Children</h2>
            <p className="text-sm text-neutral-600">
              Add one or more child profiles to personalize the plan.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setForm((current) => ({
                ...current,
                children: [...current.children, createChild(current.children.length)],
              }))
            }
            className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-900"
          >
            Add child
          </button>
        </div>

        {form.children.map((child, index) => (
          <section
            key={child.id}
            className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Child {index + 1}</h3>
              {form.children.length > 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      children: current.children.filter((_, childIndex) => childIndex !== index),
                    }))
                  }
                  className="text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
                >
                  Remove
                </button>
              ) : null}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-neutral-900">Nickname</span>
                <input
                  required
                  value={child.nickname}
                  onChange={(event) =>
                    updateChild(index, { ...child, nickname: event.target.value })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
                  placeholder="Kin"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-neutral-900">Age band</span>
                <select
                  value={child.ageBand}
                  onChange={(event) =>
                    updateChild(index, {
                      ...child,
                      ageBand: event.target.value as ChildFormState["ageBand"],
                    })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
                >
                  {AGE_BAND_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-neutral-900">Weekday screen hours</span>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={child.screenHoursWeekday}
                  onChange={(event) =>
                    updateChild(index, {
                      ...child,
                      screenHoursWeekday: Number(event.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-neutral-900">Weekend screen hours</span>
                <input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={child.screenHoursWeekend}
                  onChange={(event) =>
                    updateChild(index, {
                      ...child,
                      screenHoursWeekend: Number(event.target.value),
                    })
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-neutral-900"
                />
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <fieldset className="space-y-3 lg:col-span-1">
                <legend className="text-sm font-medium text-neutral-900">Devices</legend>
                <div className="space-y-3">
                  {DEVICE_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 text-sm text-neutral-800">
                      <input
                        type="checkbox"
                        checked={child.devices.includes(option.value)}
                        onChange={() => {
                          const nextDevices = toggleValue(child.devices, option.value);
                          updateChild(index, {
                            ...child,
                            devices: nextDevices.length > 0 ? nextDevices : child.devices,
                          });
                        }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3 lg:col-span-1">
                <legend className="text-sm font-medium text-neutral-900">Main usage</legend>
                <div className="space-y-3">
                  {USAGE_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 text-sm text-neutral-800">
                      <input
                        type="checkbox"
                        checked={child.mainUsage.includes(option.value)}
                        onChange={() => {
                          const nextUsage = toggleValue(child.mainUsage, option.value);
                          updateChild(index, {
                            ...child,
                            mainUsage: nextUsage.length > 0 ? nextUsage : child.mainUsage,
                          });
                        }}
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3 lg:col-span-1">
                <legend className="text-sm font-medium text-neutral-900">Concerns</legend>
                <div className="space-y-3">
                  {CONCERN_OPTIONS.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 text-sm text-neutral-800">
                      <input
                        type="checkbox"
                        checked={child.concerns.includes(option.value)}
                        onChange={() =>
                          updateChild(index, {
                            ...child,
                            concerns: toggleValue(child.concerns, option.value),
                          })
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-800">
                <input
                  type="checkbox"
                  checked={child.hasDeviceInBedroom}
                  onChange={(event) =>
                    updateChild(index, {
                      ...child,
                      hasDeviceInBedroom: event.target.checked,
                    })
                  }
                />
                <span>Has device in bedroom</span>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-800">
                <input
                  type="checkbox"
                  checked={child.usesScreenForCalming}
                  onChange={(event) =>
                    updateChild(index, {
                      ...child,
                      usesScreenForCalming: event.target.checked,
                    })
                  }
                />
                <span>Uses screens for calming</span>
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 text-sm text-neutral-800">
                <input
                  type="checkbox"
                  checked={child.hasPersonalDevice}
                  onChange={(event) =>
                    updateChild(index, {
                      ...child,
                      hasPersonalDevice: event.target.checked,
                    })
                  }
                />
                <span>Has personal device</span>
              </label>
            </div>
          </section>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Generate plan</h2>
          <p className="text-sm text-neutral-300">
            The questionnaire submits directly to the rule-based plan generator.
          </p>
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-white px-5 py-3 font-medium text-neutral-900 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Generating..." : "Create family media plan"}
        </button>
      </section>
    </form>
  );
}
