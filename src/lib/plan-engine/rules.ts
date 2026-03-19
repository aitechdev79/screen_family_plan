import { ChildInput } from "./types";

export function buildFamilyRules(
  child: ChildInput,
  locale: "vi" | "en",
): string[] {
  const rules =
    locale === "vi"
      ? [
          "Không dùng thiết bị trong bữa ăn.",
          "Không dùng màn hình trong 1 giờ trước khi ngủ.",
          "Chỉ dùng một màn hình tại một thời điểm.",
        ]
      : [
          "No devices during meals.",
          "No entertainment screens during the hour before sleep.",
          "Use one screen at a time.",
        ];

  if (child.hasDeviceInBedroom) {
    rules.push(
      locale === "vi"
        ? "Sạc thiết bị bên ngoài phòng ngủ vào ban đêm."
        : "Charge devices outside the bedroom at night.",
    );
  }

  if (child.usesScreenForCalming) {
    rules.push(
      locale === "vi"
        ? "Không dùng màn hình như cách chính để dỗ con khi buồn, cáu gắt hoặc quá tải."
        : "Do not use screens as the main way to calm big feelings.",
    );
  }

  if (child.notificationsDisrupt) {
    rules.push(
      locale === "vi"
        ? "Bật chế độ Không làm phiền trong giờ học, giờ bài tập và khi ngủ."
        : "Use do-not-disturb during schoolwork, family time, and sleep.",
    );
  }

  if (child.hasAutoplayOrEndlessScroll) {
    rules.push(
      locale === "vi"
        ? "Tắt tự động phát và tránh lướt feed vô tận khi không có mục tiêu rõ ràng."
        : "Turn off autoplay and avoid endless feeds unless there is a clear purpose.",
    );
  }

  if (child.mainUsage.includes("gaming")) {
    rules.push(
      locale === "vi"
        ? "Game chỉ diễn ra trong khung giờ đã thống nhất, không mua hàng ngẫu nhiên."
        : "Gaming happens in agreed time windows, with no surprise purchases.",
    );
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    rules.push(
      locale === "vi"
        ? "Không lướt video ngắn hoặc mạng xã hội khi chưa được đồng ý và không để feed tự chạy."
        : "No scrolling short-video or social feeds without family approval and clear stop points.",
    );
  }

  if (child.chatsWithUnknownPeople) {
    rules.push(
      locale === "vi"
        ? "Chỉ chat với người được phép; nếu có tin nhắn lạ, hãy dừng lại, lưu lại và báo ngay cho người lớn."
        : "Only chat with approved contacts; stop, save, and tell a caregiver if contact feels unsafe.",
    );
  }

  return Array.from(new Set(rules));
}
