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
      <aside className="w-1/4 p-6 border-r border-gray-700">
        <img
          src="/logo.png"
          className="w-10 transform -scale-x-100 cursor-pointer mb-6"
          onClick={() => router.push("/home")}
          alt="Logo"
        />
        <div className="text-lg font-semibold"># Hashtag</div>
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
            <h3 className="text-lg font-semibold text-white mb-3">Trends</h3>
            <Trends refresh={refreshFlag} />
            <RecentFollowing token={token} />
          </div>
        </div>
      </aside>
    </div>
  );
}
