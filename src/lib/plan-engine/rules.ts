import { ChildInput } from "./types";

export function buildFamilyRules(child: ChildInput): string[] {
  const rules = [
    "Không dùng thiết bị trong bữa ăn.",
    "Không dùng màn hình trong 1 giờ trước khi ngủ.",
    "Chỉ dùng một màn hình tại một thời điểm.",
  ];

  if (child.hasDeviceInBedroom) {
    rules.push("Thiết bị được sạc bên ngoài phòng ngủ vào ban đêm.");
  }

  if (child.usesScreenForCalming) {
    rules.push(
      "Không dùng màn hình như cách chính để dỗ khi trẻ cáu hoặc buồn."
    );
  }

  if (child.mainUsage.includes("gaming")) {
    rules.push(
      "Game chỉ diễn ra trong khung giờ đã thống nhất, không phát sinh mua hàng ngẫu nhiên."
    );
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    rules.push(
      "Không lướt video ngắn hoặc feed vô hạn khi chưa được cha mẹ đồng ý."
    );
  }

  return Array.from(new Set(rules));
}
