import { ChildInput } from "./types";

export function buildParentTips(child: ChildInput): string[] {
  const tips = [
    "Nói chuyện thường xuyên với con về những gì con xem, chơi và cảm thấy.",
    "Ưu tiên nội dung chậm, chất lượng cao, có giá trị học tập hoặc xã hội tích cực.",
  ];

  if (child.ageBand === "0-5") {
    tips.push(
      "Với trẻ nhỏ, cố gắng cùng xem/cùng chơi để biến media thành trải nghiệm tương tác thay vì một hoạt động đơn độc."
    );
  }

  if (child.concerns.includes("sleep")) {
    tips.push(
      "Giấc ngủ nên được ưu tiên hơn giải trí bằng màn hình; thiết lập routine tối nhất quán."
    );
  }

  if (child.usesScreenForCalming) {
    tips.push(
      "Chuẩn bị sẵn lựa chọn thay thế để giúp con bình tĩnh: ôm, hít thở, tô màu, sách tranh, đi bộ ngắn."
    );
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    tips.push(
      "Giải thích cho con rằng feed và autoplay được thiết kế để kéo dài thời gian xem."
    );
  }

  return tips;
}
