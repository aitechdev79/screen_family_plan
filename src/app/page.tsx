import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Trả lời một vài câu hỏi dành cho phụ huynh",
  },
  {
    number: "02",
    title: "Nhận kế hoạch sử dụng màn hình trong gia đình có cấu trúc",
  },
  {
    number: "03",
    title: "Lưu, điều chỉnh và in khi cần",
  },
] as const;

const outcomes = [
  "Các vùng ưu tiên phù hợp với từng trẻ",
  "Gợi ý nhịp sinh hoạt cho ngày đi học và cuối tuần",
  "Quy tắc gia đình đủ cụ thể để áp dụng",
  "Gợi ý cho cha mẹ giúp duy trì nhất quán thay vì xung đột",
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
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Kế Hoạch Sử dụng Màn hình trong Gia Đình</p>
                <p className="text-sm text-[var(--ink-soft)]">Nhịp dùng màn hình rõ ràng hơn cho gia đình hiện đại</p>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--ink-soft)] lg:flex">
              <a href="#how-it-works" className="transition hover:text-[var(--ink-strong)]">
                Cách hoạt động
              </a>
              <a href="#sample-plan" className="transition hover:text-[var(--ink-strong)]">
                Bản mẫu
              </a>
              <Link href="/vi/auth/login" className="transition hover:text-[var(--ink-strong)]">
                Đăng nhập
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/vi/plan/new"
                className="inline-flex items-center rounded-full bg-[var(--orange-strong)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(245,158,66,0.35)] transition hover:-translate-y-0.5"
              >
                Bắt đầu đánh giá
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-20">
          <div>
            <div className="inline-flex items-center rounded-full border border-[rgba(31,110,106,0.12)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal-strong)] shadow-[0_8px_24px_rgba(31,110,106,0.08)]">
              Sức khỏe số cho gia đình hiện đại
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-[var(--ink-strong)] sm:text-6xl">
              Tạo kế hoạch dùng màn hình hiệu quả cho cả nhà chỉ trong vài phút.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              Dành cho phụ huynh có con từ 5 đến 18 tuổi, ứng dụng này biến những lo lắng thường ngày về màn hình thành
              một kế hoạch thực tế có thể áp dụng ngay tại nhà.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/vi/plan/new"
                className="inline-flex items-center justify-center rounded-full bg-[var(--orange-strong)] px-7 py-4 text-base font-semibold text-white shadow-[0_14px_34px_rgba(245,158,66,0.32)] transition hover:-translate-y-0.5"
              >
                Bắt đầu đánh giá miễn phí
              </Link>
              <a
                href="#sample-plan"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(30,36,48,0.12)] bg-white/80 px-7 py-4 text-base font-semibold text-[var(--ink-strong)] transition hover:border-[rgba(30,36,48,0.24)]"
              >
                Xem bản mẫu
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 bottom-3 top-10 rounded-[2rem] bg-[linear-gradient(145deg,_rgba(108,198,184,0.3),_rgba(255,255,255,0.18))] blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(250,247,239,0.88))] p-5 shadow-[0_30px_80px_rgba(31,110,106,0.15)]">
              <div className="rounded-[1.6rem] bg-[var(--teal-strong)] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Tóm tắt đánh giá</p>
                <h2 className="mt-4 max-w-xl text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  Hiểu thói quen màn hình theo bối cảnh, không đoán mò
                </h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/12 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/65">Mục tiêu gia đình</p>
                    <p className="mt-2 text-sm leading-6">Ngủ tốt hơn, tập trung hơn, dùng media an toàn hơn</p>
                  </div>
                  <div className="rounded-2xl bg-white/12 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/65">Tín hiệu được ghi nhận</p>
                    <p className="mt-2 text-sm leading-6">Thiết bị trong phòng ngủ, tự động phát, thói quen video ngắn, ảnh hưởng việc học</p>
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/65">Điểm mạnh của kế hoạch</p>
                  <p className="mt-2 text-sm leading-6 text-white/92">
                    Chuyển các tín hiệu rời rạc thành ưu tiên rõ ràng, nhịp sinh hoạt thực tế và quy tắc đủ cụ thể để cả nhà làm theo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--teal-strong)]">Cách hoạt động</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="contents">
              <article
                className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(160deg,_rgba(255,255,255,0.98),_rgba(248,244,236,0.94))] p-7 shadow-[0_18px_0_rgba(31,110,106,0.08),0_28px_60px_rgba(17,24,39,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_0_rgba(31,110,106,0.12),0_34px_72px_rgba(17,24,39,0.12)] lg:min-h-[220px] lg:[transform:perspective(1200px)_rotateX(3deg)]"
              >
                <div className="absolute inset-x-6 top-0 h-16 rounded-b-[1.25rem] bg-[linear-gradient(180deg,_rgba(108,198,184,0.16),_transparent)]" />
                <div className="relative">
                  <div className="inline-flex rounded-full bg-[rgba(108,198,184,0.18)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    {step.number}
                  </div>
                  <h3 className="mt-8 max-w-sm text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--ink-strong)]">
                    {step.title}
                  </h3>
                </div>
              </article>

              {index < steps.length - 1 ? (
                <div className="hidden items-center justify-center lg:flex">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(31,110,106,0.12)] bg-white/90 text-2xl text-[var(--teal-strong)] shadow-[0_14px_30px_rgba(17,24,39,0.08)]">
                    →
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section id="sample-plan" className="mx-auto max-w-7xl px-6 py-6 lg:py-12">
        <div className="rounded-[2rem] bg-[var(--panel-dark)] px-6 py-8 text-white shadow-[0_28px_60px_rgba(30,36,48,0.22)] lg:px-10 lg:py-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--mint-soft)]">Phụ huynh sẽ nhận được gì</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Kết quả đủ thực tế, có cấu trúc và dễ xem lại.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/74">
              Thay vì lời khuyên chung chung, ứng dụng sắp xếp thông tin của gia đình thành một kế hoạch hành động xoay quanh
              thói quen, điểm vướng và các bước tiếp theo thực tế.
            </p>
            <div className="mt-7 grid gap-3">
              {outcomes.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-18 pt-2 lg:pb-24">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,_rgba(31,110,106,1),_rgba(50,138,130,1))] px-6 py-10 text-white shadow-[0_28px_60px_rgba(31,110,106,0.28)] lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_auto] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.04em]">Sẵn sàng tạo một kế hoạch sử dụng màn hình trong gia đình thật sự dùng được?</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">
                Bắt đầu bằng bảng hỏi, tạo kế hoạch phù hợp với gia đình bạn và tiếp tục tinh chỉnh khi nếp sinh hoạt thay đổi.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/vi/plan/new"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-base font-semibold text-[var(--teal-strong)] transition hover:-translate-y-0.5"
              >
                Bắt đầu đánh giá
              </Link>
              <Link
                href="/vi/auth/login"
                className="inline-flex items-center justify-center rounded-full border border-white/24 px-7 py-4 text-base font-semibold text-white/92 transition hover:bg-white/6"
              >
                Xem kế hoạch đã lưu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
