import { ChildInput } from "./types";

type RhythmItem = {
  label: string;
  recommendation: string;
};

export function buildDailyRhythm(
  child: ChildInput,
  locale: "vi" | "en",
): RhythmItem[] {
  if (locale === "vi") {
    if (child.ageBand === "0-5") {
      return [
        {
          label: "Buổi sáng",
          recommendation:
            "Ưu tiên ăn sáng, vận động, đọc sách và tương tác trực tiếp; tránh giải trí bằng màn hình.",
        },
        {
          label: "Ban ngày",
          recommendation:
            "Nếu dùng màn hình, ưu tiên nội dung ngắn, chất lượng cao và có người lớn cùng tham gia.",
        },
        {
          label: "Buổi tối",
          recommendation:
            "Chuyển dần sang chơi tự do, đọc sách, trò chuyện; dừng màn hình ít nhất 1 giờ trước khi ngủ.",
        },
      ];
    }

    if (child.ageBand === "6-12") {
      return [
        {
          label: "Trước giờ học",
          recommendation: "Không dùng màn hình giải trí trước khi đến trường.",
        },
        {
          label: "Sau giờ học",
          recommendation:
            "Hoàn thành bài tập, vận động hoặc việc nhà trước khi dùng màn hình giải trí.",
        },
        {
          label: "Buổi tối",
          recommendation:
            "Dùng màn hình trong khung giờ rõ ràng, tắt thông báo và dừng ít nhất 1 giờ trước khi ngủ.",
        },
      ];
    }

    return [
      {
        label: "Buổi sáng",
        recommendation:
          "Tránh lướt điện thoại ngay sau khi thức dậy; ưu tiên chuẩn bị cho ngày mới.",
      },
      {
        label: "Sau giờ học",
        recommendation:
          "Tách rõ thời gian học, giải trí và mạng xã hội; ưu tiên từng màn hình một.",
      },
      {
        label: "Buổi tối",
        recommendation:
          "Bật chế độ Không làm phiền, tránh feed vô tận và dừng màn hình ít nhất 1 giờ trước khi ngủ.",
      },
    ];
  }

  if (child.ageBand === "0-5") {
    return [
      {
        label: "Morning",
        recommendation:
          "Prioritize breakfast, movement, books, and face-to-face interaction before entertainment media.",
      },
      {
        label: "Daytime",
        recommendation:
          "If screens are used, keep them brief, high-quality, and shared with a caregiver whenever possible.",
      },
      {
        label: "Evening",
        recommendation:
          "Shift toward free play, reading, and calm routines; stop screens at least an hour before sleep.",
      },
    ];
  }

  if (child.ageBand === "6-12") {
    return [
      {
        label: "Before school",
        recommendation: "Avoid entertainment screens before school.",
      },
      {
        label: "After school",
        recommendation:
          "Finish homework, movement, or chores before entertainment media starts.",
      },
      {
        label: "Evening",
        recommendation:
          "Use a clear entertainment window, quiet notifications, and end screens at least an hour before bed.",
      },
    ];
  }

  return [
    {
      label: "Morning",
      recommendation:
        "Avoid phone scrolling right after waking; start with preparation, food, and real-world routines.",
    },
    {
      label: "After school",
      recommendation:
        "Separate study time, entertainment, and social feeds; keep to one screen at a time.",
    },
    {
      label: "Night",
      recommendation:
        "Use do-not-disturb, charge devices outside the bedroom when possible, and stop screens an hour before sleep.",
    },
  ];
}
