'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { completeOnboarding } from './_actions'
import { useState } from 'react'

const states = [
    'johor',
    'kedah',
    'kelantan',
    'melaka',
    'negeri sembilan',
    'pahang',
    'pulau pinang',
    'perak',
    'perlis',
    'sabah',
    'sarawak',
    'selangor',
    'terengganu',
    'kuala lumpur',
    'labuan',
    'putrajaya',
];

export default function OnboardingComponent() {
    const [error, setError] = useState('')
    const { user } = useUser()
    const router = useRouter()

    const formSchema = z.object({
        nickname: z.string()
            .min(2, {
                message: 'nickname must be at least 2 characters.',
            })
            .max(20, {
                message: 'nickname must be less than 20 characters.',
            }),
        gender: z.string({
            required_error: 'please select your gender.',
        }),
        state: z.string({
            required_error: 'please select your state.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const res = await completeOnboarding(formData);
            if (res?.message) {
                // Reloads the user's data from Clerk's API
                await user?.reload();
                router.push('/dashboard');
            } else if (res?.error) {
                setError(res.error);
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="dark:bg-secondaryBlack inset-0 flex min-h-screen w-full flex-col bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px]">
            {error && <div className="text-red-500">{error}</div>} 
            <div className="mx-auto w-container max-w-full my-auto">
                <Card className="w-[350px]">
                    <CardHeader className='text-center'>
                        <CardTitle>complete profile</CardTitle>
                        <CardDescription>so we can get to know you better</CardDescription>
                    </CardHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">
                            <CardContent className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="nickname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>nickname</FormLabel>
                                            <FormControl>
                                                <Input placeholder="khairin" {...field} />
                                            </FormControl>
                                            <FormDescription>this is how others will see you.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>gender</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="select a gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">male</SelectItem>
                                                        <SelectItem value="female">female</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>state</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="select a state" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {states.map((state) => (
                                                            <SelectItem key={state} value={state}>
                                                                {state}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button type="button" onClick={() => router.push('/')}>cancel</Button>
                                <Button type="submit" variant="neutral">save</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </div>
    )
}