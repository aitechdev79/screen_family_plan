import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { getUIText } from "@/lib/i18n/ui-text";

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = getUIText(locale).auth;

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-3xl font-bold">{text.registerTitle}</h1>
      <p className="mb-6 text-sm text-neutral-600">{text.registerDescription}</p>
      <RegisterForm locale={locale} />
      <p className="mt-4 text-sm text-neutral-600">
        {text.alreadyHaveAccount} <Link href={`/${locale}/auth/login`} className="underline">{text.loginButton}</Link>
      </p>
    </main>
  );
}
