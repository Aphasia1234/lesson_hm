import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "虚拟列表示例",
  description: "使用 Next.js 和 React Window 实现的虚拟列表",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}