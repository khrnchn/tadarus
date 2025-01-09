'use client';

import React from 'react';
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Home, Book, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
    const pathname = usePathname();

    const navigationItems = [
        {
            name: "Home",
            href: "/home",
            icon: Home
        },
        {
            name: "Quran",
            href: "/quran",
            icon: Book
        },
        {
            name: "Groups",
            href: "/groups",
            icon: Users
        },
        {
            name: "Progress",
            href: "/progress",
            icon: Trophy
        }
    ];

    const NavItem = ({ item, isMobile = false }: { item: { name: string; href: string; icon: any }; isMobile?: boolean }) => {
        const isActive = pathname === item.href;
        return (
            <Link href={item.href} className="w-full">
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-center ${isMobile
                        ? 'flex flex-col items-center gap-1 h-16 py-2'
                        : 'flex gap-2'
                        } ${isActive
                            ? 'bg-secondary hover:bg-secondary/80'
                            : 'hover:bg-accent'
                        }`}
                >
                    <item.icon className={`${isMobile ? "h-5 w-5" : "h-4 w-4"} ${isActive ? "text-primary" : "text-muted-foreground"
                        }`} />
                    <span className={`${isMobile ? "text-xs" : ""} ${isActive ? "text-primary font-medium" : "text-muted-foreground"
                        }`}>
                        {item.name}
                    </span>
                </Button>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        <span className="text-xl font-bold text-primary">tdrsmy</span>
                        <nav className="hidden md:flex items-center space-x-2">
                            {navigationItems.map((item) => (
                                <NavItem key={item.name} item={item} />
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

            <main className="pt-14 pb-16 md:pb-0">
                <div className="container mx-auto p-4">
                    {children}
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex justify-around">
                    {navigationItems.map((item) => (
                        <NavItem key={item.name} item={item} isMobile={true} />
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default AppLayout;