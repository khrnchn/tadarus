import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from 'react';

interface NavItemProps {
    item: { name: string; href: string; icon: React.ElementType };
    isActive: boolean;
    isMobile?: boolean;
}

export const NavItem = React.memo(({ item, isActive, isMobile = false }: NavItemProps) => {
    return (
        <Link href={item.href} className="w-full">
            <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full rounded-none justify-center flex flex-col items-center gap-1 h-16 py-2 transition-all duration-200 ${isActive
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-accent text-muted-foreground hover:text-accent-foreground'
                    }`}
            >
                <item.icon
                    className={`h-5 w-5 transition-all duration-200 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground"
                        }`}
                />
                <span
                    className={`text-xs transition-all duration-200 ${isActive ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-accent-foreground"
                        }`}
                >
                    {item.name}
                </span>
            </Button>
        </Link>
    );
});

NavItem.displayName = 'NavItem';

