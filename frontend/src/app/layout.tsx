import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuma Station | Your Thinking System",
  description:
    "AI that reads, remembers, and reasons across everything you give it. Not a chatbot. A thinking system built for depth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
