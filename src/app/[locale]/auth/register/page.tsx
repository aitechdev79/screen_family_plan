import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { AppHeader } from "@/components/layout/app-header";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale).auth;

  return (
    <main className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,_rgba(108,198,184,0.28),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(245,158,66,0.16),_transparent_24%),linear-gradient(180deg,_rgba(255,253,248,1)_0%,_rgba(247,243,234,0.82)_100%)]" />
      <div className="mx-auto max-w-6xl">
        <AppHeader locale={locale} primaryHref={`/${locale}/plan/new`} primaryLabel="Start assessment" />
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <section className="rounded-[1.9rem] bg-[linear-gradient(145deg,_rgba(31,110,106,1),_rgba(48,136,128,0.96))] p-7 text-white shadow-[0_26px_70px_rgba(31,110,106,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/68">Create account</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{text.registerTitle}</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/80">{text.registerDescription}</p>
          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl bg-white/10 px-4 py-4 text-sm text-white/84">Keep your household plans organized in one account.</div>
            <div className="rounded-2xl bg-white/10 px-4 py-4 text-sm text-white/84">Update answers over time without losing prior versions.</div>
            <div className="rounded-2xl bg-white/10 px-4 py-4 text-sm text-white/84">Move from assessment to saved plan without re-entering data.</div>
          </div>
        </section>

        <section className="rounded-[1.9rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.92),_rgba(250,247,239,0.84))] p-3 shadow-[0_26px_70px_rgba(31,110,106,0.12)]">
          <div className="rounded-[1.6rem] bg-white/86 p-6 shadow-[0_18px_36px_rgba(17,24,39,0.05)] sm:p-8">
            <RegisterForm locale={locale} />
            <p className="mt-5 text-sm text-[var(--ink-soft)]">
              {text.alreadyHaveAccount}{" "}
              <Link href={`/${locale}/auth/login`} className="font-semibold text-[var(--teal-strong)] underline decoration-[rgba(31,110,106,0.22)] underline-offset-4">
                {text.loginButton}
              </Link>
            </p>
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}
