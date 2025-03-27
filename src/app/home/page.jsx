'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Trends from '../../components/Trends';
import LastTweets from '../../components/LastTweets';
import AddTweet from '../../components/AddTweet';

export default function Home() {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const [refresh, setRefresh] = useState(false);

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
        <div className="flex h-screen w-full bg-[#15202B] text-white">
            <aside className="w-1/4 p-6 flex flex-col justify-between border-r border-gray-700">
                <div>
                    <img
                        src="/logo.png"
                        className="w-12 transform -scale-x-100 cursor-pointer mb-6"
                        onClick={() => router.push('/home')}
                        alt="Logo"
                    />
                    <div className="text-lg font-semibold">Hello 👋</div>
                    <div className="text-sm text-gray-400">@{localStorage.getItem('username')}</div>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </aside>

            <main className="w-2/4 p-6 border-x border-gray-700 overflow-y-auto">
                <AddTweet onTweetPosted={() => setRefresh(!refresh)} />
                <h2 className="text-xl font-bold mb-4">Last Tweets</h2>
                <LastTweets refresh={refresh} />
            </main>

            <aside className="w-1/4 p-6">
                <Trends />
            </aside>
        </div>
    );
}
