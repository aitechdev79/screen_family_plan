import { ChildInput } from "./types";

export function buildParentTips(
  child: ChildInput,
  locale: "vi" | "en",
): string[] {
  const tips =
    locale === "vi"
      ? [
          "Tro chuyen thuong xuyen voi con ve nhung gi con xem, choi, va cam thay.",
          "Uu tien noi dung chat luong cao, cham hon, it quang cao, va phu hop voi do tuoi.",
        ]
      : [
          "Talk regularly about what your child watches, plays, and feels online.",
          "Prioritize high-quality, slower, less commercial content that matches your child's developmental stage.",
        ];

  if (child.ageBand === "0-5") {
    tips.push(
      locale === "vi"
        ? "Voi tre nho, co-gang cung xem va cung choi de bien media thanh trai nghiem tuong tac."
        : "For young children, co-view and co-play whenever possible so media stays relational and interactive.",
    );
  }

  if (child.concerns.includes("sleep") || child.crowdingOut.includes("sleep")) {
    tips.push(
      locale === "vi"
        ? "Bao ve giac ngu la uu tien hang dau; giu routine buoi toi on dinh va khong dem thiet bi vao phong ngu."
        : "Protect sleep first with a stable evening routine and by keeping devices out of the bedroom.",
    );
  }

  if (child.usesScreenForCalming) {
    tips.push(
      locale === "vi"
        ? "Chuan bi san cach thay the de giup con binh tinh: om, hit tho, to mau, sach tranh, di bo ngan."
        : "Prepare non-screen calming tools ahead of time such as breathing, drawing, books, music, or a short walk.",
    );
  }

  if (child.hasAutoplayOrEndlessScroll) {
    tips.push(
      locale === "vi"
        ? "Giai thich cho con rang autoplay va feed vo tan duoc thiet ke de keo dai thoi gian xem."
        : "Explain that autoplay and endless feeds are designed to keep people watching, not to help them stop.",
    );
  }

  if (
    child.mainUsage.includes("short_video") ||
    child.mainUsage.includes("social_media")
  ) {
    tips.push(
      locale === "vi"
        ? "Day con nhan ra quang cao, nguon thong tin kem tin cay, va cach block/report khi gap noi dung doc hai."
        : "Teach your child to spot ads, low-trust information, and how to block or report harmful content.",
    );
  }

  if (child.chatsWithUnknownPeople) {
    tips.push(
      locale === "vi"
        ? "Tap truoc cac tinh huong 'neu-thi' cho tin nhan la, xin anh rieng tu, hoac noi dung khien con thay lo."
        : "Rehearse simple if-then responses for strangers, pressure to share images, or content that feels unsafe.",
    );
  }

  return tips;
}
