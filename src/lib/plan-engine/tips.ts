import { ChildInput } from "./types";

export function buildParentTips(
  child: ChildInput,
  locale: "vi" | "en",
): string[] {
  const tips =
    locale === "vi"
      ? [
          "Trò chuyện thường xuyên với con về những gì con xem, chơi và cảm thấy.",
          "Ưu tiên nội dung chất lượng cao, chậm hơn, ít quảng cáo hơn và phù hợp với độ tuổi.",
        ]
      : [
          "Talk regularly about what your child watches, plays, and feels online.",
          "Prioritize high-quality, slower, less commercial content that matches your child's developmental stage.",
        ];

  if (child.ageBand === "0-5") {
    tips.push(
      locale === "vi"
        ? "Với trẻ nhỏ, cố gắng cùng xem và cùng chơi để biến media thành trải nghiệm tương tác."
        : "For young children, co-view and co-play whenever possible so media stays relational and interactive.",
    );
  }

  if (child.concerns.includes("sleep") || child.crowdingOut.includes("sleep")) {
    tips.push(
      locale === "vi"
        ? "Bảo vệ giấc ngủ là ưu tiên hàng đầu; giữ nhịp buổi tối ổn định và không đem thiết bị vào phòng ngủ."
        : "Protect sleep first with a stable evening routine and by keeping devices out of the bedroom.",
    );
  }

  if (child.usesScreenForCalming) {
    tips.push(
      locale === "vi"
        ? "Chuẩn bị sẵn cách thay thế để giúp con bình tĩnh: ôm, hít thở, tô màu, sách tranh hoặc đi bộ ngắn."
        : "Prepare non-screen calming tools ahead of time such as breathing, drawing, books, music, or a short walk.",
    );
  }

  if (child.hasAutoplayOrEndlessScroll) {
    tips.push(
      locale === "vi"
        ? "Giải thích cho con rằng tự động phát và feed vô tận được thiết kế để kéo dài thời gian xem."
        : "Explain that autoplay and endless feeds are designed to keep people watching, not to help them stop.",
    );
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    tips.push(
      locale === "vi"
        ? "Dạy con nhận ra quảng cáo, nguồn thông tin kém tin cậy và cách chặn hoặc báo cáo khi gặp nội dung độc hại."
        : "Teach your child to spot ads, low-trust information, and how to block or report harmful content.",
    );
  }

  if (child.chatsWithUnknownPeople) {
    tips.push(
      locale === "vi"
        ? "Tập trước các tình huống 'nếu - thì' cho tin nhắn lạ, yêu cầu gửi ảnh riêng tư hoặc nội dung khiến con thấy lo."
        : "Rehearse simple if-then responses for strangers, pressure to share images, or content that feels unsafe.",
    );
  }

  return tips;
}
