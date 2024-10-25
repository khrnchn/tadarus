import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full transform hover:-translate-y-1 transition-transform">
                <h2 className="text-8xl font-black mb-4 uppercase tracking-tighter">
                    4<span className="text-red-500">0</span>4
                </h2>

                <p className="text-2xl font-bold mb-8 bg-black text-white p-2 inline-block transform -rotate-2">
                    page not found!
                </p>

                <p className="mb-8 font-mono text-lg">
                    the page you&apos;re looking for has gone to a parallel universe.
                </p>

                <Link
                    href="/"
                    className="bg-black text-white px-6 py-3 text-lg font-bold inline-block
                             hover:bg-red-500 transform hover:-translate-y-1 transition-all
                             border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                    ← back to tadarus.my
                </Link>
            </div>
        </div>
    )
}