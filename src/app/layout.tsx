import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Screen Family Plan",
  description: "Localized family media plan app with questionnaire, preview, and saved plans."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
