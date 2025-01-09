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
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-50">
                <nav className="flex items-center justify-around h-16">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full",
                                "transition-colors gap-1",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-[240px] border-r bg-card">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">tadarus.my</h2>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                pathname === item.href
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="pb-16 md:pb-0 md:pl-[240px]" />
        </>
    )
}