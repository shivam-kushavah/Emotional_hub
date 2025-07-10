import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Emotional Content Hub - Wishes, Shayari, Quotes & More',
  description: 'Discover beautiful wishes, heartfelt shayari, inspiring quotes, brain puzzles, and create stunning cards. Available in English and Hindi.',
  keywords: 'wishes, shayari, quotes, puzzles, cards, hindi, english, emotions, feelings',
  authors: [{ name: 'Emotional Content Hub' }],
  creator: 'Emotional Content Hub',
  publisher: 'Emotional Content Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://emotional-content-hub.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emotional-content-hub.vercel.app',
    title: 'Emotional Content Hub - Wishes, Shayari, Quotes & More',
    description: 'Discover beautiful wishes, heartfelt shayari, inspiring quotes, brain puzzles, and create stunning cards. Available in English and Hindi.',
    siteName: 'Emotional Content Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emotional Content Hub - Wishes, Shayari, Quotes & More',
    description: 'Discover beautiful wishes, heartfelt shayari, inspiring quotes, brain puzzles, and create stunning cards. Available in English and Hindi.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Emotional Content Hub',
              url: 'https://emotional-content-hub.vercel.app',
              description: 'Discover beautiful wishes, heartfelt shayari, inspiring quotes, brain puzzles, and create stunning cards. Available in English and Hindi.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://emotional-content-hub.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}