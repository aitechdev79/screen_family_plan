"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generatePlanPreviewAction } from "@/app/actions/plan-actions";
import type { FamilyInput, GeneratedPlan } from "@/lib/plan-engine/types";
import { getUIText } from "@/lib/i18n/ui-text";

const STORAGE_KEY = "media-plan-questionnaire";
const RESULT_KEY = "media-plan-result";

const EMPTY_CHILD = () => ({
  id: crypto.randomUUID(),
  nickname: "",
  ageBand: "6-12" as const,
  devices: ["tablet"] as FamilyInput["children"][number]["devices"],
  screenHoursWeekday: 2,
  screenHoursWeekend: 3,
  mainUsage: ["mixed"] as FamilyInput["children"][number]["mainUsage"],
  concerns: [] as FamilyInput["children"][number]["concerns"],
  crowdingOut: [] as FamilyInput["children"][number]["crowdingOut"],
  hasDeviceInBedroom: false,
  usesScreenForCalming: false,
  hasPersonalDevice: false,
  hasAutoplayOrEndlessScroll: false,
  notificationsDisrupt: false,
  chatsWithUnknownPeople: false,
  coEngagementLevel: "sometimes" as const,
});

const DEFAULT_VALUES: FamilyInput = {
  familyName: "",
  locale: "vi",
  familyGoals: ["sleep_better", "better_content"],
  children: [EMPTY_CHILD()],
};

type WizardProps = {
  locale?: "vi" | "en";
  initialInput?: FamilyInput;
  existingPlanId?: string;
};

function normalizeFamilyInput(input: FamilyInput): FamilyInput {
  return {
    ...input,
    children: input.children.map((child) => ({
      ...EMPTY_CHILD(),
      ...child,
      crowdingOut: child.crowdingOut ?? [],
      hasAutoplayOrEndlessScroll: child.hasAutoplayOrEndlessScroll ?? false,
      notificationsDisrupt: child.notificationsDisrupt ?? false,
      chatsWithUnknownPeople: child.chatsWithUnknownPeople ?? false,
      coEngagementLevel: child.coEngagementLevel ?? "sometimes",
    })),
  };
}

function toggle<T extends string>(list: T[], item: T) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

