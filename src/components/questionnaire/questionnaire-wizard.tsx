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

const STEP_INTROS = [
  {
    eyebrow: "Household profile",
    title: "Start with the family context",
    description: "Name the household so the generated plan feels grounded and easier to revisit later.",
  },
  {
    eyebrow: "Desired outcomes",
    title: "Choose what matters most right now",
    description: "Focus on the few outcomes that would make day-to-day media use feel calmer and more manageable.",
  },
  {
    eyebrow: "Child routines",
    title: "Capture habits child by child",
    description: "The plan becomes much more useful when device patterns and pressure points are separated by child.",
  },
  {
    eyebrow: "Final review",
    title: "Check the summary before generation",
    description: "Confirm the essentials, then generate a structured preview that can be saved, edited, and printed.",
  },
] as const;

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

function getStepCompletion(step: number, form: FamilyInput) {
  switch (step) {
    case 0:
      return form.familyName.trim().length > 0;
    case 1:
      return form.familyGoals.length > 0;
    case 2:
      return form.children.every((child) => child.nickname.trim().length > 0);
    case 3:
      return form.children.length > 0;
    default:
      return false;
  }
}

function countSelectedFlags(child: FamilyInput["children"][number]) {
  return [
    child.hasDeviceInBedroom,
    child.usesScreenForCalming,
    child.hasPersonalDevice,
    child.hasAutoplayOrEndlessScroll,
    child.notificationsDisrupt,
    child.chatsWithUnknownPeople,
  ].filter(Boolean).length;
}

