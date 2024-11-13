import FloatingNav from '@/components/floating-nav';
import React from 'react';
import { bricolage } from '../fonts';

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
                <div className="content-center justify-items-center h-screen bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
                    {children}
                </div>
                <FloatingNav />
            </body>
        </html>
    );
}