export function QuestionnaireWizard({ locale = "vi", initialInput, existingPlanId }: WizardProps) {
  const text = getUIText(locale).questionnaire;
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FamilyInput>(
    initialInput ? normalizeFamilyInput(initialInput) : { ...DEFAULT_VALUES, locale },
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialInput) return;
    const cached = window.localStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        setForm(normalizeFamilyInput(JSON.parse(cached)));
      } catch {}
    }
  }, [initialInput]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
  }, [form]);

  function updateChild(index: number, patch: Partial<FamilyInput["children"][number]>) {
    setForm((current) => ({
      ...current,
      children: current.children.map((child, childIndex) =>
        childIndex === index ? { ...child, ...patch } : child,
      ),
    }));
  }

  async function submit() {
    try {
      setSubmitting(true);
      setError(null);

      const result = await generatePlanPreviewAction(form);
      if (!result.ok) {
        throw new Error(result.error);
      }

      const generated = result.data as GeneratedPlan;
      window.sessionStorage.setItem(RESULT_KEY, JSON.stringify({ input: form, generated }));

      if (existingPlanId) {
        router.push(`/${locale}/dashboard/plans/${existingPlanId}/edit?preview=1`);
      } else {
        router.push(`/${locale}/plan/result`);
      }
    } catch {
      setError(text.generateError);
    } finally {
      setSubmitting(false);
    }
  }

  const goalOptions = Object.entries(text.goals).map(([value, label]) => ({ value, label }));
  const deviceOptions = Object.entries(text.devicesOptions).map(([value, label]) => ({ value, label }));
  const usageOptions = Object.entries(text.usageOptions).map(([value, label]) => ({ value, label }));
  const concernOptions = Object.entries(text.concernOptions).map(([value, label]) => ({ value, label }));
  const crowdingOutOptions = Object.entries(text.crowdingOutOptions).map(([value, label]) => ({ value, label }));
  const coEngagementOptions = Object.entries(text.coEngagementOptions).map(([value, label]) => ({ value, label }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {text.steps.map((label, index) => (
          <div
            key={label}
            className={`rounded-full px-4 py-2 text-sm ${index === step ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}
          >
            {index + 1}. {label}
          </div>
        ))}
      </div>

      {step === 0 ? (
        <section className="space-y-4 rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">{text.familyInfo}</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">{text.familyName}</label>
            <input
              className="w-full rounded-xl border px-3 py-2"
              value={form.familyName}
              onChange={(e) => setForm({ ...form, familyName: e.target.value })}
            />
          </div>
        </section>
      ) : null}

      {step === 1 ? (
        <section className="space-y-4 rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">{text.goalsTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {goalOptions.map((goal) => (
              <label key={goal.value} className="flex items-center gap-3 rounded-xl border p-3">
                <input
                  type="checkbox"
                  checked={form.familyGoals.includes(goal.value as any)}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      familyGoals: toggle(current.familyGoals, goal.value as any),
                    }))
                  }
                />
                <span>{goal.label}</span>
              </label>
            ))}
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="space-y-6 rounded-2xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{text.childInfoTitle}</h2>
            <button
              type="button"
              className="rounded-xl border px-3 py-2"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  children: [...current.children, EMPTY_CHILD()],
                }))
              }
            >
              {text.addChild}
            </button>
          </div>

          {form.children.map((child, index) => (
            <div key={child.id} className="space-y-4 rounded-2xl bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  {text.childLabel} #{index + 1}
                </h3>
                {form.children.length > 1 ? (
                  <button
                    type="button"
                    className="text-sm text-red-600"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        children: current.children.filter((_, childIndex) => childIndex !== index),
                      }))
                    }
                  >
                    {text.delete}
                  </button>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">{text.nickname}</label>
                  <input
                    className="w-full rounded-xl border px-3 py-2"
                    value={child.nickname}
                    onChange={(e) => updateChild(index, { nickname: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">{text.ageBand}</label>
                  <select
                    className="w-full rounded-xl border px-3 py-2"
                    value={child.ageBand}
                    onChange={(e) => updateChild(index, { ageBand: e.target.value as any })}
                  >
                    <option value="0-5">0-5</option>
                    <option value="6-12">6-12</option>
                    <option value="13-18">13-18</option>
                  </select>
                </div>
              </div>

              <CheckboxGrid
                label={text.devices}
                items={deviceOptions}
                values={child.devices}
                onToggle={(value) =>
                  updateChild(index, {
                    devices: toggle(child.devices as string[], value as string) as any,
                  })
                }
              />

              <CheckboxGrid
                label={text.usage}
                items={usageOptions}
                values={child.mainUsage}
                onToggle={(value) =>
                  updateChild(index, {
                    mainUsage: toggle(child.mainUsage as string[], value as string) as any,
                  })
                }
              />

              <CheckboxGrid
                label={text.concerns}
                items={concernOptions}
                values={child.concerns}
                onToggle={(value) =>
                  updateChild(index, {
                    concerns: toggle(child.concerns as string[], value as string) as any,
                  })
                }
              />

              <CheckboxGrid
                label={text.crowdingOut}
                items={crowdingOutOptions}
                values={child.crowdingOut}
                onToggle={(value) =>
                  updateChild(index, {
                    crowdingOut: toggle(child.crowdingOut as string[], value as string) as any,
                  })
                }
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberField
                  label={text.weekdayHours}
                  value={child.screenHoursWeekday}
                  onChange={(value) => updateChild(index, { screenHoursWeekday: value })}
                />
                <NumberField
                  label={text.weekendHours}
                  value={child.screenHoursWeekend}
                  onChange={(value) => updateChild(index, { screenHoursWeekend: value })}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">{text.coEngagementLevel}</label>
                <select
                  className="w-full rounded-xl border px-3 py-2"
                  value={child.coEngagementLevel}
                  onChange={(e) => updateChild(index, { coEngagementLevel: e.target.value as any })}
                >
                  {coEngagementOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <ToggleField
                  label={text.bedroomDevice}
                  checked={child.hasDeviceInBedroom}
                  onChange={(checked) => updateChild(index, { hasDeviceInBedroom: checked })}
                />
                <ToggleField
                  label={text.calming}
                  checked={child.usesScreenForCalming}
                  onChange={(checked) => updateChild(index, { usesScreenForCalming: checked })}
                />
                <ToggleField
                  label={text.personalDevice}
                  checked={child.hasPersonalDevice}
                  onChange={(checked) => updateChild(index, { hasPersonalDevice: checked })}
                />
                <ToggleField
                  label={text.autoplay}
                  checked={child.hasAutoplayOrEndlessScroll}
                  onChange={(checked) => updateChild(index, { hasAutoplayOrEndlessScroll: checked })}
                />
                <ToggleField
                  label={text.notificationsDisrupt}
                  checked={child.notificationsDisrupt}
                  onChange={(checked) => updateChild(index, { notificationsDisrupt: checked })}
                />
                <ToggleField
                  label={text.strangerContact}
                  checked={child.chatsWithUnknownPeople}
                  onChange={(checked) => updateChild(index, { chatsWithUnknownPeople: checked })}
                />
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {step === 3 ? (
        <section className="space-y-4 rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">{text.review}</h2>
          <p className="text-sm text-neutral-600">
            {text.reviewFamily}: {form.familyName || text.notEntered}
          </p>
          <p className="text-sm text-neutral-600">
            {text.reviewChildren}: {form.children.length}
          </p>
          <ul className="list-disc pl-5 text-sm text-neutral-700">
            {form.children.map((child) => (
              <li key={child.id}>
                {child.nickname || text.unnamed} · {child.ageBand} · {child.mainUsage.join(", ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))}
          disabled={step === 0}
          className="rounded-xl border px-4 py-2 disabled:opacity-40"
        >
          {text.back}
        </button>
        {step < text.steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((currentStep) => Math.min(text.steps.length - 1, currentStep + 1))}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-white"
          >
            {text.continue}
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
          >
            {submitting ? text.creating : existingPlanId ? text.updatePreview : text.create}
          </button>
        )}
      </div>
    </div>
  );
}

function CheckboxGrid({
  label,
  items,
  values,
  onToggle,
}: {
  label: string;
  items: { value: string; label: string }[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <label key={item.value} className="flex items-center gap-2 rounded-xl border bg-white p-3 text-sm">
            <input type="checkbox" checked={values.includes(item.value)} onChange={() => onToggle(item.value)} />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        className="w-full rounded-xl border px-3 py-2"
        type="number"
        min={0}
        max={24}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
