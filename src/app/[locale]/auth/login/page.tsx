import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale).auth;

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-3xl font-bold">{text.loginTitle}</h1>
      <p className="mb-6 text-sm text-neutral-600">{text.loginDescription}</p>
      <LoginForm locale={locale} />
      <p className="mt-4 text-sm text-neutral-600">
        {text.noAccount} <Link href={`/${locale}/auth/register`} className="underline">{text.registerLink}</Link>
      </p>
    </main>
  );
}
