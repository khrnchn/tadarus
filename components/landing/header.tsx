'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

export default function Header() {
    const router = useRouter();

    const words = [
        {
            text: 'tadarus.my',
        },
    ]

    return (
        <header className="dark:bg-secondaryBlack inset-0 flex min-h-screen w-full flex-col items-center justify-center bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            <div className="mx-auto w-container max-w-full px-5 py-[110px] text-center lg:py-[150px]">
                <h1 className="bricolage text-5xl font-heading md:text-4xl lg:text-5xl">
                    <TypewriterEffectSmooth words={words} />
                </h1>
                <p className="my-12 mt-8 text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
                    your ramadhan companion.
                </p>
                <Button
                    size="lg"
                    className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
                    onClick={() => router.push('/dashboard')}
                >
                    get started
                </Button>
            </div>
        </header>
    )
}