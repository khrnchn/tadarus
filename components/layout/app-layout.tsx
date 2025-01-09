'use client'

import React from 'react';
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Home, Book, Users, Trophy, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const navigationItems = [
        {
            name: "Home",
            href: "/home",
            icon: Home
        },
        {
            name: "Read",
            href: "/read",
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

    const NavItem = ({ item, isMobile = false }: { item: typeof navigationItems[number]; isMobile?: boolean }) => {
        const isActive = pathname === item.href;
        return (
            <Link href={item.href} className="w-full">
                <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start ${isMobile
                        ? 'flex gap-2'
                        : 'flex flex-col items-center gap-1 h-16 py-2'
                        } ${isActive
                            ? 'bg-secondary hover:bg-secondary/80'
                            : 'hover:bg-accent'
                        }`}
                >
                    <item.icon className={`${isMobile ? "h-4 w-4" : "h-5 w-5"} ${isActive ? "text-primary" : "text-muted-foreground"
                        }`} />
                    <span className={`${isMobile ? "flex-1" : "text-xs"} ${isActive ? "text-primary font-medium" : "text-muted-foreground"
                        }`}>
                        {item.name}
                    </span>
                </Button>
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Top header */}
            <header className="fixed top-0 left-0 right-0 h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[80%] max-w-[320px] sm:w-[320px] p-0">
                                <div className="border-b p-4">
                                    <span className="text-xl font-bold text-primary">tdrsmy</span>
                                </div>
                                <nav className="flex flex-col p-2">
                                    {navigationItems.map((item) => (
                                        <NavItem key={item.name} item={item} isMobile={true} />
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        {/* Desktop navigation */}
                        <nav className="hidden md:flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary mr-4">tdrsmy</span>
                            {navigationItems.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <Button
                                        variant={pathname === item.href ? "secondary" : "ghost"}
                                        className={pathname === item.href ? "text-primary" : "text-muted-foreground"}
                                    >
                                        <item.icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Button>
                                </Link>
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

            {/* Main content */}
            <main className="pt-14 pb-16 md:pb-0">
                <div className="container mx-auto p-4">
                    {children}
                </div>
            </main>

            {/* Bottom navigation - mobile only */}
            <nav className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex justify-around">
                    {navigationItems.map((item) => (
                        <NavItem key={item.name} item={item} />
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default AppLayout;