"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUserAction } from "@/app/actions/auth-actions";
import { getUIText } from "@/lib/i18n/ui-text";

export function RegisterForm({ locale = "vi" }: { locale?: string }) {
  const text = getUIText(locale).auth;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await registerUserAction({
        name,
        email,
        password,
        locale: locale === "en" ? "en" : "vi",
      });

      if (!result.ok) {
        setError(result.error === "Email already exists" ? text.emailExists : text.registerError);
        return;
      }

      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (login?.error) {
        setError(text.registerAutoLoginError);
        return;
      }

      router.push(`/${locale}/dashboard/plans`);
      router.refresh();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border p-6">
      <div>
        <label className="mb-1 block text-sm font-medium">{text.displayName}</label>
        <input className="w-full rounded-xl border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input className="w-full rounded-xl border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input className="w-full rounded-xl border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength={8} required />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button disabled={isPending} className="rounded-xl bg-neutral-900 px-4 py-2 text-white disabled:opacity-60">
        {isPending ? text.registerLoading : text.registerButton}
      </button>
    </form>
  );
}
