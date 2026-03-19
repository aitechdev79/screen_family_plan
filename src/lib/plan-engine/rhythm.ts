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
          label: "Buoi sang",
          recommendation:
            "Uu tien an sang, van dong, doc sach va tuong tac truc tiep; tranh giai tri bang man hinh.",
        },
        {
          label: "Ban ngay",
          recommendation:
            "Neu dung man hinh, uu tien noi dung ngan, chat luong cao va co nguoi lon cung tham gia.",
        },
        {
          label: "Buoi toi",
          recommendation:
            "Chuyen dan sang choi tu do, doc sach, tro chuyen; dung man hinh it nhat 1 gio truoc khi ngu.",
        },
      ];
    }

    if (child.ageBand === "6-12") {
      return [
        {
          label: "Truoc gio hoc",
          recommendation: "Khong dung man hinh giai tri truoc khi den truong.",
        },
        {
          label: "Sau gio hoc",
          recommendation:
            "Hoan thanh bai tap, van dong hoac viec nha truoc khi dung man hinh giai tri.",
        },
        {
          label: "Buoi toi",
          recommendation:
            "Dung man hinh trong khung gio ro rang, tat thong bao va dung it nhat 1 gio truoc khi ngu.",
        },
      ];
    }

    return [
      {
        label: "Buoi sang",
        recommendation:
          "Tranh luot dien thoai ngay sau khi thuc day; uu tien chuan bi cho ngay moi.",
      },
      {
        label: "Sau gio hoc",
        recommendation:
          "Tach ro thoi gian hoc, giai tri va mang xa hoi; uu tien tung man hinh mot.",
      },
      {
        label: "Buoi toi",
        recommendation:
          "Bat do-not-disturb, tranh feed vo tan va dung man hinh it nhat 1 gio truoc khi ngu.",
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
