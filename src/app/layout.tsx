import React from 'react';
import type { Metadata, Viewport } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Epic2077 — Ashkan Sadeghi · Front-End Developer',
  description:
    'Mohammadhossein Ashkan Sadeghi — Front-End Developer specializing in React, Next.js & TypeScript. Building cinematic digital experiences from Shiraz, Iran.',
  verification: {
    google: '1VZgz9ZZXI3xl_O-GD6Rww9IPjzdETFFXx0SLx--xpA',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'Epic2077 — Ashkan Sadeghi',
    description: 'Front-End Developer building exceptional digital experiences.',
    images: [{ url: '/assets/images/Ashkan.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} dark`}>
      <body className={`${dmSans.className} noise-overlay`}>{children}</body>
    </html>
  );
}
