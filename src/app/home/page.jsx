"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Trends from "../../components/Trends";
import LastTweets from "../../components/LastTweets";
import AddTweet from "../../components/AddTweet";
import ProfileBlock from "../../components/ProfileBlock";

export default function Home() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");
      setToken(storedToken);
      setUsername(storedUsername);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !token) {
      router.push("/");
    }
  }, [isLoading, token, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  if (isLoading) return null;

  return (
    <div className="flex h-screen w-full bg-[#15202B] text-white">
      <aside className="w-1/4 p-6 flex flex-col justify-between border-r border-gray-700">
        <div>
          <img
            src="/logo.png"
            className="w-12 transform -scale-x-100 cursor-pointer mb-6"
            onClick={() => router.push("/home")}
            alt="Logo"
          />
          <div className="text-lg font-semibold">Hello 👋</div>
          <div className="text-sm text-gray-400">@{username}</div>
        </div>
        <div className="flex-1 flex items-end my-2">
          <ProfileBlock username={username} />
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 px-10 py-2 text-white border border-gray-700 hover:border-gray-500 rounded-full transition duration-200 self-start"
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
        <Trends refresh={refresh} />
      </aside>
    </div>
  );
}
