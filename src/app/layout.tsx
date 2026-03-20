import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Media Plan",
  description: "Create a practical family media plan with a guided questionnaire, structured preview, and printable output.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
