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
            label: 'Active Groups',
            value: 2,
            suffix: 'groups',
        },
    ];

    return (
        <div className="space-y-4 p-4">
            <Greetings pagesRead={pagesRead} dailyTarget={dailyTarget} />

            <Card>
                <CardHeader>
                    <CardTitle>Today's Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="h-3 sm:h-4 w-full bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-in-out"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                                    </div>
                                    <p className="text-lg sm:text-2xl font-bold">
                                        {stat.value}
                                        <span className="text-sm font-normal text-muted-foreground ml-1">
                                            {stat.suffix}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Button asChild className="w-full justify-between">
                            <Link href="/read">
                                Continue Reading
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-between">
                            <Link href="/groups">
                                View My Groups
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