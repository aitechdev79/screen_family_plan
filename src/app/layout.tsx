import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kế Hoạch Sử dụng Màn hình trong Gia Đình",
  description: "Tạo kế hoạch sử dụng màn hình trong gia đình một cách thực tế với bảng hỏi có hướng dẫn, bản xem trước rõ ràng và khả năng in PDF.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
