import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Users, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Greetings from './_components/greetings';

const Home = () => {
    const dailyTarget = 20;
    const pagesRead = 12;
    const progress = (pagesRead / dailyTarget) * 100;

    const stats = [
        {
            icon: Book,
            label: 'Pages Read Today',
            value: pagesRead,
            suffix: 'pages',
        },
        {
            icon: Clock,
            label: 'Daily Target',
            value: dailyTarget,
            suffix: 'pages',
        },
        {
            icon: Users,
            label: 'Group Progress',
            value: 77,
            suffix: 'pages',
        },
    ];

    return (
        <div className="space-y-4 p-4">
            <Greetings pagesRead={pagesRead} dailyTarget={dailyTarget} />

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Today's Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="h-3 sm:h-4 w-full bg-secondary rounded-full overflow-hidden relative">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-in-out"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-4 bg-background rounded-lg transition-shadow">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/10 rounded-full">
                                            <stat.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-sm text-muted-foreground">{stat.label}</span>
                                            <p className="text-xl sm:text-2xl font-bold mt-1">
                                                {stat.value}
                                                <span className="text-sm font-normal text-muted-foreground ml-1">
                                                    {stat.suffix}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Button asChild className="w-full justify-between py-3">
                            <Link href="/read">
                                Continue Reading
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-between py-3">
                            <Link href="/groups">
                                View My Group
                                <Users className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;