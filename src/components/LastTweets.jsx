"use client";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

export default function LastTweets({ refresh }) {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tweets`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setTweets(data.tweets);
        }
      });
  };

  useEffect(() => {
    fetchTweets();
  }, [refresh]);

  return (
    <div className="space-y-4">
      {tweets.length === 0 ? (
        <p className="text-gray-400">No tweets found.</p>
      ) : (
        tweets
          .slice(0, 30)
          .map((tweet) => (
            <Tweet
              key={tweet._id}
              tweet={tweet}
              onDelete={fetchTweets}
              onLike={fetchTweets}
            />
          ))
      )}
    </div>
  );
}
