import Link from "next/link";

export function AppHeader({
  locale,
  primaryHref,
  primaryLabel,
}: {
  locale: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <header className="mb-8 rounded-[1.8rem] border border-white/70 bg-[rgba(255,255,255,0.78)] px-5 py-4 shadow-[0_18px_36px_rgba(17,24,39,0.05)] backdrop-blur-xl print:hidden">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--teal-strong)] text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_30px_rgba(31,110,106,0.28)]">
            FM
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Kế Hoạch Sử dụng Màn hình trong Gia Đình</p>
            <p className="text-sm text-[var(--ink-soft)]">Lập kế hoạch rõ ràng cho nhịp dùng màn hình trong gia đình</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2 text-sm font-medium text-[var(--ink-soft)]">
            <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-[rgba(108,198,184,0.12)] hover:text-[var(--ink-strong)]">
              Trang chủ
            </Link>
            <Link href={`/${locale}/plan/new`} className="rounded-full px-3 py-2 transition hover:bg-[rgba(108,198,184,0.12)] hover:text-[var(--ink-strong)]">
              Tạo kế hoạch
            </Link>
            <Link href={`/${locale}/dashboard/plans`} className="rounded-full px-3 py-2 transition hover:bg-[rgba(108,198,184,0.12)] hover:text-[var(--ink-strong)]">
              Kế hoạch đã lưu
            </Link>
            <Link href={`/${locale}/auth/login`} className="rounded-full px-3 py-2 transition hover:bg-[rgba(108,198,184,0.12)] hover:text-[var(--ink-strong)]">
              Đăng nhập
            </Link>
          </nav>

          {primaryHref && primaryLabel ? (
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(245,158,66,0.22)]"
            >
              {primaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
