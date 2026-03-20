import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Trả lời một vài câu hỏi dành cho phụ huynh",
    description:
      "Ghi nhận độ tuổi, nhịp sinh hoạt, thói quen thiết bị và những vấn đề gia đình bạn muốn cải thiện trước tiên.",
  },
  {
    number: "02",
    title: "Nhận kế hoạch media gia đình có cấu trúc",
    description:
      "Ứng dụng chuyển câu trả lời thành các ưu tiên thực tế, gợi ý nhịp sinh hoạt, quy tắc gia đình và lưu ý cho cha mẹ.",
  },
  {
    number: "03",
    title: "Lưu, điều chỉnh và in khi cần",
    description:
      "Lưu các phiên bản trong tài khoản, cập nhật kế hoạch khi nếp sinh hoạt thay đổi và xuất PDF gọn gàng để dùng tại nhà.",
  },
] as const;

const outcomes = [
  "Các vùng ưu tiên phù hợp với từng trẻ",
  "Gợi ý nhịp sinh hoạt cho ngày đi học và cuối tuần",
  "Quy tắc gia đình đủ cụ thể để áp dụng",
  "Gợi ý cho cha mẹ giúp duy trì nhất quán thay vì xung đột",
] as const;

const concerns = [
  {
    title: "Giấc ngủ và quá tải kích thích",
    description: "Nhận ra những thói quen khiến màn hình xuất hiện quá sát giờ ngủ và thay bằng giới hạn rõ ràng hơn.",
  },
  {
    title: "Tập trung và xung đột quanh việc học",
    description: "Xác định lúc giải trí, video ngắn hoặc thông báo đang lấn sang thời gian học và sự tập trung.",
  },
  {
    title: "An toàn và sự tự chủ trên môi trường số",
    description: "Đánh dấu các mẫu hành vi rủi ro như tự động phát, liên hệ người lạ, thiết bị trong phòng ngủ và lệ thuộc thiết bị cá nhân.",
  },
] as const;

const samplePlan = [
  { label: "Vùng ưu tiên", value: "Giấc ngủ, tập trung, chất lượng nội dung" },
  { label: "Nhịp sinh hoạt", value: "Không xem video ngắn trước giờ đi học, cùng xem sau khi xong bài" },
  { label: "Quy tắc gia đình", value: "Thiết bị được sạc bên ngoài phòng ngủ sau 8:30 tối" },
  { label: "Gợi ý cho cha mẹ", value: "Cùng xem một lần mỗi tuần và trao đổi điều gì hữu ích hoặc gây mệt mỏi" },
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
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Kế Hoạch Media Gia Đình</p>
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
              <a href="#benefits" className="transition hover:text-[var(--ink-strong)]">
                Lợi ích
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
              Tạo kế hoạch media rõ ràng cho gia đình chỉ trong vài phút.
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
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-[var(--ink-soft)]">
              <span className="rounded-full bg-white/75 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">Không cần cài đặt</span>
              <span className="rounded-full bg-white/75 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">Trải nghiệm hoàn toàn bằng tiếng Việt</span>
              <span className="rounded-full bg-white/75 px-4 py-2 shadow-[0_10px_24px_rgba(17,24,39,0.06)]">Xuất PDF để in</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 bottom-3 top-10 rounded-[2rem] bg-[linear-gradient(145deg,_rgba(108,198,184,0.3),_rgba(255,255,255,0.18))] blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,_rgba(255,255,255,0.96),_rgba(250,247,239,0.88))] p-5 shadow-[0_30px_80px_rgba(31,110,106,0.15)]">
              <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[1.6rem] bg-[var(--teal-strong)] p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Tóm tắt đánh giá</p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">Hiểu thói quen màn hình theo bối cảnh, không đoán mò</h2>
                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/65">Mục tiêu gia đình</p>
                      <p className="mt-2 text-sm leading-6">Ngủ tốt hơn, tập trung hơn, dùng media an toàn hơn</p>
                    </div>
                    <div className="rounded-2xl bg-white/12 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/65">Tín hiệu được ghi nhận</p>
                      <p className="mt-2 text-sm leading-6">Thiết bị trong phòng ngủ, tự động phát, thói quen video ngắn, ảnh hưởng việc học</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.6rem] bg-white p-5 shadow-[inset_0_0_0_1px_rgba(30,36,48,0.06)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">Kế hoạch được tạo</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Bản xem trước gia đình Nguyễn</h3>
                    </div>
                    <div className="rounded-full bg-[rgba(108,198,184,0.14)] px-3 py-1 text-xs font-semibold text-[var(--teal-strong)]">
                      Sẵn sàng lưu
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--teal-strong)]">Cách hoạt động</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">
            Quy trình thân thiện với phụ huynh và có kết quả rõ ràng ở cuối.
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

          <div className="rounded-[1.8rem] bg-white p-6 text-[var(--ink-strong)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal-strong)]">Bản xem trước mẫu</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Kế hoạch media gia đình</h3>
              </div>
              <div className="rounded-full bg-[rgba(245,158,66,0.16)] px-3 py-1 text-xs font-semibold text-[var(--orange-strong)]">
                Sẵn sàng xuất PDF
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-[var(--card-muted)] p-4">
                <p className="text-sm font-semibold">Vùng ưu tiên</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow-[0_8px_18px_rgba(17,24,39,0.06)]">Giấc ngủ</span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow-[0_8px_18px_rgba(17,24,39,0.06)]">Tập trung khi học</span>
                  <span className="rounded-full bg-white px-3 py-1 text-sm shadow-[0_8px_18px_rgba(17,24,39,0.06)]">An toàn số</span>
                </div>
              </div>
              <div className="rounded-2xl border border-black/6 p-4">
                <p className="text-sm font-semibold">Nhịp sinh hoạt</p>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                  Ngày thường ưu tiên thời gian học yên tĩnh trước giải trí và đưa thiết bị ra khỏi phòng ngủ vào buổi tối.
                </p>
              </div>
              <div className="rounded-2xl border border-black/6 p-4">
                <p className="text-sm font-semibold">Hành động khuyến nghị</p>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
                  <li>Tạo một khu sạc chung của gia đình bên ngoài phòng ngủ.</li>
                  <li>Tắt tự động phát trên các ứng dụng video trẻ dùng nhiều nhất.</li>
                  <li>Dành một thời điểm rà soát chung vào tối Chủ nhật hằng tuần.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--teal-strong)]">Vì sao hữu ích</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-strong)]">
              Được thiết kế từ những điểm đứt gãy thật sự trong sinh hoạt gia đình.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[var(--ink-soft)]">
              Phụ huynh thường không cần thêm lý thuyết. Điều cần là một bức tranh rõ hơn về điều đang diễn ra và một kế hoạch
              có thể giải thích, lặp lại và điều chỉnh được.
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
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(207,245,238,0.92)]">Bắt đầu từ đây</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Sẵn sàng tạo một kế hoạch media gia đình thật sự dùng được?</h2>
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
