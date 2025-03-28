"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProfileBlock from "../../../components/ProfileBlock";
import Tweet from "../../../components/Tweet";

export default function Profile() {
  const router = useRouter();
  const params = useParams();
  const viewedUsername = params?.username; // from URL if viewing another user

  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const isOwnProfile = !viewedUsername;

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

  // Fetch tweets for current user or viewed profile
  useEffect(() => {
    const fetchTweets = async () => {
      const usernameToQuery = viewedUsername || username;
      if (!usernameToQuery) return;

      const response = await fetch(
        `http://localhost:3001/tweets/user/${usernameToQuery}`
      );
      const data = await response.json();
      if (data.result) {
        setTweets(data.tweets);
      }
    };
    fetchTweets();
  }, [username, viewedUsername]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
  };

  if (isLoading) return null;

  const displayName = viewedUsername || username;

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
        {isOwnProfile && (
          <button
            onClick={handleLogout}
            className="m-4 mt-2 px-10 py-2 text-white border border-gray-700 hover:border-gray-500 hover:drop-shadow-lg rounded-full transition duration-200 self-start cursor-pointer"
          >
            Logout
          </button>
        )}
      </aside>

      <main className="w-2/4 p-10 border-x border-gray-700 overflow-y-auto scrollbar-hidden">
        <ProfileBlock username={displayName} />
        <h2 className="text-xl font-bold my-6 ml-2">Tweets</h2>
        <div className="space-y-4">
          {tweets.length === 0 ? (
            <p className="text-gray-400">No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <Tweet
                key={tweet._id}
                tweet={tweet}
                onDelete={() => {
                  // Optional: refresh tweets after delete
                  setTweets((prev) => prev.filter((t) => t._id !== tweet._id));
                }}
              />
            ))
          )}
        </div>
      </main>

      <aside className="w-1/4 p-6" />
    </div>
  );
}
