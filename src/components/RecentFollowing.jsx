"use client";
import { useEffect, useState } from "react";

export default function RecentFollowing({ token }) {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/connections/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          const sorted = [...data.following].sort(
            (a, b) => new Date(b.followedAt) - new Date(a.followedAt)
          );
          setFollowing(sorted.slice(0, 5));
        }
      });
  }, [token]);

  if (following.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-white mb-4 ml-2">
        Recent Following
      </h3>
      <ul className="space-y-3">
        {following.map((user) => (
          <li key={user.username} className="flex items-center gap-3 ml-2">
            <img
              src={user.avatar || "/oeuf.jpg"}
              alt="avatar"
              className="w-10 h-10 rounded-full border border-gray-600"
            />
            <span className="text-white">@{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
