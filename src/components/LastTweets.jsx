"use client";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

export default function LastTweets({ refresh }) {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = () => {
    fetch("http://localhost:3001/tweets")
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
          .slice(0, 5)
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
