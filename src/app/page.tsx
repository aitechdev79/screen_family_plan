import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Answer a few parent-focused questions",
    description:
      "Capture each child's age, routines, device habits, and the issues your family wants to improve first.",
  },
  {
    number: "02",
    title: "Get a structured family media plan",
    description:
      "The app turns your inputs into practical priorities, daily rhythm suggestions, family rules, and parent tips.",
  },
  {
    number: "03",
    title: "Save, adjust, and print when needed",
    description:
      "Keep versions in your account, update the plan as routines change, and export a clean PDF for home use.",
  },
] as const;

const outcomes = [
  "Priority areas matched to each child",
  "Daily rhythm guidance for school days and weekends",
  "Family rules that are specific enough to follow",
  "Parent tips that support consistency instead of conflict",
] as const;

const concerns = [
  {
    title: "Sleep and overstimulation",
    description: "Spot routines that keep screens too close to bedtime and replace them with clearer limits.",
  },
  {
    title: "Focus and homework friction",
    description: "Identify when entertainment, short videos, or notifications are crowding out school attention.",
  },
  {
    title: "Safety and digital independence",
    description: "Flag risky patterns like autoplay, stranger contact, bedroom devices, and personal-device drift.",
  },
] as const;

const samplePlan = [
  { label: "Priority areas", value: "Sleep, focus, content quality" },
  { label: "Daily rhythm", value: "No short video before school, shared viewing after homework" },
  { label: "Family rule", value: "Devices charge outside bedrooms after 8:30 PM" },
  { label: "Parent tip", value: "Co-watch once a week and review what feels useful or draining" },
] as const;

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--ink-strong)]">
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.38),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.18),_transparent_30%),linear-gradient(180deg,_#fffdf8_0%,_#f7f3ea_72%)]" />
        <div className="pointer-events-none absolute left-[-7rem] top-28 -z-10 h-64 w-64 rounded-full bg-[rgba(108,198,184,0.16)] blur-3xl" />
        <div className="pointer-events-none absolute right-[-5rem] top-40 -z-10 h-72 w-72 rounded-full bg-[rgba(245,158,66,0.14)] blur-3xl" />

        <header className="sticky top-0 z-20 border-b border-black/5 bg-[rgba(247,243,234,0.8)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--teal-strong)] text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(31,110,106,0.28)]">
                FM
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Family Media Plan</p>
                <p className="text-sm text-[var(--ink-soft)]">Calmer routines for modern households</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--ink-soft)] lg:flex">
              <a href="#how-it-works" className="transition hover:text-[var(--ink-strong)]">
                How it works
              </a>
              <a href="#sample-plan" className="transition hover:text-[var(--ink-strong)]">
                Sample output
              </a>
              <a href="#benefits" className="transition hover:text-[var(--ink-strong)]">
                Benefits
              </a>
              <Link href="/vi/auth/login" className="transition hover:text-[var(--ink-strong)]">
                Sign in
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-black/10 bg-white/80 p-1 sm:flex">
                <Link
                  href="/vi/plan/new"
                  className="rounded-full bg-[var(--teal-strong)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                >
                  VI
                </Link>
                <Link
                  href="/en/plan/new"
                  className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-soft)]"
                >
                  EN
                </Link>
              </div>
              <Link
                href="/vi/plan/new"
                className="inline-flex items-center rounded-full bg-[var(--orange-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(245,158,66,0.35)] transition hover:-translate-y-0.5"
              >
                Start assessment
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-20">
          <div>
            <div className="inline-flex items-center rounded-full border border-[rgba(31,110,106,0.12)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal-strong)] shadow-[0_8px_24px_rgba(31,110,106,0.08)]">
              Digital wellness for modern families
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-[var(--ink-strong)] sm:text-6xl">
              Build a clear media plan for your family in minutes.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              Designed for parents of children ages 5 to 18, this app turns everyday screen-time concerns into a
              practical plan you can actually use at home.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/vi/plan/new"
                className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(245,158,66,0.32)] transition hover:-translate-y-0.5"
              >
                Start free assessment
              </Link>
              <a
                href="#sample-plan"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(30,36,48,0.12)] bg-white/80 px-7 py-4 text-base font-semibold text-[var(--ink-strong)] transition hover:border-[rgba(30,36,48,0.24)]"
              >
                See sample plan
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-[var(--ink-soft)]">
              <span className="rounded-full bg-white/75 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">No setup required</span>
              <span className="rounded-full bg-white/75 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">Vietnamese and English</span>
              <span className="rounded-full bg-white/75 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">Printable PDF output</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 bottom-3 top-10 rounded-[2rem] bg-[linear-gradient(145deg,_rgba(108,198,184,0.3),_rgba(255,255,255,0.18))] blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(250,247,239,0.88))] p-5 shadow-[0_30px_80px_rgba(31,110,106,0.15)]">
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.6rem] bg-[var(--teal-strong)] p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Assessment snapshot</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">Screen habits with context, not guesswork</h2>
                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/65">Family goals</p>
                      <p className="mt-2 text-sm leading-6">Sleep better, improve focus, safer media use</p>
                    </div>
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/65">Signals captured</p>
                      <p className="mt-2 text-sm leading-6">Bedroom devices, autoplay, short video habits, school disruption</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.6rem] bg-white p-5 shadow-[inset_0_0_0_1px_rgba(30,36,48,0.06)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">Generated plan</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Nguyen family preview</h3>
                    </div>
                    <div className="rounded-full bg-[rgba(108,198,184,0.14)] px-3 py-1 text-xs font-semibold text-[var(--teal-strong)]">
                      Ready to save
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {samplePlan.map((item) => (
                      <div key={item.label} className="rounded-2xl bg-[var(--card-muted)] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-soft)]">{item.label}</p>
                        <p className="mt-2 text-sm leading-6 text-[var(--ink-strong)]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--teal-strong)]">How it works</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">
            A parent-friendly flow with a concrete result at the end.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[1.75rem] border border-black/6 bg-white/90 p-6 shadow-[0_20px_40px_rgba(17,24,39,0.05)]"
            >
              <div className="inline-flex rounded-full bg-[rgba(108,198,184,0.18)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">
                {step.number}
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-strong)]">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-[var(--ink-soft)]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sample-plan" className="mx-auto max-w-7xl px-6 py-6 lg:py-12">
        <div className="grid gap-8 rounded-[2rem] bg-[var(--panel-dark)] px-6 py-8 text-white shadow-[0_28px_60px_rgba(30,36,48,0.22)] lg:grid-cols-[1fr_1.05fr] lg:px-10 lg:py-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--mint-soft)]">What parents receive</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">The output is practical, structured, and easy to revisit.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/74">
              Instead of generic advice, the app organizes family inputs into an action plan built around routines,
              friction points, and realistic next steps.
            </p>
            <div className="mt-7 grid gap-3">
              {outcomes.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] bg-white p-6 text-[var(--ink-strong)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">Sample preview</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Family media plan</h3>
              </div>
              <div className="rounded-full bg-[rgba(245,158,66,0.16)] px-3 py-1 text-xs font-semibold text-[var(--orange-strong)]">
                PDF ready
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-[var(--card-muted)] p-4">
                <p className="text-sm font-semibold">Priority areas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow-[0_8px_18px_rgba(17,24,39,0.06)]">Sleep</span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow-[0_8px_18px_rgba(17,24,39,0.06)]">Homework focus</span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow-[0_8px_18px_rgba(17,24,39,0.06)]">Digital safety</span>
                </div>
              </div>
              <div className="rounded-2xl border border-black/6 p-4">
                <p className="text-sm font-semibold">Daily rhythm</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  Weekday routine sets quiet study time before entertainment and removes devices from bedrooms overnight.
                </p>
              </div>
              <div className="rounded-2xl border border-black/6 p-4">
                <p className="text-sm font-semibold">Recommended actions</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
                  <li>Create one family charging zone outside bedrooms.</li>
                  <li>Turn off autoplay on the child&apos;s main video apps.</li>
                  <li>Use one shared review point every Sunday evening.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Why this helps</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">
              Built around the real points where family routines break down.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--ink-soft)]">
              Parents usually do not need more theory. They need a clearer read on what is happening and a plan they can
              explain, repeat, and adjust.
            </p>
          </div>
          <div className="grid gap-5">
            {concerns.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.7rem] border border-black/6 bg-white px-6 py-6 shadow-[0_18px_38px_rgba(17,24,39,0.05)]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[var(--orange-strong)]" />
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-strong)]">{item.title}</h3>
                    <p className="mt-3 text-base leading-7 text-[var(--ink-soft)]">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-18 pt-2 lg:pb-24">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,_rgba(31,110,106,1),_rgba(50,138,130,1))] px-6 py-10 text-white shadow-[0_28px_60px_rgba(31,110,106,0.28)] lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(207,245,238,0.92)]">Start here</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Ready to create a family media plan that feels usable?</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">
                Begin with the questionnaire, generate a tailored plan, and keep refining it as your household routines change.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/vi/plan/new"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-semibold text-[var(--teal-strong)] transition hover:-translate-y-0.5"
              >
                Start assessment
              </Link>
              <Link
                href="/vi/auth/login"
                className="inline-flex items-center justify-center rounded-full border border-white/24 px-7 py-4 text-base font-semibold text-white/92 transition hover:bg-white/6"
              >
                View saved plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
