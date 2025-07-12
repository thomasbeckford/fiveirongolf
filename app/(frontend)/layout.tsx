import { rawson } from '@/fonts';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Five Iron Golf',
  description: 'Premium indoor golf experience'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(rawson.variable)} lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
