"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Trends({ refresh }) {
  const [trends, setTrends] = useState([]);
  const router = useRouter();

  const fetchTrends = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/trends`)
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
    <div className="w-full">
      <h2 className="text-3xl font-bold m-4 ml-2 text-white">Trends</h2>
      <div className="bg-[#202C38] p-6 pl-8 rounded-xl shadow-md text-white w-full">
        <ul className="space-y-4">
          {trends.map((tag) => {
            const name = tag.hashtag.replace(/^#/, "");
            return (
              <li
                key={tag.hashtag}
                className="cursor-pointer"
                onClick={() => router.push(`/hashtag/${name}`)}
              >
                <div className="flex flex-col gap-y-2">
                  <span className="text-white font-bold text-xl hover:text-blue-400 hover:drop-shadow-lg transition duration-200">
                    #{name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {tag.count} tweet{tag.count > 1 ? "s" : ""}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
