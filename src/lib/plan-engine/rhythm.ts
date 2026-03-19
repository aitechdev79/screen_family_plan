import { ChildInput } from "./types";

export function buildDailyRhythm(child: ChildInput): Array<{
  label: string;
  recommendation: string;
}> {
  const items = [];

  if (child.ageBand === "0-5") {
    items.push(
      {
        label: "Morning",
        recommendation:
          "Ưu tiên ăn sáng, chuẩn bị, vận động và tương tác trực tiếp; tránh giải trí bằng màn hình.",
      },
      {
        label: "After school / daytime",
        recommendation:
          "Nếu dùng màn hình, ưu tiên nội dung ngắn, chất lượng cao và có cha mẹ cùng tham gia.",
      },
      {
        label: "Evening",
        recommendation:
          "Chuyển dần sang chơi tự do, đọc sách, trò chuyện; tránh màn hình trước giờ ngủ 1 giờ.",
      }
    );
  } else if (child.ageBand === "6-12") {
    items.push(
      {
        label: "Before school",
        recommendation: "Không dùng màn hình giải trí trước giờ học.",
      },
      {
        label: "After school",
        recommendation:
          "Hoàn thành bài tập, vận động hoặc việc nhà trước khi dùng màn hình giải trí.",
      },
      {
        label: "Evening",
        recommendation:
          "Chỉ dùng màn hình trong khung giờ rõ ràng; dừng ít nhất 1 giờ trước ngủ.",
      }
    );
  } else {
    items.push(
      {
        label: "Morning",
        recommendation:
          "Tránh lướt điện thoại ngay sau khi thức dậy; ưu tiên chuẩn bị cho ngày mới.",
      },
      {
        label: "After school",
        recommendation:
          "Tách rõ thời gian học, giải trí, và mạng xã hội; dùng từng màn hình một.",
      },
      {
        label: "Night",
        recommendation:
          "Bật do-not-disturb và tránh màn hình 1 giờ trước ngủ khi có thể.",
      }
    );
  }

  return items;
}
