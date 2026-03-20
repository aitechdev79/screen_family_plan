import Link from "next/link";

export function StatePanel({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl rounded-[2rem] bg-white/86 p-8 shadow-[0_24px_54px_rgba(17,24,39,0.06)]">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--ink-soft)]">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-6 inline-flex rounded-full bg-[var(--teal-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(31,110,106,0.18)]"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
