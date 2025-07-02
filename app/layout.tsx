// src/app/layout.tsx
import { Work_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const WorkSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Five Iron Golf",
  description: "Premium indoor golf experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${WorkSans.variable} `}>
      <body>{children}</body>
    </html>
  );
}
