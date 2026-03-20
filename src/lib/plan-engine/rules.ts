import { ChildInput } from "./types";

export function buildFamilyRules(child: ChildInput, _locale: "vi" | "en"): string[] {
  const rules = [
    "Không dùng thiết bị trong bữa ăn.",
    "Không dùng màn hình trong 1 giờ trước khi ngủ.",
    "Chỉ dùng một màn hình tại một thời điểm.",
  ];

  if (child.hasDeviceInBedroom) {
    rules.push("Sạc thiết bị bên ngoài phòng ngủ vào ban đêm.");
  }

  if (child.usesScreenForCalming) {
    rules.push("Không dùng màn hình như cách chính để dỗ con khi buồn, cáu gắt hoặc quá tải.");
  }

  if (child.notificationsDisrupt) {
    rules.push("Bật chế độ Không làm phiền trong giờ học, giờ bài tập và khi ngủ.");
  }

  if (child.hasAutoplayOrEndlessScroll) {
    rules.push("Tắt tự động phát và tránh lướt feed vô tận khi không có mục tiêu rõ ràng.");
  }

  if (child.mainUsage.includes("gaming")) {
    rules.push("Game chỉ diễn ra trong khung giờ đã thống nhất, không mua hàng ngẫu nhiên.");
  }

  if (child.mainUsage.includes("short_video") || child.mainUsage.includes("social_media")) {
    rules.push("Không lướt video ngắn hoặc mạng xã hội khi chưa được đồng ý và không để feed tự chạy.");
  }

  if (child.chatsWithUnknownPeople) {
    rules.push("Chỉ chat với người được phép; nếu có tin nhắn lạ, hãy dừng lại, lưu lại và báo ngay cho người lớn.");
  }

  return Array.from(new Set(rules));
}
