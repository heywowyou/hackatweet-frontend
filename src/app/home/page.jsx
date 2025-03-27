'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import Trends from '../../components/Trends';
// import LastTweets from '../../components/LastTweets';

export default function Home() {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        if (!token) {
            router.push('/');
        }
    }, [token, router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div className="flex h-screen w-full">
            <aside className="w-1/4 bg-gray-100 p-6 flex flex-col justify-between">
                <div>
                    <img
                        src="/logo.png"
                        className="w-12 transform -scale-x-100 cursor-pointer mb-6"
                        onClick={() => router.push('/home')}
                        alt="Logo"
                    />
                    <div className="text-lg font-semibold">Hello 👋</div>
                    <div className="text-sm text-gray-500">@username</div>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </aside>

            <main className="w-2/4 p-6 border-x border-gray-300 overflow-y-auto">
                <div className="mb-4">
                    <textarea
                        placeholder="What's happening?"
                        maxLength={280}
                        className="w-full p-3 border border-gray-300 rounded resize-none"
                    />
                    <div className="flex justify-end mt-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">
                            Tweet
                        </button>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4">Last Tweets</h2>
                {/* <LastTweets /> */}
            </main>

            <aside className="w-1/4 p-6">
                {/* <Trends /> */}
            </aside>
        </div>
    );
}
