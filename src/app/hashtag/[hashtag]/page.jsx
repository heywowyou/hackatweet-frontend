"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Tweet from "@/components/Tweet";
import Trends from "@/components/Trends";
import AddTweet from "@/components/AddTweet";
import RecentFollowing from "@/components/Following";

export default function HashtagPage() {
  const { hashtag } = useParams();
  const router = useRouter();

  const [tweets, setTweets] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [token, setToken] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  // Get token from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const fetchTweets = () => {
    if (!hashtag) return;

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/hashtag/${hashtag}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  };

  useEffect(() => {
    fetchTweets();
  }, [hashtag, refreshFlag]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      const clean = search.replace(/^#/, "");
      router.push(`/hashtag/${clean}`);
    }
  };

  const handleTweetPosted = () => {
    setRefreshFlag(!refreshFlag);
  };

  return (
    <div className="flex h-screen w-full bg-[#15202B] text-white">
      <aside className="w-1/4 p-6 flex flex-col justify-between border-r border-gray-700">
        <div>
          <img
            src="/logo.png"
            className="w-30 transform -scale-x-100 cursor-pointer m-4"
            onClick={() => router.push("/home")}
            alt="Logo"
          />
        </div>
        <button
          onClick={handleLogout}
          className=" m-4 mt-2 px-10 py-2 text-white border border-gray-700 hover:border-gray-500 hover:drop-shadow-lg  rounded-full transition duration-200 self-start cursor-pointer"
        >
          Logout
        </button>
      </aside>

      <main className="w-2/4 p-6 border-x border-gray-700 overflow-y-auto">
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search another hashtag..."
            className="flex-1 p-2 rounded bg-[#192734] border border-gray-600 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        <h2 className="text-xl font-bold mb-4">Results for #{hashtag}</h2>
        {tweets.length === 0 ? (
          <p className="text-gray-400">No tweets found with #{hashtag}</p>
        ) : (
          tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
        )}
      </main>

      <aside className="w-1/4 p-6">
        <div className="sticky top-6">
          <div className="mb-6">
            <Trends refresh={refreshFlag} />
            <RecentFollowing token={token} />
          </div>
        </div>
      </aside>
    </div>
  );
}
