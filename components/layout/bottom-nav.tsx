'use client'

import { cn } from "@/lib/utils"
import { BarChart, BookOpen, Home, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
    { icon: Home, label: 'Home', href: '/home' },
    { icon: BookOpen, label: 'Read Quran', href: '/quran' },
    { icon: Users, label: 'Group', href: '/group' },
    { icon: BarChart, label: 'Statistics', href: '/stats' },
]

export default function BottomNavigation() {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <>
            {/* bottom nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
                <nav className="flex items-center justify-around h-16">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-label={item.label}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex flex-col items-center justify-center w-full h-full gap-1 relative transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-6 w-6 transition-transform",
                                        isActive && "scale-110"
                                    )}
                                />
                                <span className="text-xs font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="absolute bottom-1 h-1.5 w-1.5 bg-primary rounded-full transition-all" />
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* desktop sidebar */}
            <div className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[240px] border-r bg-card">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                        tadarus.my
                    </h2>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-label={item.label}
                                aria-current={isActive ? "page" : undefined}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all",
                                    isActive
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* padding for mobile nav */}
            <div className="pb-20 md:pb-0 md:pl-[240px]" />
        </>
    )
}
