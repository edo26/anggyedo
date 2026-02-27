/**
 * Root Layout - The top-level layout component for the entire application.
 * Following Single Responsibility Principle, this layout only handles
 * the HTML structure, font loading, and theme/content providers.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/themeProvider';
import { ContentProvider } from '@/lib/contentProvider';

// This loads the Inter font family from Google Fonts for modern typography
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// This defines the metadata for SEO optimization
export const metadata: Metadata = {
  title: 'AnggyEdo - Senior Frontend Engineer & Performance Specialist',
  description:
    'Product-minded Senior Frontend Engineer with 8+ years of experience architecting scalable web applications. Proven track record in modernizing legacy architectures.',
  keywords: [
    'Frontend Engineer',
    'React Developer',
    'Next.js',
    'Vue.js',
    'Web Developer',
    'Performance Specialist',
  ],
  authors: [{ name: 'Anggy Edo' }],
  openGraph: {
    title: 'AnggyEdo - Senior Frontend Engineer',
    description:
      'Product-minded Senior Frontend Engineer with 8+ years of experience',
    type: 'website',
  },
};

/**
 * This component serves as the root layout wrapping all pages.
 * Provides theme switching and content management context.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ContentProvider>
            {children}
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
