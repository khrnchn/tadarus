import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "tadarus.my | Your Ramadan Quran Companion",
    template: "%s | tadarus.my"
  },
  description: "Track your Quran reading progress, join group readings, and complete the Quran this Ramadan with tadarus.my - your digital companion for spiritual growth.",
  keywords: [
    "Quran",
    "Tadarus",
    "Ramadan",
    "Islamic app",
    "Quran tracking",
    "Muslim community",
    "Group reading",
    "Digital Quran",
    "Islamic studies",
    "Ramadan goals"
  ],
  authors: [
    {
      name: "khrnchn",
      url: "https://github.com/khrnchn"
    }
  ],
  creator: "khrnchn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tadarus.my",
    title: "tadarus.my | Your Ramadan Quran Companion",
    description: "Track your Quran reading progress, join group readings, and complete the Quran this Ramadan with tadarus.my - your digital companion for spiritual growth.",
    siteName: "tadarus.my",
  },
  twitter: {
    card: "summary_large_image",
    title: "tadarus.my | Your Ramadan Quran Companion",
    description: "Track your Quran reading progress, join group readings, and complete the Quran this Ramadan with tadarus.my.",
    creator: "@sedekahje"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  // verification: {
  //   google: "your-google-site-verification-code", // Add your verification code when ready
  // },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
