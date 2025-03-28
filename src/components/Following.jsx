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
    <div className="mt-8 border border-gray-700 p-4 rounded-3xl shadow-sm">
      <h3 className="text-2xl font-semibold text-white mb-4 ml-2">Friends</h3>
      <ul className="space-y-3">
        {following.map((user) => (
          <li key={user.username} className="flex items-center gap-2 ml-2">
            <img
              src={user.avatar || "/oeuf.jpg"}
              alt="avatar"
              className="w-16 h-16 rounded-full border border-gray-700"
            />
            <span className="text-white text-lg font-semibold">
              @{user.username}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
