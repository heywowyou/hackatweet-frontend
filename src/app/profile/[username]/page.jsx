"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProfileBlock from "@/components/ProfileBlock";
import Tweet from "@/components/Tweet";

export default function Profile() {
  const router = useRouter();
  const params = useParams();
  const viewedUsername = params?.username;

  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [targetToken, setTargetToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const isOwnProfile = !viewedUsername || viewedUsername === username;

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

  // Fetch tweets (watch refreshFlag)
  useEffect(() => {
    const fetchTweets = async () => {
      const name = viewedUsername || username;
      if (!name) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets/user/${name}`
      );
      const data = await response.json();
      if (data.result) {
        setTweets(data.tweets);
      }
    };
    fetchTweets();
  }, [username, viewedUsername, refreshFlag]);

  // Fetch token of viewed user + connections
  useEffect(() => {
    const fetchConnectionStatus = async () => {
      if (!token) return;

      const userToCheck = viewedUsername || username;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userToCheck}`
      );
      const data = await res.json();
      if (!data.result) return;

      const theirToken = data.user.token;
      setTargetToken(theirToken);

      const con = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/connections/${theirToken}`
      );
      const list = await con.json();
      if (list.result) {
        setFollowersCount(list.followers.length);
        setFollowingCount(list.following.length);
        if (!isOwnProfile) {
          const usernames = list.followers.map((u) => u.username);
          setIsFollowing(usernames.includes(username));
        }
      }
    };
    fetchConnectionStatus();
  }, [token, username, viewedUsername, isOwnProfile]);

  const handleFollowToggle = async () => {
    if (!token || !targetToken) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/follow`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, targetToken }),
      }
    );

    const data = await res.json();
    if (data.result) {
      setIsFollowing(data.following);
      setFollowersCount((prev) => prev + (data.following ? 1 : -1));
    }
  };

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
        <button
          onClick={handleLogout}
          className="m-4 mt-2 px-10 py-2 text-white border border-gray-700 hover:border-gray-500 hover:drop-shadow-lg rounded-full transition duration-200 self-start cursor-pointer"
        >
          Logout
        </button>
      </aside>

      <main className="w-2/4 p-10 border-x border-gray-700 overflow-y-auto scrollbar-hidden">
        <div className="flex items-center justify-between">
          <div>
            <ProfileBlock username={displayName} />
            <div className="text-gray-400 text-lg ml-2 mt-4">
              <span>
                {followersCount} follower{followersCount !== 1 ? "s" : ""}
              </span>{" "}
              · <span>{followingCount} following</span>
            </div>
          </div>
          {!isOwnProfile && (
            <button
              onClick={handleFollowToggle}
              className={`px-6 py-2 text-white font-semibold rounded-full border transition duration-200 ${
                isFollowing
                  ? "bg-transparent border-gray-600 hover:border-red-500 hover:text-red-400"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>

        <h2 className="text-xl font-bold my-6 ml-2">Tweets</h2>
        <div className="space-y-4">
          {tweets.length === 0 ? (
            <p className="text-gray-400">No tweets yet.</p>
          ) : (
            tweets.map((tweet) => (
              <Tweet
                key={tweet._id}
                tweet={tweet}
                onDelete={() => setRefreshFlag((prev) => !prev)}
                onLike={() => setRefreshFlag((prev) => !prev)}
              />
            ))
          )}
        </div>
      </main>

      <aside className="w-1/4 p-6" />
    </div>
  );
}
