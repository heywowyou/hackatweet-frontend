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
    <div className="bg-[#202C38] p-8 rounded-xl shadow-md text-white w-full">
      <h2 className="text-2xl font-bold mb-3 tracking-wide">Trends</h2>
      <ul className="space-y-4">
        {trends.map((tag) => {
          const name = tag.hashtag.replace(/^#/, "");
          return (
            <li
              key={tag.hashtag}
              className="cursor-pointer hover:underline"
              onClick={() => router.push(`/hashtag/${name}`)}
            >
              <div className="flex flex-col gap-y-2">
                <span className="text-white font-bold text-xl tracking-wide">
                  #{name}
                </span>
                <span className="text-gray-400 text-sm tracking-wide">
                  {tag.count} tweet{tag.count > 1 ? "s" : ""}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
