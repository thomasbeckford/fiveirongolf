import { rawson } from '@/fonts';
import React from 'react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { getServerSideURL } from '@/lib/getURL';
import { mergeOpenGraph } from '@/lib/mergeOpenGraph';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(rawson.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms'
  }
};
