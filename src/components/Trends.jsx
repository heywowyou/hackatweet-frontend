'use client';
import { useEffect, useState } from 'react';

export default function Trends() {
  const [hashtags, setHashtags] = useState([]);

  // Fake data en attendant le backend
  useEffect(() => {
    const fakeTrends = [
      { name: 'javascript', count: 12 },
      { name: 'nextjs', count: 9 },
      { name: 'react', count: 7 },
      { name: 'hackatweet', count: 4 },
    ];
    setHashtags(fakeTrends);
  }, []);

  return (
    <div className="bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-lg font-bold mb-3">Trends</h2>
      <ul className="space-y-2">
        {hashtags.map((tag) => (
          <li key={tag.name} className="flex justify-between text-sm">
            <span className="text-blue-500 cursor-pointer hover:underline">#{tag.name}</span>
            <span className="text-gray-500">{tag.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
