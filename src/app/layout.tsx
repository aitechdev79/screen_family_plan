import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kế Hoạch Media Gia Đình",
  description: "Tạo kế hoạch media gia đình thực tế với bảng hỏi có hướng dẫn, bản xem trước rõ ràng và khả năng in PDF.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
