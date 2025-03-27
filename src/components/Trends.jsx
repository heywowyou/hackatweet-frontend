'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Trends({ refresh }) {
    const [trends, setTrends] = useState([]);
    const router = useRouter();

    const fetchTrends = () => {
        fetch('http://localhost:3001/tweets/trends')
            .then(res => res.json())
            .then(data => {
                if (data.result) {
                    setTrends(data.trends);
                }
            });
    };

    useEffect(() => {
        fetchTrends();
    }, [refresh]);

    return (
        <div className="bg-gray-50 p-4 rounded shadow-md text-black">
            <h2 className="text-lg font-bold mb-3">Trends</h2>
            <ul className="space-y-2">
                {trends.map((tag) => {
                    const name = tag.hashtag.replace(/^#/, '');
                    return (
                        <li
                            key={tag.hashtag}
                            className="flex justify-between text-sm cursor-pointer hover:underline"
                            onClick={() => router.push(`/hashtag/${name}`)}
                        >
                            <span className="text-blue-500">#{name}</span>
                            <span className="text-gray-500">{tag.count}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
