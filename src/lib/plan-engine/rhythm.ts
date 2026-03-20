import { ChildInput } from "./types";

type RhythmItem = {
  label: string;
  recommendation: string;
};

export function buildDailyRhythm(child: ChildInput, _locale: "vi" | "en"): RhythmItem[] {
  if (child.ageBand === "0-5") {
    return [
      {
        label: "Buổi sáng",
        recommendation: "Ưu tiên ăn sáng, vận động, đọc sách và tương tác trực tiếp; tránh giải trí bằng màn hình.",
      },
      {
        label: "Ban ngày",
        recommendation: "Nếu dùng màn hình, ưu tiên nội dung ngắn, chất lượng cao và có người lớn cùng tham gia.",
      },
      {
        label: "Buổi tối",
        recommendation: "Chuyển dần sang chơi tự do, đọc sách, trò chuyện; dừng màn hình ít nhất 1 giờ trước khi ngủ.",
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
        recommendation: "Hoàn thành bài tập, vận động hoặc việc nhà trước khi dùng màn hình giải trí.",
      },
      {
        label: "Buổi tối",
        recommendation: "Dùng màn hình trong khung giờ rõ ràng, tắt thông báo và dừng ít nhất 1 giờ trước khi ngủ.",
      },
    ];
  }

  return [
    {
      label: "Buổi sáng",
      recommendation: "Tránh lướt điện thoại ngay sau khi thức dậy; ưu tiên chuẩn bị cho ngày mới.",
    },
    {
      label: "Sau giờ học",
      recommendation: "Tách rõ thời gian học, giải trí và mạng xã hội; ưu tiên từng màn hình một.",
    },
    {
      label: "Buổi tối",
      recommendation: "Bật chế độ Không làm phiền, tránh feed vô tận và dừng màn hình ít nhất 1 giờ trước khi ngủ.",
    },
  ];
}
