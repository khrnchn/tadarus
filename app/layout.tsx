import {
  ClerkProvider
} from '@clerk/nextjs';
import type { Metadata } from "next";
import localFont from "next/font/local";
import FloatingNav from '../components/floating-nav';
import { bricolage } from './fonts';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "tadarus.my",
  description: "your ramadhan companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={bricolage.className}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bricolage-grotesque`}
        >
          {children}
          <FloatingNav />
        </body>
      </html>
    </ClerkProvider>
  );
}
