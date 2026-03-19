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
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border p-6">
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input className="w-full rounded-xl border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input className="w-full rounded-xl border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button disabled={isPending} className="rounded-xl bg-neutral-900 px-4 py-2 text-white disabled:opacity-60">
        {isPending ? text.loginLoading : text.loginButton}
      </button>
    </form>
  );
}
