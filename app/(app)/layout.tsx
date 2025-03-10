'use client';

import { NavItem } from "@/components/layout/nav-item";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { Book, Home, Trophy, Users2 } from 'lucide-react';
import { usePathname } from "next/navigation";
import React from 'react';

interface AppLayoutProps {
    children: React.ReactNode;
}

const navigationItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Quran", href: "/quran", icon: Book },
    { name: "Group", href: "/group", icon: Users2 },
    { name: "Progress", href: "/progress", icon: Trophy }
];

const AppLayout = ({ children }: AppLayoutProps) => {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-background">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background">
                Skip to main content
            </a>
            <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-primary">tdrsmy</span>
                        <nav className="hidden md:flex items-center space-x-2" aria-label="Main navigation">
                            {navigationItems.map((item) => (
                                <NavItem key={item.name} item={item} isActive={pathname === item.href} />
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-8 w-8"
                                }
                            }}
                        />
                    </div>
                </div>
            </header>

            <main id="main-content" className="pt-14 pb-16 md:pb-0 md:pt-20 md:px-6 lg:px-8">
                <div className="container mx-auto p-4">
                    {children}
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" aria-label="Mobile navigation">
                <div className="flex justify-around">
                    {navigationItems.map((item) => (
                        <NavItem key={item.name} item={item} isActive={pathname === item.href} isMobile={true} />
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default AppLayout;