function fieldBaseClass() {
  return "w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-[15px] text-[var(--ink-strong)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45)] outline-none transition placeholder:text-[var(--ink-soft)]/70 focus:border-[rgba(31,110,106,0.34)] focus:ring-4 focus:ring-[rgba(108,198,184,0.16)]";
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
  const activeStepIntro = STEP_INTROS[step];
  const completionCount = text.steps.filter((_, index) => getStepCompletion(index, form)).length;

  return (
    <div className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <aside className="rounded-[1.8rem] bg-[linear-gradient(160deg,_rgba(31,110,106,1),_rgba(48,136,128,0.96))] p-6 text-white shadow-[0_24px_60px_rgba(31,110,106,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Plan builder</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">One guided assessment, one usable result.</h2>
        <p className="mt-4 text-sm leading-7 text-white/78">
          Move through the steps in order. The generated plan will use these answers to set priorities, routines, and
          family rules.
        </p>

        <div className="mt-8 rounded-[1.5rem] bg-white/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">{activeStepIntro.eyebrow}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{activeStepIntro.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/78">{activeStepIntro.description}</p>
        </div>

        <div className="mt-8 space-y-3">
          {text.steps.map((label, index) => {
            const isActive = index === step;
            const isDone = getStepCompletion(index, form);
            return (
              <div
                key={label}
                className={`rounded-[1.35rem] border px-4 py-4 transition ${
                  isActive
                    ? "border-white/18 bg-white/16"
                    : "border-white/10 bg-[rgba(255,255,255,0.06)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                      isActive ? "bg-white text-[var(--teal-strong)]" : "bg-white/12 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/62">
                      {isDone ? "Ready" : isActive ? "In progress" : "Pending"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">Progress</p>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-[var(--mint-soft)] transition-all"
              style={{ width: `${(completionCount / text.steps.length) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-white/76">
            {completionCount} of {text.steps.length} steps have enough detail to generate a plan.
          </p>
        </div>
      </aside>

      <div className="rounded-[1.8rem] bg-white/82 p-5 shadow-[0_22px_48px_rgba(17,24,39,0.06)] ring-1 ring-black/5 backdrop-blur-sm sm:p-6 lg:p-8">
        <div className="flex flex-wrap gap-2">
          {text.steps.map((label, index) => {
            const isActive = index === step;
            const isDone = getStepCompletion(index, form);
            return (
              <button
                key={label}
                type="button"
                onClick={() => setStep(index)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[var(--teal-strong)] text-white shadow-[0_14px_28px_rgba(31,110,106,0.18)]"
                    : isDone
                      ? "bg-[rgba(108,198,184,0.14)] text-[var(--teal-strong)]"
                      : "bg-[var(--card-muted)] text-[var(--ink-soft)]"
                }`}
              >
                {index + 1}. {label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.6rem] border border-black/6 bg-[linear-gradient(180deg,_rgba(247,243,234,0.84),_rgba(255,255,255,0.78))] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">
            {activeStepIntro.eyebrow}
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">
                {text.steps[step]}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">{activeStepIntro.description}</p>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--ink-soft)] shadow-[0_10px_20px_rgba(17,24,39,0.05)]">
              Step {step + 1} of {text.steps.length}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {step === 0 ? (
            <section className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_16px_34px_rgba(17,24,39,0.04)]">
              <SectionTitle
                title={text.familyInfo}
                description="Set the household label used in the generated plan and saved versions."
              />
              <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{text.familyName}</label>
                  <input
                    className={fieldBaseClass()}
                    value={form.familyName}
                    placeholder="Nguyen family"
                    onChange={(e) => setForm({ ...form, familyName: e.target.value })}
                  />
                </div>
                <div className="rounded-[1.5rem] bg-[var(--card-muted)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">Why this matters</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                    A clear family name makes saved versions easier to scan, especially when plans are updated over time.
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_16px_34px_rgba(17,24,39,0.04)]">
              <SectionTitle
                title={text.goalsTitle}
                description="Select the outcomes you want the plan to optimize for. A few focused goals usually produce a better result."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {goalOptions.map((goal) => (
                  <SelectableCard
                    key={goal.value}
                    label={goal.label}
                    checked={form.familyGoals.includes(goal.value as never)}
                    onChange={() =>
                      setForm((current) => ({
                        ...current,
                        familyGoals: toggle(current.familyGoals, goal.value as never),
                      }))
                    }
                  />
                ))}
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-5 rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_16px_34px_rgba(17,24,39,0.04)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle
                  title={text.childInfoTitle}
                  description="Build one profile per child so recommendations stay specific instead of averaging everyone together."
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(31,110,106,0.16)] bg-[rgba(108,198,184,0.12)] px-5 py-3 text-sm font-semibold text-[var(--teal-strong)] transition hover:bg-[rgba(108,198,184,0.18)]"
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
                <div key={child.id} className="rounded-[1.6rem] bg-[linear-gradient(180deg,_rgba(243,238,229,0.76),_rgba(255,255,255,0.92))] p-5 ring-1 ring-black/5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">
                        {text.childLabel} {index + 1}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-strong)]">
                        {child.nickname.trim() || `${text.childLabel} #${index + 1}`}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                        {countSelectedFlags(child)} active flags
                      </div>
                      {form.children.length > 1 ? (
                        <button
                          type="button"
                          className="text-sm font-semibold text-[#b84f48] transition hover:text-[#9c4039]"
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
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{text.nickname}</label>
                      <input
                        className={fieldBaseClass()}
                        value={child.nickname}
                        placeholder="Mai"
                        onChange={(e) => updateChild(index, { nickname: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{text.ageBand}</label>
                      <select
                        className={fieldBaseClass()}
                        value={child.ageBand}
                        onChange={(e) => updateChild(index, { ageBand: e.target.value as never })}
                      >
                        <option value="0-5">0-5</option>
                        <option value="6-12">6-12</option>
                        <option value="13-18">13-18</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    <CheckboxGrid
                      label={text.devices}
                      items={deviceOptions}
                      values={child.devices}
                      onToggle={(value) =>
                        updateChild(index, {
                          devices: toggle(child.devices as string[], value as string) as never,
                        })
                      }
                    />

                    <CheckboxGrid
                      label={text.usage}
                      items={usageOptions}
                      values={child.mainUsage}
                      onToggle={(value) =>
                        updateChild(index, {
                          mainUsage: toggle(child.mainUsage as string[], value as string) as never,
                        })
                      }
                    />

                    <CheckboxGrid
                      label={text.concerns}
                      items={concernOptions}
                      values={child.concerns}
                      onToggle={(value) =>
                        updateChild(index, {
                          concerns: toggle(child.concerns as string[], value as string) as never,
                        })
                      }
                    />

                    <CheckboxGrid
                      label={text.crowdingOut}
                      items={crowdingOutOptions}
                      values={child.crowdingOut}
                      onToggle={(value) =>
                        updateChild(index, {
                          crowdingOut: toggle(child.crowdingOut as string[], value as string) as never,
                        })
                      }
                    />
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{text.coEngagementLevel}</label>
                    <select
                      className={fieldBaseClass()}
                      value={child.coEngagementLevel}
                      onChange={(e) => updateChild(index, { coEngagementLevel: e.target.value as never })}
                    >
                      {coEngagementOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-sm font-semibold text-[var(--ink-strong)]">Context flags</p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                </div>
              ))}
            </section>
          ) : null}

          {step === 3 ? (
            <section className="rounded-[1.7rem] border border-black/6 bg-white p-6 shadow-[0_16px_34px_rgba(17,24,39,0.04)]">
              <SectionTitle
                title={text.review}
                description="Use this final pass to confirm the household name, selected goals, and each child profile before generating the preview."
              />
              <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-4">
                  <SummaryCard label={text.reviewFamily} value={form.familyName || text.notEntered} />
                  <SummaryCard label={text.reviewChildren} value={`${form.children.length}`} />
                  <SummaryCard
                    label={text.goalsTitle}
                    value={form.familyGoals.length > 0 ? form.familyGoals.length.toString() : text.notEntered}
                  />
                </div>
                <div className="rounded-[1.5rem] bg-[var(--card-muted)] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">Child profiles</p>
                  <ul className="mt-4 space-y-3">
                    {form.children.map((child) => (
                      <li key={child.id} className="rounded-2xl bg-white px-4 py-4 shadow-[0_12px_24px_rgba(17,24,39,0.04)]">
                        <p className="font-semibold text-[var(--ink-strong)]">
                          {child.nickname || text.unnamed} | {child.ageBand}
                        </p>
                        <p className="mt-1 text-sm text-[var(--ink-soft)]">
                          {(child.mainUsage.length > 0 ? child.mainUsage : ["mixed"]).join(", ")}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ) : null}
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-[rgba(184,79,72,0.18)] bg-[rgba(184,79,72,0.08)] px-4 py-3 text-sm text-[#9c4039]">
            {error}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 border-t border-black/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))}
            disabled={step === 0}
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-strong)] transition disabled:cursor-not-allowed disabled:opacity-45"
          >
            {text.back}
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            {step < text.steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((currentStep) => Math.min(text.steps.length - 1, currentStep + 1))}
                className="inline-flex items-center justify-center rounded-full bg-[var(--teal-strong)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,110,106,0.18)] transition hover:-translate-y-0.5"
              >
                {text.continue}
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {submitting ? text.creating : existingPlanId ? text.updatePreview : text.create}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-strong)]">{title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--ink-soft)]">{description}</p>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-black/6 bg-white p-5 shadow-[0_12px_24px_rgba(17,24,39,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--teal-strong)]">{label}</p>
      <p className="mt-3 text-lg font-semibold text-[var(--ink-strong)]">{value}</p>
    </div>
  );
}

function SelectableCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-[1.35rem] border px-4 py-4 transition ${
        checked
          ? "border-[rgba(31,110,106,0.18)] bg-[rgba(108,198,184,0.12)] shadow-[0_14px_26px_rgba(31,110,106,0.08)]"
          : "border-black/6 bg-[var(--surface)] hover:border-[rgba(31,110,106,0.14)]"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[var(--teal-strong)]" />
      <span className="text-sm font-medium text-[var(--ink-strong)]">{label}</span>
    </label>
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
      <p className="mb-3 text-sm font-semibold text-[var(--ink-strong)]">{label}</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <SelectableCard
            key={item.value}
            label={item.label}
            checked={values.includes(item.value)}
            onChange={() => onToggle(item.value)}
          />
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
      <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{label}</label>
      <input
        className={fieldBaseClass()}
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
    <label
      className={`flex cursor-pointer items-center justify-between gap-4 rounded-[1.35rem] border px-4 py-4 text-sm transition ${
        checked
          ? "border-[rgba(31,110,106,0.18)] bg-[rgba(108,198,184,0.12)]"
          : "border-black/6 bg-white hover:border-[rgba(31,110,106,0.14)]"
      }`}
    >
      <span className="font-medium text-[var(--ink-strong)]">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--teal-strong)]" />
    </label>
  );
}
