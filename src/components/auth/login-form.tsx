"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUIText } from "@/lib/i18n/ui-text";

export function LoginForm({ locale = "vi" }: { locale?: string }) {
  const text = getUIText(locale).auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const callbackUrl = searchParams.get("callbackUrl") ?? `/${locale}/dashboard/plans`;
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(text.loginError);
        return;
      }

      router.push(result?.url ?? callbackUrl);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{text.emailLabel}</label>
        <input
          className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-[15px] text-[var(--ink-strong)] outline-none transition placeholder:text-[var(--ink-soft)]/70 focus:border-[rgba(31,110,106,0.34)] focus:ring-4 focus:ring-[rgba(108,198,184,0.16)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-[var(--ink-strong)]">{text.passwordLabel}</label>
        <input
          className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-[15px] text-[var(--ink-strong)] outline-none transition placeholder:text-[var(--ink-soft)]/70 focus:border-[rgba(31,110,106,0.34)] focus:ring-4 focus:ring-[rgba(108,198,184,0.16)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>
      {error ? (
        <p className="rounded-2xl border border-[rgba(184,79,72,0.18)] bg-[rgba(184,79,72,0.08)] px-4 py-3 text-sm text-[#9c4039]">
          {error}
        </p>
      ) : null}
      <button
        disabled={isPending}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--teal-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,110,106,0.18)] transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {isPending ? text.loginLoading : text.loginButton}
      </button>
    </form>
  );
}
