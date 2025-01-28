import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "todoList-12",
  description: "A simple todo list app :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
