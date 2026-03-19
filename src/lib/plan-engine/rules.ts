import { ChildInput } from "./types";

export function buildFamilyRules(
  child: ChildInput,
  locale: "vi" | "en",
): string[] {
  const rules =
    locale === "vi"
      ? [
          "Khong dung thiet bi trong bua an.",
          "Khong dung man hinh trong 1 gio truoc khi ngu.",
          "Chi dung mot man hinh tai mot thoi diem.",
        ]
      : [
          "No devices during meals.",
          "No entertainment screens during the hour before sleep.",
          "Use one screen at a time.",
        ];

  if (child.hasDeviceInBedroom) {
    rules.push(
      locale === "vi"
        ? "Sac thiet bi ben ngoai phong ngu vao ban dem."
        : "Charge devices outside the bedroom at night.",
    );
  }

  if (child.usesScreenForCalming) {
    rules.push(
      locale === "vi"
        ? "Khong dung man hinh nhu cach chinh de do con khi buon, cau gat, hoac qua tai."
        : "Do not use screens as the main way to calm big feelings.",
    );
  }

  if (child.notificationsDisrupt) {
    rules.push(
      locale === "vi"
        ? "Bat do-not-disturb trong gio hoc, gio bai tap, va khi ngu."
        : "Use do-not-disturb during schoolwork, family time, and sleep.",
    );
  }

  if (child.hasAutoplayOrEndlessScroll) {
    rules.push(
      locale === "vi"
        ? "Tat autoplay va tranh luot feed vo tan khi khong co muc tieu ro rang."
        : "Turn off autoplay and avoid endless feeds unless there is a clear purpose.",
    );
  }

  if (child.mainUsage.includes("gaming")) {
    rules.push(
      locale === "vi"
        ? "Game chi dien ra trong khung gio da thong nhat, khong mua hang ngau nhien."
        : "Gaming happens in agreed time windows, with no surprise purchases.",
    );
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    rules.push(
      locale === "vi"
        ? "Khong luot video ngan hoac mang xa hoi khi chua duoc dong y va khong de feed tu chay."
        : "No scrolling short-video or social feeds without family approval and clear stop points.",
    );
  }

  if (child.chatsWithUnknownPeople) {
    rules.push(
      locale === "vi"
        ? "Chi chat voi nguoi duoc phep; neu co tin nhan la, dung, chup lai, va bao ngay cho nguoi lon."
        : "Only chat with approved contacts; stop, save, and tell a caregiver if contact feels unsafe.",
    );
  }

  return Array.from(new Set(rules));
}
