'use client'

import BottomNavigation from "@/components/layout/bottom-nav"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-background border-b z-40 px-4">
                <div className="flex items-center justify-between h-full">
                    <h1 className="text-lg font-semibold">tadarus.my</h1>
                    <div className="w-9" />
                </div>
            </header>

            <main className="relative">
                <div className="container max-w-xl md:max-w-4xl mx-auto px-4">
                    <div className="pt-20 pb-16 md:py-8">
                        {children}
                    </div>
                </div>
            </main>

            <BottomNavigation />
        </div>
    )
}