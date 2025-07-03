// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { rawson } from "@/fonts";
import { cn } from "@/lib/utils";

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
    <html lang="en" className={cn(rawson.variable)}>
      <body>{children}</body>
    </html>
  );
}
