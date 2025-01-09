'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import React from 'react'

function Greetings({ dailyTarget, pagesRead }: { dailyTarget: number, pagesRead: number }) {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>salam, {user.firstName || 'friend'} 👋</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Continue your journey through the Quran. {pagesRead < dailyTarget ? "You're almost there!" : "Great job on meeting your daily target!"}
                </p>
            </CardContent>
        </Card>
    )
}

export default Greetings