"use client";
import { useRouter } from "next/navigation";

export default function ProfileBlock({ username }) {
  const router = useRouter();

  const goToProfile = () => {
    if (username) {
      router.push(`/profile/${username}`);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={goToProfile}
      >
        <img
          src="/oeuf.jpg"
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border border-gray-800"
        />
        <div>
          <div className="text-white font-semibold text-2xl">{username}</div>
          <div className="text-gray-400 text-lg leading-none">@{username}</div>
        </div>
      </div>
    </div>
  );
}
