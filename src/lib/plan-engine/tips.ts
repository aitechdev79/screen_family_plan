import { ChildInput } from "./types";

export function buildParentTips(child: ChildInput, _locale: "vi" | "en"): string[] {
  const tips = [
    "Trò chuyện thường xuyên với con về những gì con xem, chơi và cảm thấy.",
    "Ưu tiên nội dung chất lượng cao, chậm hơn, ít quảng cáo hơn và phù hợp với độ tuổi.",
  ];

  if (child.ageBand === "0-5") {
    tips.push("Với trẻ nhỏ, cố gắng cùng xem và cùng chơi để biến media thành trải nghiệm tương tác.");
  }

  if (child.concerns.includes("sleep") || child.crowdingOut.includes("sleep")) {
    tips.push("Bảo vệ giấc ngủ là ưu tiên hàng đầu; giữ nhịp buổi tối ổn định và không đem thiết bị vào phòng ngủ.");
  }

  if (child.usesScreenForCalming) {
    tips.push("Chuẩn bị sẵn cách thay thế để giúp con bình tĩnh như ôm, hít thở, tô màu, sách tranh hoặc đi bộ ngắn.");
  }

  if (child.hasAutoplayOrEndlessScroll) {
    tips.push("Giải thích cho con rằng tự động phát và feed vô tận được thiết kế để kéo dài thời gian xem.");
  }

  if (child.mainUsage.includes("short_video") || child.mainUsage.includes("social_media")) {
    tips.push("Dạy con nhận ra quảng cáo, nguồn thông tin kém tin cậy và cách chặn hoặc báo cáo khi gặp nội dung độc hại.");
  }

  if (child.chatsWithUnknownPeople) {
    tips.push("Tập trước các tình huống 'nếu - thì' cho tin nhắn lạ, yêu cầu gửi ảnh riêng tư hoặc nội dung khiến con thấy lo.");
  }

  return tips;
}
