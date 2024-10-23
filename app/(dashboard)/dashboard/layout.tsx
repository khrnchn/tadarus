import FloatingNav from '@/components/floating-nav';
import React from 'react';
import { bricolage } from '../../fonts';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${bricolage.className} antialiased`}
            >
                {children}
                <FloatingNav />
            </body>
        </html>
    );
}