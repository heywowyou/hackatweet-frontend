"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Trends({ refresh }) {
  const [trends, setTrends] = useState([]);
  const router = useRouter();

  const fetchTrends = () => {
    fetch("http://localhost:3001/tweets/trends")
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTrends(data.trends);
        }
      });
  };

  useEffect(() => {
    fetchTrends();
  }, [refresh]);

  return (
    <div className="bg-[#212d40] p-4 rounded-xl shadow-md text-white w-full">
      <h2 className="text-2xl font-bold mb-3">Trends</h2>
      <ul className="space-y-2">
        {trends.map((tag) => {
          const name = tag.hashtag.replace(/^#/, "");
          return (
            <li
              key={tag.hashtag}
              className="flex justify-between text-sm cursor-pointer hover:underline"
              onClick={() => router.push(`/hashtag/${name}`)}
            >
              <span className="text-white-500 text-xl">#{name}</span>
              <span className="text-gray-500 text-xl">{tag.count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
