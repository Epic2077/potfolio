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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ashkan Sadeghi — Front-End Developer | Epic2077',
    template: '%s | Ashkan Sadeghi',
  },
  description:
    'Ashkan Sadeghi (Mohammadhossein Sadeghi) — Front-End Developer specializing in React, Next.js & TypeScript. Personal portfolio of Ashkan Sadeghi, building cinematic digital experiences from Shiraz, Iran. Epic2077.',
  applicationName: 'Epic2077',
  authors: [{ name: 'Ashkan Sadeghi', url: SITE_URL }],
  creator: 'Ashkan Sadeghi',
  publisher: 'Ashkan Sadeghi',
  keywords: [
    'Ashkan Sadeghi',
    'Mohammadhossein Sadeghi',
    'Mohammadhossein Ashkan Sadeghi',
    'Ashkan Sadeghi developer',
    'Ashkan Sadeghi front-end developer',
    'Mohammadhossein Sadeghi developer',
    'Epic2077',
    'epic2077',
    'Front-End Developer Shiraz',
    'React developer Iran',
    'Next.js developer',
    'TypeScript developer',
    'Ashkan portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  verification: {
    google: '1VZgz9ZZXI3xl_O-GD6Rww9IPjzdETFFXx0SLx--xpA',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Epic2077 — Ashkan Sadeghi',
    title: 'Ashkan Sadeghi — Front-End Developer | Epic2077',
    description:
      'Personal portfolio of Ashkan Sadeghi (Mohammadhossein Sadeghi) — Front-End Developer building exceptional digital experiences with React, Next.js & TypeScript.',
    images: [
      {
        url: '/assets/images/Ashkan.png',
        width: 1200,
        height: 630,
        alt: 'Ashkan Sadeghi — Front-End Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashkan Sadeghi — Front-End Developer | Epic2077',
    description:
      'Personal portfolio of Ashkan Sadeghi (Mohammadhossein Sadeghi) — Front-End Developer · React · Next.js · TypeScript.',
    images: ['/assets/images/Ashkan.png'],
  },
  category: 'technology',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashkan Sadeghi',
  alternateName: ['Mohammadhossein Sadeghi', 'Mohammadhossein Ashkan Sadeghi'],
  givenName: 'Mohammadhossein',
  additionalName: 'Ashkan',
  familyName: 'Sadeghi',
  jobTitle: 'Front-End Developer',
  description:
    'Front-End Developer specializing in React, Next.js, and TypeScript. Personal portfolio of Ashkan Sadeghi (Mohammadhossein Sadeghi).',
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/Ashkan.png`,
  worksFor: {
    '@type': 'Organization',
    name: '',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Front-End Development',
    'UI Engineering',
    'AI Integration',
  ],
  sameAs: [
    'https://github.com/Epic2077',
    'https://www.linkedin.com/in/mohammadhosseinsadeghi/',
    'https://instagram.com/Ashkan_2077',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Shiraz',
    addressCountry: 'IR',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Epic2077 — Ashkan Sadeghi',
  alternateName: ['Ashkan Sadeghi Portfolio', 'Mohammadhossein Sadeghi Portfolio', 'Epic2077'],
  url: SITE_URL,
  author: {
    '@type': 'Person',
    name: 'Ashkan Sadeghi',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} dark`}>
      <body className={`${dmSans.className} noise-overlay`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
