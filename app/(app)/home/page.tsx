'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Home = () => {
    const user = useUser();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Welcome back, {user.user?.fullName}. Start your journey by selecting a surah to read.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Home